import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatBubble extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { message } = this.props;

    return (
      <div className="chat-bubble">
      
      </div>
    )
  }
}

ChatBubble.propTypes={
  message: PropTypes.string.isRequired
}

export default ChatBubble;
