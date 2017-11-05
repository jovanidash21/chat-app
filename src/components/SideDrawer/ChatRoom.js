import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { chatRoomData } = this.props;

    return (
      <div className="chat-room">
        <div className="chat-room-icon" style={{backgroundImage: `url(${chatRoomData.chatIcon})`}}></div>
        <div className="chat-room-name">
          {chatRoomData.name}
        </div>
      </div>
    )
  }
}

ChatRoom.propTypes={
  chatRoomData: PropTypes.object.isRequired
}

export default ChatRoom;