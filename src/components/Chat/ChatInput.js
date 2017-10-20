import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'muicss/react';
import { Input } from 'muicss/react';

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
      <div className="chat-input">
        <Container fluid={true}>
          <Input hint="Type here" />
        </Container>
      </div>
    )
  }
}

ChatInput.propTypes={
  userData: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired
}

export default ChatInput;