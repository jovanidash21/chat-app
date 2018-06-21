import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import ContentEditable from 'react-simple-contenteditable';
import { Button } from 'muicss/react';
import emojione from 'emojione';
import EmojiPicker from 'emojione-picker';
import FontAwesome from 'react-fontawesome';
import uuidv4 from 'uuid/v4';
import 'emojione-picker/css/picker.css';
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

    this.setState({message: messageValue});
  }
  onMessageKeyPress(event) {
    if ( event.key === 'Enter' ) {
      event.preventDefault();
    }
  }
  onMessageKeyUp(event) {
    const {
      user,
      activeChatRoom,
      handleSocketIsTyping,
      handleSocketIsNotTyping
    } = this.props;
    const {
      message,
      typing,
      validMessage
    } = this.state;
    const chatInputText = document.getElementById('chat-input').innerHTML;

    if (
      message.trim().length > 0 &&
      !typing &&
      !validMessage &&
      chatInputText.trim().length > 0
    ) {
      this.setState({
        typing: true,
        validMessage: true
      });

      handleSocketIsTyping(user, activeChatRoom.data._id);
    }

    if (
      message.trim().length === 0 &&
      typing &&
      validMessage &&
      chatInputText.trim().length === 0
    ) {
      this.setState({
        typing: false,
        validMessage: false
      });

      handleSocketIsNotTyping(user, activeChatRoom.data._id);
    }

    if ( (event.key === 'Enter') && validMessage ) {
      ::this.handleSendTextMessageOnChange(event);

      this.setState({
        message: '',
        typing: false,
        emojiPicker: false,
        validMessage: false
      });
    }
    ::this.handleSaveCaretPosition(event);
  }
  handleImageUploadSelect(event) {
    const { handleSendImageMessage } = this.props;
    const newMessageID = uuidv4();
    const imageName = event.target.value.split(/(\\|\/)/g).pop();

    handleSendImageMessage(newMessageID, imageName, event.target.files[0]);
  }
  handleFileUploadSelect(event) {
    const { handleSendFileMessage } = this.props;
    const newMessageID = uuidv4();
    const fileName = event.target.value.split(/(\\|\/)/g).pop();

    handleSendFileMessage(newMessageID, fileName, event.target.files[0]);
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

    this.setState({emojiPicker: !emojiPicker});
  }
  handleEmojiPickerSelect(emoji) {
    const {
      user,
      activeChatRoom,
      handleSocketIsTyping
    } = this.props;
    const {
      caretPosition,
      typing,
      validMessage
    } = this.state;

    var emojiSelect = emojione.toImage(emoji.shortname);

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

    if ( !typing && !validMessage ) {
      this.setState({
        typing: true,
        validMessage: true
      });

      handleSocketIsTyping(user, activeChatRoom.data._id);
    }
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
  handleMessageText() {
    var emojis = document.getElementById('chat-input').getElementsByClassName('emojione');
    var chatInputText = document.getElementById('chat-input').innerHTML;

    var nth = 0;
    chatInputText = chatInputText.replace(/<img class="emojione" alt="(.*?)" title="(.*?)" src="(.*?)"[^>]*>/g, (match, i, original) => {
      nth++;
      return emojis[nth - 1].alt;
    });

    var element = document.createElement('div');
    element.innerHTML = chatInputText;

    var messageText = element.textContent || element.innerText || "";

    return messageText;
  }
  handleSendTextMessageOnChange(event) {
    const {
      user,
      activeChatRoom,
      handleSocketIsNotTyping,
      handleSendTextMessage
    } = this.props;
    const messageText = ::this.handleMessageText().trim();
    const newMessageID = uuidv4();

    document.getElementById('chat-input').innerHTML = '';
    handleSocketIsNotTyping(user, activeChatRoom.data._id);
    handleSendTextMessage(newMessageID, messageText);
  }
  handleSendTextMessageOnClick(event) {
    event.preventDefault();

    const {
      user,
      activeChatRoom,
      handleSocketIsNotTyping,
      handleSendTextMessage
    } = this.props;
    const { validMessage } = this.state;
    const messageText = ::this.handleMessageText().trim();
    const newMessageID = uuidv4();

    if ( validMessage ) {
      document.getElementById('chat-input').innerHTML = '';
      document.getElementById('chat-input').focus();
      handleSocketIsNotTyping(user, activeChatRoom.data._id);
      handleSendTextMessage(newMessageID, messageText);

      this.setState({
        message: '',
        typing: false,
        emojiPicker: false,
        validMessage: false
      });
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
        <MediaQuery query="(min-width: 768px)">
          <div>
            {
              emojiPicker &&
              <EmojiPicker
                onChange={::this.handleEmojiPickerSelect}
                search={true}
              />
            }
            {
              emojiPicker &&
              <div className="emoji-picker-overlay" onClick={::this.handleEmojiPickerToggle} />
            }
          </div>
        </MediaQuery>
        <ContentEditable
          className="textfield single-line"
          id="chat-input"
          placeholder="Type here"
          autoComplete="off"
          html={message}
          tagName="span"
          onClick={::this.handleSaveCaretPosition}
          onChange={::this.onMessageChange}
          onKeyPress={::this.onMessageKeyPress}
          onKeyUp={::this.onMessageKeyUp}
          contentEditable="plaintext-only"
        />
        <div className="extra-buttons">
          <div
            className="image-button"
            title="Add an image"
          >
            <input
              id="image-button"
              type="file"
              onChange={::this.handleImageUploadSelect}
            />
            <label htmlFor="image-button">
              <FontAwesome
                name="picture-o"
                size="2x"
              />
            </label>
          </div>
          <div
            className="file-button"
            title="Add a File"
          >
            <input
              id="file-button"
              type="file"
              onChange={::this.handleFileUploadSelect}
            />
            <label htmlFor="file-button">
              <FontAwesome
                name="paperclip"
                size="2x"
              />
            </label>
          </div>
          <div
            className="audio-button"
            title="Send Voice Message"
          >
            <FontAwesome
              name="microphone"
              size="2x"
            />
          </div>
          <MediaQuery query="(min-width: 768px)">
            <div
              className="emoji-button"
              onClick={::this.handleEmojiPickerToggle}
              title="Add Emoji"
            >
              <FontAwesome
                name="smile-o"
                size="2x"
              />
            </div>
          </MediaQuery>
        </div>
        <Button
          className="send-button"
          onClick={::this.handleSendTextMessageOnClick}
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
  user: PropTypes.object.isRequired,
  activeChatRoom: PropTypes.object.isRequired,
  handleSocketIsTyping: PropTypes.func.isRequired,
  handleSocketIsNotTyping: PropTypes.func.isRequired,
  handleSendTextMessage: PropTypes.func.isRequired,
  handleSendFileMessage: PropTypes.func.isRequired,
  handleSendImageMessage: PropTypes.func.isRequired
}

export default ChatInput;
