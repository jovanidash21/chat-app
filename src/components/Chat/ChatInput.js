import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Button
} from 'muicss/react';
import FontAwesome from 'react-fontawesome';

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
      activeChatRoomData,
      socket
    } = this.props;
    const { typing } = this.state;
    const messageValue = event.target.value;

    this.setState({message: messageValue});

    if ( (messageValue.length > 0) && (!typing) ) {
      socket.emit('typing', userData.name, activeChatRoomData._id);
      this.setState({typing: true});
    }

    if ( (messageValue.length === 0) && (typing) ) {
      socket.emit('not typing', userData.name, activeChatRoomData._id);
      this.setState({typing: false});
    }
  }
  handleSendMessage(event) {
    const {
      userData,
      activeChatRoomData,
      socket,
      handleSendMessage
    } = this.props;
    const { message } = this.state
    const data = {
      text: message.trim(),
      userID: userData._id,
      chatRoomID: activeChatRoomData._id
    };

    if ( event.key === 'Enter' ) {
      handleSendMessage(data);
      socket.emit('new message', data, activeChatRoomData._id);
      socket.emit('not typing', userData.username, activeChatRoomData._id);
      this.setState({
        message: '',
        typing: false
      });
    }
  }
  render() {
    const {
      message,
      typing
    } = this.state

    return (
      <div className="chat-input">
        <Input
          hint="Type here"
          value={message}
          onChange={::this.onMessageChange}
          onKeyDown={::this.handleSendMessage}
        />
        <Button className="send-button" onClick={::this.handleSendMessage} disabled={!typing}>
          <FontAwesome
            name="paper-plane"
            size="2x"
          />
        </Button>
      </div>
    )
  }
}

ChatInput.propTypes = {
  userData: PropTypes.object.isRequired,
  activeChatRoomData: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  handleSendMessage: PropTypes.func.isRequired
}

export default ChatInput;
