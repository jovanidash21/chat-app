import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import LoadingAnimation from '../../../components/LoadingAnimation';
import Avatar from '../../../components/Avatar';
import OnlineIndicator from '../../../components/OnlineIndicator';
import './styles.scss';

class ActiveChatRoom extends Component {
  constructor(props) {
    super(props);
  }
  handleAccountType() {
    const {
      user,
      chatRoom
    } = this.props;
    const activeUser = user.active;
    const activeChatRoom = chatRoom.active;
    var accountType = '';

    switch ( activeChatRoom.data.chatType ) {
      case 'private':
        accountType = activeUser.accountType;
        break;
      case 'direct':
        for ( var i = 0; i < activeChatRoom.data.members.length; i++ ) {
          var member = activeChatRoom.data.members[i];

          if ( member._id != activeUser._id ) {
            accountType = member.accountType;
            break;
          } else {
            continue;
          }
        }
        break;
      default:
        break;
    }

    return accountType;
  }
  handleActiveChatRoomRender() {
    const {
      user,
      chatRoom,
      member
    } = this.props;

    if (
      !chatRoom.isFetching &&
      chatRoom.isFetchingSuccess &&
      Object.keys(chatRoom.active.data).length > 0
    ) {
      const activeChatRoom = chatRoom.active;

      return (
        <div className="chat-room-detail-wrapper">
          <Avatar
            image={activeChatRoom.data.chatIcon}
            size="32px"
            title={activeChatRoom.data.name}
            accountType={::this.handleAccountType()}
            badgeCloser
          />
          <div className="chat-room-detail">
            <h2
              className="chat-room-name"
              title={activeChatRoom.data.name}
            >
              {activeChatRoom.data.name}
            </h2>
            <div className="chat-room-info">
              {
                ( activeChatRoom.data.chatType === 'public' ||
                activeChatRoom.data.chatType === 'group' ) &&
                !member.isFetching &&
                member.isFetchingSuccess &&
                <div
                  className="members-count"
                  onClick={::this.handleRightSideDrawerToggleEvent}
                  title="View Members List"
                >
                  <div className="user-icon">
                    <FontAwesomeIcon icon={["far", "user"]} />
                  </div>
                  {member.all.length}
                </div>
              }
              {
                activeChatRoom.data.chatType === 'direct' &&
                !member.isFetching &&
                member.isFetchingSuccess &&
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
  handleLeftSideDrawerToggleEvent(event) {
    event.preventDefault();

    const { handleLeftSideDrawerToggleEvent } = this.props;

    handleLeftSideDrawerToggleEvent(true);
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
        <MediaQuery query="(max-width: 767px)">
          <div
            className="hamburger-icon"
            onClick={::this.handleLeftSideDrawerToggleEvent}
          >
            <FontAwesomeIcon icon="bars" size="2x" />
          </div>
        </MediaQuery>
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
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired,
  handleRightSideDrawerToggleEvent: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveChatRoom);
