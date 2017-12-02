import React from 'react';
import PropTypes from 'prop-types';

const ChatBubble = (props) => {
  return (
    <div className={"chat-bubble-wrapper " + (props.isSender ? 'reverse' : '')} >
      <div className="chat-image" style={{backgroundImage: `url(${props.userData.profilePicture})`}} />
      <div className={"chat-bubble " + (props.isSender ? 'right' : '')}>
        <div className="chat-text">
          {props.message}
        </div>
      </div>
      <div className="chat-time">
        9 minutes ago
      </div>
    </div>
  );
}

ChatBubble.propTypes = {
  userData: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  isSender: PropTypes.bool.isRequired
}

export default ChatBubble;
