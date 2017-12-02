import React from 'react';
import PropTypes from 'prop-types';

const ChatRoom = (props) => {
  return (
    <div className="chat-room">
      <div className="chat-room-icon" style={{backgroundImage: `url(${props.chatRoomData.chatIcon})`}}></div>
      <div className="chat-room-name">
        {props.chatRoomData.name}
      </div>
    </div>
  );
}

ChatRoom.propTypes = {
  chatRoomData: PropTypes.object.isRequired
}

export default ChatRoom;
