import React, { Component } from 'react';
import Textarea from 'muicss/lib/react/textarea';
require('../../styles/Chat.scss');

class ChatInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Textarea 
        className="chat-input"
        hint="Type here" 
      />
    )
  }
}

export default ChatInput;