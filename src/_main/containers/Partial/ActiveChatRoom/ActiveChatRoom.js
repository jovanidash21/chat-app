import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import { handleChatRoomAvatarBadges } from '../../../../utils/avatar';
import { isObjectEmpty } from '../../../../utils/object';
import { formatNumber } from '../../../../utils/number';
import { isDirectChatRoomMemberOnline } from '../../../../utils/member';
import { Avatar } from '../../../../components/Avatar';
import { OnlineIndicator } from '../../../components/OnlineIndicator';
import { Skeleton } from '../../../../components/Skeleton';
import './styles.scss';

class ActiveChatRoom extends Component {
  constructor(props) {
    super(props);
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
      chatRoom,
      member
    } = this.props;
    const activeUser = user.active;
    const activeChatRoom = chatRoom.active;
    const activeChatRoomEmpty = isObjectEmpty(activeChatRoom);
    const loading = user.fetchActive.loading || chatRoom.fetch.loading;
    const isOtherMemberOnline = !activeChatRoomEmpty &&
      activeChatRoom.data.chatType === 'direct' &&
      isDirectChatRoomMemberOnline(activeChatRoom.data.members, activeUser._id);

    return (
      <div className="active-chat-room">
        <div className="chat-room-detail-wrapper">
          {
            loading &&
            <Skeleton
              className="avatar"
              height="32px"
              width="32px"
              circle
            />
          }
          {
            !loading &&
            !activeChatRoomEmpty &&
            <Avatar
              image={activeChatRoom.data.chatIcon}
              size="32px"
              name={activeChatRoom.data.name}
              roleChatType={handleChatRoomAvatarBadges(activeChatRoom.data, activeUser, 'role-chat')}
              accountType={handleChatRoomAvatarBadges(activeChatRoom.data, activeUser)}
              badgeCloser
            />
          }
          <div className="chat-room-detail">
            {
              loading &&
              <Skeleton
                className="chat-room-name"
                height="32px"
                width="150px"
              />
            }
            {
              !loading &&
              !activeChatRoomEmpty &&
              <h2 className="chat-room-name" title={activeChatRoom.data.name}>
                {activeChatRoom.data.name}
              </h2>
            }
            {
              !loading &&
              !activeChatRoomEmpty &&
              !member.fetch.loading &&
              member.fetch.success &&
              <div className="chat-room-info">
                {
                  (activeChatRoom.data.chatType === 'public' ||
                  activeChatRoom.data.chatType === 'group') &&
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
                  <div className="online-indicator-wrapper">
                    <OnlineIndicator online={isOtherMemberOnline} />
                    {isOtherMemberOnline ? 'online' : 'offline'}
                  </div>
                }
                {
                  activeChatRoom.data.chatType === 'private' &&
                  <div className="online-indicator-wrapper">
                    <OnlineIndicator online />
                    online
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom,
    member: state.member,
  }
}

ActiveChatRoom.propTypes = {
  handleRightSideDrawerToggleEvent: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveChatRoom);
