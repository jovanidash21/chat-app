import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { 
      userData,
      name
    } = this.props;

    return (
      <div className="chat-room">
        <div className="chat-room-icon" style={{backgroundImage: `url(${userData.profilePicture})`}}></div>
        <div className="chat-room-name">
          {name}
        </div>
      </div>
    )
  }
}

ChatRoom.propTypes={
  userData: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
}

export default ChatRoom;