import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';

const ChatRoomNameInput = (props) => {
  return (
    <Input
      label="Chat Room Name"
      type="text"
      autoComplete="off"
      floatingLabel={true}
      required={true}
      onChange={props.onChatRoomNameChange}
      disabled={props.isDisabled}
    />
  );
}

ChatRoomNameInput.propTypes = {
  onChatRoomNameChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
}

ChatRoomNameInput.defaultProps = {
  isDisabled: false
}

export default ChatRoomNameInput;
