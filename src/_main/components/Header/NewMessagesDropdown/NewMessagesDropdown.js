import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChatRoom } from './ChatRoom';
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
          <div className="new-messages-count">
            {props.count}
          </div>
        }
      </div>
      <ul className="dropdown-menu has-pointer mui-dropdown__menu mui-dropdown__menu--right">
        <div className="dropdown-chat-rooms-list">
          {
            props.count > 0
              ?
              props.children
              :
              <div className="no-new-messages">
                No New Messages
              </div>
          }
        </div>  
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
