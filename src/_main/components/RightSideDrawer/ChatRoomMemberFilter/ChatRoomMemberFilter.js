import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'muicss/react';
import './styles.scss';

const ChatRoomMemberFilter = (props) => {
  return (
    <div className="chat-room-member-filter">
      <div className="search-icon">
        <FontAwesomeIcon icon="search" />
      </div>
      <Input
        type="text"
        autoComplete="off"
        floatingLabel={false}
        placeholder="Search"
        onChange={props.onMemberNameChange}
      />
    </div>
  );
}

ChatRoomMemberFilter.propTypes = {
  onMemberNameChange: PropTypes.func.isRequired
}

export default ChatRoomMemberFilter;
