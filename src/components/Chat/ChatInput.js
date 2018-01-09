import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Button
} from 'muicss/react';
import FontAwesome from 'react-fontawesome';
import uuidv4 from 'uuid/v4';
import './styles.scss';

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

    const messageValue = event.target.value;
    const {
      userData,
      activeChatRoomData,
      handleSocketIsTyping,
      handleSocketIsNotTyping
    } = this.props
    const { typing } = this.state;

    this.setState({message: messageValue});

    if ( (messageValue.length > 0) && (!typing) ) {
      handleSocketIsTyping(userData, activeChatRoomData._id);
      this.setState({typing: true});
    }

    if ( (messageValue.length === 0) && (typing) ) {
      handleSocketIsNotTyping(userData, activeChatRoomData._id);
      this.setState({typing: false});
    }
  }
  handleSendMessageOnChange(event) {
    const {
      userData,
      activeChatRoomData,
      handleSocketIsNotTyping,
      handleSendMessage
    } = this.props;
    const { message } = this.state;
    const newMessageID = uuidv4();
    const newMessage = {
      newMessageID: newMessageID,
      text: message.trim(),
      user: userData,
      chatRoom: activeChatRoomData
    };

    if ( (event.key === 'Enter') && message.trim().length ) {
      handleSocketIsNotTyping(userData, activeChatRoomData._id);
      handleSendMessage(newMessage);
      this.setState({
        message: '',
        typing: false
      });
    }
  }
  handleSendMessageOnClick(event) {
    event.preventDefault();

    const {
      userData,
      activeChatRoomData,
      handleSocketIsNotTyping,
      handleSendMessage
    } = this.props;
    const { message } = this.state;
    const newMessageID = uuidv4();
    const newMessage = {
      newMessageID: newMessageID,
      text: message.trim(),
      user: userData,
      chatRoom: activeChatRoomData
    };

    if ( message.trim().length ) {
      handleSocketIsNotTyping(userData, activeChatRoomData._id);
      handleSendMessage(newMessage);
      this.setState({
        message: '',
        typing: false
      });
    }
  }
  render() {
    const { message } = this.state

    return (
      <div className="chat-input">
        <Input
          hint="Type here"
          value={message}
          onChange={::this.onMessageChange}
          onKeyDown={::this.handleSendMessageOnChange}
        />
        <Button className="send-button" onClick={::this.handleSendMessageOnClick} disabled={!message.trim().length}>
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
  handleSocketIsTyping: PropTypes.func.isRequired,
  handleSocketIsNotTyping: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired
}

export default ChatInput;
