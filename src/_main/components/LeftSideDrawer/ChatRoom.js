import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleChatRoomAvatarBadges } from '../../../utils/avatar';
import { Avatar } from '../../../components/Avatar';
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
      isActive
    } = this.props;

    return (
      <div
        className={
          "chat-room " +
          (isActive ? 'active ' : '') +
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
          <div
            className="new-messages-count"
            title={chatRoom.unReadMessages + " New " + (chatRoom.unReadMessages > 1 ? 'Messages' : 'Message')}
          >
            {
              chatRoom.unReadMessages <= 100
                ?
                chatRoom.unReadMessages
                :
                '100 +'
            }
          </div>
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
  handleChangeChatRoom: PropTypes.func.isRequired,
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired
}

ChatRoom.defaultProps = {
  isActive: false
}

export default ChatRoom;
