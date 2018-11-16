import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChatRoom } from './ChatRoom';
import { NotificationCount } from '../../../../components/NotificationCount';
import './styles.scss';

class NewMessagesDropdown extends Component {
  constructor(props) {
    super(props);
  }
  handleClearChatRoomUnreadMessages(event) {
    event.preventDefault();

    if ( event.stopPropagation ) {
      event.stopPropagation();
    }

    const {
      chatRooms,
      handleClearChatRoomUnreadMessages
    } = this.props;
    var chatRoomIDs = [];

    for (var i = 0; i < chatRooms.length; i++) {
      var chatRoom = chatRooms[i];

      chatRoomIDs.push(chatRoom.data._id);
    }

    handleClearChatRoomUnreadMessages(chatRoomIDs);
  }
  render() {
    const {
      user,
      chatRooms,
      activeChatRoom,
      handleChangeChatRoom,
      handleClearChatRoomUnreadMessages
    } = this.props;

    return (
      <div className="mui-dropdown new-messages-dropdown-wrapper">
        <div className="dropdown-toggle new-messages-dropdown" data-mui-toggle="dropdown">
          <div className="message-icon">
            <FontAwesomeIcon icon="comment" />
          </div>
          {
            chatRooms.length > 0 &&
            <NotificationCount count={chatRooms.length} small />
          }
        </div>
        <ul className="dropdown-menu has-pointer mui-dropdown__menu mui-dropdown__menu--right">
          {
            chatRooms.length > 0
              ?
              <div>
                <div className="clear-all-button" onClick={::this.handleClearChatRoomUnreadMessages}>
                  <div
                    className="trash-icon"
                    title="Clear All New Messages"
                  >
                    <FontAwesomeIcon icon={["far", "trash-alt"]} />
                  </div>
                  Clear All
                </div>
                <div className="divider" />
                <div className="dropdown-chat-rooms-list">
                  {
                    chatRooms.map((singleChatRoom, i) =>
                      <ChatRoom
                        key={i}
                        user={user}
                        chatRoom={singleChatRoom}
                        activeChatRoom={activeChatRoom}
                        handleChangeChatRoom={handleChangeChatRoom}
                        handleClearChatRoomUnreadMessages={handleClearChatRoomUnreadMessages}
                      />
                    )
                  }
                </div>
              </div>
              :
              <div className="no-new-messages">
                No New Messages
              </div>
          }
        </ul>
      </div>
    )
  }

}
NewMessagesDropdown.propTypes = {
  user: PropTypes.object.isRequired,
  chatRooms: PropTypes.array.isRequired,
  activeChatRoom: PropTypes.object.isRequired,
  handleChangeChatRoom: PropTypes.func.isRequired,
  handleClearChatRoomUnreadMessages: PropTypes.func.isRequired
}

NewMessagesDropdown.defaultProps = {
  count: 0
}

export default NewMessagesDropdown;
