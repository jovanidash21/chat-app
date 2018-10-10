import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import { handleChatRoomAvatarBadges } from '../../../../utils/avatar';
import { formatNumber } from '../../../../utils/number';
import { Avatar } from '../../../../components/Avatar';
import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import { OnlineIndicator } from '../../../components/OnlineIndicator';
import './styles.scss';

class ActiveChatRoom extends Component {
  constructor(props) {
    super(props);
  }
  handleActiveChatRoomRender() {
    const {
      user,
      chatRoom,
      member
    } = this.props;

    if (
      !chatRoom.fetch.loading &&
      chatRoom.fetch.success &&
      Object.keys(chatRoom.active.data).length > 0
    ) {
      const activeChatRoom = chatRoom.active;

      return (
        <div className="chat-room-detail-wrapper">
          <Avatar
            image={activeChatRoom.data.chatIcon}
            size="32px"
            name={activeChatRoom.data.name}
            roleChatType={handleChatRoomAvatarBadges(activeChatRoom.data, user.active, 'role-chat')}
            accountType={handleChatRoomAvatarBadges(activeChatRoom.data, user.active)}
            badgeCloser
          />
          <div className="chat-room-detail">
            <h2 className="chat-room-name" title={activeChatRoom.data.name}>
              {activeChatRoom.data.name}
            </h2>
            <div className="chat-room-info">
              {
                ( activeChatRoom.data.chatType === 'public' ||
                activeChatRoom.data.chatType === 'group' ) &&
                !member.fetch.loading &&
                member.fetch.success &&
                <div
                  className="members-count"
                  onClick={::this.handleRightSideDrawerToggleEvent}
                  title="View Members List"
                >
                  <div className="user-icon">
                    <FontAwesomeIcon icon={["far", "user"]} />
                  </div>
                  {formatNumber(member.all.length)}
                </div>
              }
              {
                activeChatRoom.data.chatType === 'direct' &&
                !member.fetch.loading &&
                member.fetch.success &&
                member.all.filter(singleMember =>
                  singleMember._id !== user.active._id
                ).map((singleMember, i) =>
                  <div key={i} className="online-indicator-wrapper">
                    <OnlineIndicator isOnline={singleMember.isOnline} />
                    {singleMember.isOnline ? 'online' : 'offline'}
                  </div>
                )
              }
              {
                activeChatRoom.data.chatType === 'private' &&
                <div className="online-indicator-wrapper">
                  <OnlineIndicator isOnline={true} />
                  online
                </div>
              }
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="white" />
      )
    }
  }
  handleRightSideDrawerToggleEvent(event) {
    event.preventDefault();

    const { handleRightSideDrawerToggleEvent } = this.props;

    handleRightSideDrawerToggleEvent(true);
  }
  handleLogout() {
    const {
      user,
      logout
    } = this.props;

    logout(user.active._id);
  }
  render() {
    const {
      user,
      logout
    } = this.props;

    return (
      <div className="active-chat-room">
        {::this.handleActiveChatRoomRender()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom,
    member: state.member
  }
}

ActiveChatRoom.propTypes = {
  handleRightSideDrawerToggleEvent: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveChatRoom);
