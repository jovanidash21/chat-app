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
  handleOpenPopUpChatRoom(event) {
    event.preventDefault();

    const {
      chatRoom,
      handleOpenPopUpChatRoom  
    } = this.props;

    handleOpenPopUpChatRoom(chatRoom);
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
        onClick={::this.handleOpenPopUpChatRoom}
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
        <div
          className="check-icon"
          title="Mark as Read"
          onClick={::this.handleClearChatRoomUnreadMessages}
        >
          <FontAwesomeIcon icon="check-double" />
        </div>
      </div>
    )
  }
}

NewMessagesDropdownChatRoom.propTypes = {
  user: PropTypes.object.isRequired,
  chatRoom: PropTypes.object.isRequired,
  activeChatRoom: PropTypes.object.isRequired,
  handleOpenPopUpChatRoom: PropTypes.func.isRequired,
  handleChangeChatRoom: PropTypes.func.isRequired,
  handleClearChatRoomUnreadMessages: PropTypes.func.isRequired
}

export default NewMessagesDropdownChatRoom;
