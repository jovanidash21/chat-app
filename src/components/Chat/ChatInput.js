import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Textarea from 'muicss/lib/react/textarea';
require('../../styles/Chat.scss');

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      typing: false
    };
  }
  onMessageChange(event) {
    event.preventDefault();
    const { 
      userData,
      socket
    } = this.props;
    const { typing } = this.state;
    const messageValue = event.target.value;

    this.setState({message: messageValue});

    if ( (messageValue.length > 0) && (!typing) ) {
      socket.emit('typing', userData.username);
      this.setState({typing: true});
    }

    if ( (messageValue.length === 0) && (typing) ) {
      socket.emit('not typing', userData.username);
      this.setState({typing: false});
    }
  }
  render() {
    const { 
      message,
      typing
    } = this.state

    return (
      <Textarea 
        className="chat-input"
        hint="Type here"
        value={message}
        onChange={::this.onMessageChange} 
      />
    )
  }
}

ChatInput.propTypes={
  userData: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired
}

export default ChatInput;