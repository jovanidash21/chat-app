import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import ContentEditable from 'react-simple-contenteditable';
import { Button } from 'muicss/react';
import { Picker, Emoji } from 'emoji-mart';
import FontAwesome from 'react-fontawesome';
import uuidv4 from 'uuid/v4';
import 'emoji-mart/css/emoji-mart.css';
import './styles.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      typing: false,
      emojiPicker: false
    };
  }
  onMessageChange(event, value) {
    event.preventDefault();

    const messageValue = value;
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
  handleEmojiPickerToggle(event) {
    event.preventDefault();

    const { emojiPicker } = this.state;

    this.setState({emojiPicker: !emojiPicker});
  }
  handleEmojiPickerSelect(emoji, event) {
    event.preventDefault();

    const { message } = this.state;
    var emojiSelect = ReactDOMServer.renderToStaticMarkup(<Emoji emoji={emoji} set="emojione" size={24} html={true} />);

    this.setState({message: message + emojiSelect});
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
        typing: false,
        emojiPicker: false
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
        typing: false,
        emojiPicker: false
      });
    }
  }
  render() {
    const {
      message,
      emojiPicker
    } = this.state;

    return (
      <div className="chat-input">
        {
          emojiPicker &&
          <Picker
            color="#4bb06b"
            emoji=""
            set="emojione"
            title="Emoji"
            emojiTooltip={true}
            onClick={::this.handleEmojiPickerSelect}
          />
        }
        <ContentEditable
          className="textfield single-line"
          placeholder="Type here"
          autoComplete="off"
          html={message}
          onChange={::this.onMessageChange}
          contentEditable="plaintext-only"
        />
        <Button
          className="emoji-button"
          onClick={::this.handleEmojiPickerToggle}
        >
          <FontAwesome
            name="smile-o"
            size="2x"
          />
        </Button>
        <Button
          className="send-button"
          onClick={::this.handleSendMessageOnClick}
          disabled={!message.trim().length}
        >
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
