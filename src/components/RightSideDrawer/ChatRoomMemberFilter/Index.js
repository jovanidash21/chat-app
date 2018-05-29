import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';
import './styles.scss';

const ChatRoomMemberFilter = (props) => {
  return (
    <div className="chat-room-member-filter">
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
