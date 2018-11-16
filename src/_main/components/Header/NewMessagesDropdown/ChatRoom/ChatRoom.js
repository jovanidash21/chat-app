import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleChatRoomAvatarBadges } from '../../../../../utils/avatar';
import { Avatar } from '../../../../../components/Avatar';
import { NotificationCount } from '../../../../../components/NotificationCount';
import './styles.scss';

class NewMessagesDropdownChatRoom extends Component {
  constructor(props) {
    super(props);
  }
  handleChangeChatRoom(event) {
    event.preventDefault();

    const {
      user,
      chatRoom,
      activeChatRoom,
      handleChangeChatRoom
    } = this.props;

    handleChangeChatRoom(chatRoom, user._id, activeChatRoom.data._id);
  }
  handleClearChatRoomUnreadMessages(event) {
    event.preventDefault();

    if ( event.stopPropagation ) {
      event.stopPropagation();
    }

    const {
      chatRoom,
      handleClearChatRoomUnreadMessages
    } = this.props;

    handleClearChatRoomUnreadMessages([chatRoom.data._id]);
  }
  render() {
    const {
      user,
      chatRoom
    } = this.props;

    return (
      <div
        className="new-messages-dropdown-chat-room"
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
        </div>
        {
          chatRoom.unReadMessages > 0 &&
          <NotificationCount
            count={chatRoom.unReadMessages}
            title={chatRoom.unReadMessages + " New " + (chatRoom.unReadMessages > 1 ? 'Messages' : 'Message')}
          />
        }
        <div className="clear-icon" onClick={::this.handleClearChatRoomUnreadMessages}>
          <FontAwesomeIcon icon="times" />
        </div>
      </div>
    )
  }
}

NewMessagesDropdownChatRoom.propTypes = {
  user: PropTypes.object.isRequired,
  chatRoom: PropTypes.object.isRequired,
  activeChatRoom: PropTypes.object.isRequired,
  handleChangeChatRoom: PropTypes.func.isRequired,
  handleClearChatRoomUnreadMessages: PropTypes.func.isRequired
}

export default NewMessagesDropdownChatRoom;
