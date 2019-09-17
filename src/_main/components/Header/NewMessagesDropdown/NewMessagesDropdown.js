import React, { Component, Fragment } from 'react';
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

    const {
      chatRooms,
      handleClearChatRoomUnreadMessages,
    } = this.props;
    const chatRoomIDs = [];

    for (let i = 0; i < chatRooms.length; i += 1) {
      const chatRoom = chatRooms[i];

      chatRoomIDs.push(chatRoom.data._id);
    }

    handleClearChatRoomUnreadMessages(chatRoomIDs);
  }
  render() {
    const {
      user,
      chatRooms,
      activeChatRoom,
      handleOpenPopUpChatRoom,
      handleChangeChatRoom,
      handleClearChatRoomUnreadMessages,
    } = this.props;

    return (
      <div className="mui-dropdown new-messages-dropdown-wrapper">
        <div className="dropdown-toggle new-messages-dropdown" data-mui-toggle="dropdown">
          <div className="message-icon header-item-icon">
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
              <Fragment>
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
                        handleOpenPopUpChatRoom={handleOpenPopUpChatRoom}
                        handleChangeChatRoom={handleChangeChatRoom}
                        handleClearChatRoomUnreadMessages={handleClearChatRoomUnreadMessages}
                      />
                    )
                  }
                </div>
              </Fragment>
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
  handleOpenPopUpChatRoom: PropTypes.func.isRequired,
  handleChangeChatRoom: PropTypes.func.isRequired,
  handleClearChatRoomUnreadMessages: PropTypes.func.isRequired,
}

export default NewMessagesDropdown;
