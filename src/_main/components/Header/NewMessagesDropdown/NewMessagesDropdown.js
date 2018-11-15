import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChatRoom } from './ChatRoom';
import { NotificationCount } from '../../../../components/NotificationCount';
import './styles.scss';

const NewMessagesDropdown = (props) => {
  return (
    <div className="mui-dropdown new-messages-dropdown-wrapper">
      <div className="dropdown-toggle new-messages-dropdown" data-mui-toggle="dropdown">
        <div className="message-icon">
          <FontAwesomeIcon icon="comment" />
        </div>
        {
          props.count > 0 &&
          <NotificationCount count={props.count} small />
        }
      </div>
      <ul className="dropdown-menu has-pointer mui-dropdown__menu mui-dropdown__menu--right">
        {
          props.count > 0
            ?
            <div>
              <div className="clear-all-button">
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
                {props.children}
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

NewMessagesDropdown.propTypes = {
  count: PropTypes.number
}

NewMessagesDropdown.defaultProps = {
  count: 0
}

NewMessagesDropdown.ChatRoom = ChatRoom;

export default NewMessagesDropdown;
