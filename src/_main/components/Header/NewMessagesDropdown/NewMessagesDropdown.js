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
      user,
      handleClearChatRoomUnreadMessages
    } = this.props;

    handleClearChatRoomUnreadMessages(user._id, 'all');
  }
  render() {
    const {
      count,
      children
    } = this.props;

    return (
      <div className="mui-dropdown new-messages-dropdown-wrapper">
        <div className="dropdown-toggle new-messages-dropdown" data-mui-toggle="dropdown">
          <div className="message-icon">
            <FontAwesomeIcon icon="comment" />
          </div>
          {
            count > 0 &&
            <NotificationCount count={count} small />
          }
        </div>
        <ul className="dropdown-menu has-pointer mui-dropdown__menu mui-dropdown__menu--right">
          {
            count > 0
              ?
              <div>
                <div className="clear-all-button" onClick={::this.handleClearChatRoomUnreadMessages}>
                  <div
                    className="trash-icon"
                    title="Clear All New Messages"
                  >
                    <FontAwesomeIcon icon={["far", "trash-alt"]} />
                  </div>
                  Clear
                </div>
                <div className="divider" />
                <div className="dropdown-chat-rooms-list">
                  {children}
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
  count: PropTypes.number,
  handleClearChatRoomUnreadMessages: PropTypes.func.isRequired
}

NewMessagesDropdown.defaultProps = {
  count: 0
}

NewMessagesDropdown.ChatRoom = ChatRoom;

export default NewMessagesDropdown;
