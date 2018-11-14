import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleChatRoomAvatarBadges } from '../../../utils/avatar';
import { Avatar } from '../../../components/Avatar';
import { NotificationCount } from '../../../components/NotificationCount';
import './styles.scss';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }
  handleChangeChatRoom(event) {
    event.preventDefault();

    const {
      user,
      chatRoom,
      activeChatRoom,
      handleChangeChatRoom,
      handleLeftSideDrawerToggleEvent
    } = this.props;

    handleChangeChatRoom(chatRoom, user._id, activeChatRoom.data._id);
    handleLeftSideDrawerToggleEvent();
  }
  render() {
    const {
      user,
      chatRoom,
      isActive,
      isSelected
    } = this.props;

    return (
      <div
        className={
          "chat-room " +
          (isActive ? 'active ' : '') +
          (isSelected ? 'selected ' : '') +
          (!chatRoom.mute.data && chatRoom.unReadMessages > 0 ? 'new-message' : '')
        }
        onClick={::this.handleChangeChatRoom}
        title={chatRoom.data.name}
      >
        <Avatar
          image={chatRoom.data.chatIcon}
          name={chatRoom.data.name}
          roleChatType={handleChatRoomAvatarBadges(chatRoom.data, user, 'role-chat')}
          accountType={handleChatRoomAvatarBadges(chatRoom.data, user)}
        />
        <div className="chat-room-name">
          {chatRoom.data.name}
          {
            chatRoom.data.chatType === 'private' &&
            <span className="you-label">(you)</span>
          }
        </div>
        {
          !chatRoom.mute.data &&
          chatRoom.unReadMessages > 0 &&
          <NotificationCount
            count={chatRoom.unReadMessages}
            title={chatRoom.unReadMessages + " New " + (chatRoom.unReadMessages > 1 ? 'Messages' : 'Message')}
          />
        }
        {
          chatRoom.mute.data &&
          <div className="mute-icon" title="This Chat Room is muted">
            <FontAwesomeIcon icon="bell-slash" />
          </div>
        }
      </div>
    )
  }
}

ChatRoom.propTypes = {
  user: PropTypes.object.isRequired,
  chatRoom: PropTypes.object.isRequired,
  activeChatRoom: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  isSelected: PropTypes.bool,
  handleChangeChatRoom: PropTypes.func.isRequired,
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired
}

ChatRoom.defaultProps = {
  isActive: false,
  isSelected: false
}

export default ChatRoom;
