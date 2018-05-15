import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-simple-contenteditable';
import { Emojione } from 'react-emoji-render';
import { Button } from 'muicss/react';
import { Picker, Emoji } from 'emoji-mart';
import FontAwesome from 'react-fontawesome';
import emojione from 'emojione';
import uuidv4 from 'uuid/v4';
import 'emoji-mart/css/emoji-mart.css';
import './styles.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caretPosition: null,
      message: '',
      typing: false,
      emojiPicker: false,
      validMessage: false
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
  onMessageKeyPress(event) {
    if ( event.key === 'Enter' ) {
      event.preventDefault();

      document.getElementById('chat-input').innerHTML = '';
    }
  }
  onMessageKeyUp(event) {
    const {
      message,
      validMessage
    } = this.state;

    if ( message.trim().length ) {
      this.setState({validMessage: true});
    } else {
      this.setState({validMessage: false});
    }

    if ( (event.key === 'Enter') && validMessage ) {
      this.setState({
        message: '',
        typing: false,
        emojiPicker: false,
        validMessage: false
      });

      ::this.handleSendMessageOnChange(event);
    }
    ::this.handleSaveCaretPosition(event);
  }
  handleSaveCaretPosition(event) {
    event.preventDefault();

    if ( window.getSelection ) {
      var selection = window.getSelection();
      if ( selection.getRangeAt && selection.rangeCount ) {
        this.setState({caretPosition: selection.getRangeAt(0)});
      }
    } else if ( document.selection && document.selection.createRange ) {
      this.setState({caretPosition: document.selection.createRange()});
    } else {
      this.setState({caretPosition: null});
    }
  }
  handleEmojiPickerToggle(event) {
    event.preventDefault();

    const {
      caretPosition,
      emojiPicker
    } = this.state;

    ::this.handleSaveCaretPosition(event);
    this.setState({emojiPicker: !emojiPicker});
  }
  handleEmojiPickerSelect(emoji, event) {
    event.preventDefault();

    const {
      caretPosition,
      message
    } = this.state;

    var emojiSelect = emojione.toImage(emoji.colons);

    console.log(emojiSelect);
    if ( caretPosition ) {
      if ( window.getSelection ) {
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(caretPosition);
      } else if ( document.selection && caretPosition.select ) {
        caretPosition.select();
      }
    }

    document.getElementById('chat-input').focus();
    ::this.handleInsertEmoji(emojiSelect);

    this.setState({validMessage: true});
  }
  handleInsertEmoji(emoji) {
    if ( window.getSelection ) {
      var selection = window.getSelection();
      if ( selection.getRangeAt && selection.rangeCount ) {
        var range = selection.getRangeAt(0);
        range.deleteContents();

        var element = document.createElement("div");
        element.innerHTML = emoji;

        var fragment = document.createDocumentFragment(), node, lastNode;
        while ( (node = element.firstChild) ) {
          lastNode = fragment.appendChild(node);
        }

        var firstNode = fragment.firstChild;
        range.insertNode(fragment);

        if ( lastNode ) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }

        this.setState({caretPosition: selection.getRangeAt(0)});
      }
    } else if ( document.selection && document.selection.createRange ) {
      var range = document.selection.createRange();
      range.pasteHTML(emoji);
      range.select();

      this.setState({caretPosition: document.selection.createRange()});
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

    handleSocketIsNotTyping(userData, activeChatRoomData._id);
    handleSendMessage(newMessage);
  }
  handleSendMessageOnClick(event) {
    event.preventDefault();

    const {
      userData,
      activeChatRoomData,
      handleSocketIsNotTyping,
      handleSendMessage
    } = this.props;
    const {
      message,
      validMessage
    } = this.state;
    const newMessageID = uuidv4();
    const newMessage = {
      newMessageID: newMessageID,
      text: message.trim(),
      user: userData,
      chatRoom: activeChatRoomData
    };

    if ( validMessage ) {
      handleSocketIsNotTyping(userData, activeChatRoomData._id);
      handleSendMessage(newMessage);
      this.setState({
        message: '',
        typing: false,
        emojiPicker: false,
        validMessage: false
      });
      document.getElementById('chat-input').focus();
      document.getElementById('chat-input').innerHTML = '';
    }
  }
  render() {
    const {
      message,
      emojiPicker,
      validMessage
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
        {
          emojiPicker &&
          <div className="emoji-picker-overlay" onClick={::this.handleEmojiPickerToggle} />
        }
        <ContentEditable
          className="textfield single-line"
          id="chat-input"
          placeholder="Type here"
          autoComplete="off"
          html={message}
          onClick={::this.handleSaveCaretPosition}
          onChange={::this.onMessageChange}
          onKeyPress={::this.onMessageKeyPress}
          onKeyUp={::this.onMessageKeyUp}
          contentEditable="plaintext-only"
        />
        <div
          className="emoji-button"
          onClick={::this.handleEmojiPickerToggle}
        >
          <FontAwesome
            name="smile-o"
            size="2x"
          />
        </div>
        <Button
          className="send-button"
          onClick={::this.handleSendMessageOnClick}
          disabled={!validMessage}
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
