import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatBubble extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { 
      userData,
      message,
      isSender
    } = this.props;

    return (
      <div className={"chat-bubble-wrapper " + (isSender ? 'reverse' : '')} >
        <div className="chat-image" style={{backgroundImage: `url(${userData.profilePicture})`}} />
        <div className={"chat-bubble " + (isSender ? 'right' : '')}>
          <div className="chat-text">
            {message}
          </div>
        </div>
        <div className="chat-time">
          9 minutes ago
        </div>
      </div>
    )
  }
}

ChatBubble.propTypes={
  userData: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  isSender: PropTypes.bool.isRequired
}

export default ChatBubble;
