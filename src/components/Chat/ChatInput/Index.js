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
      ::this.handleSendMessageOnChange(event);

      this.setState({
        message: '',
        typing: false,
        emojiPicker: false,
        validMessage: false
      });
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

    this.setState({emojiPicker: !emojiPicker});
  }
  handleEmojiPickerSelect(emoji) {
    const { caretPosition } = this.state;

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
  handleMessageText() {
    var emojis = document.getElementById('chat-input').getElementsByClassName('emojione');
    var chatInputText = document.getElementById('chat-input').innerHTML;

    var element = document.createElement('textarea');
    element.innerHTML = chatInputText;

    var messageText = element.value;

    var nth = 0;
    messageText = messageText.replace(/<img class="emojione" alt="(.*?)" title="(.*?)" src="(.*?)"[^>]*>/g, (match, i, original) => {
        nth++;
        return emojis[nth - 1].alt;
      });

    return messageText;
  }
  handleSendMessageOnChange(event) {
    const {
      userData,
      activeChatRoomData,
      handleSocketIsNotTyping,
      handleSendMessage
    } = this.props;
    var messageText = ::this.handleMessageText();
    const newMessageID = uuidv4();
    const newMessage = {
      newMessageID: newMessageID,
      text: messageText.trim(),
      user: userData,
      chatRoom: activeChatRoomData
    };

    document.getElementById('chat-input').innerHTML = '';
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
    const { validMessage } = this.state;
    const messageText = ::this.handleMessageText();
    const newMessageID = uuidv4();
    const newMessage = {
      newMessageID: newMessageID,
      text: messageText.trim(),
      user: userData,
      chatRoom: activeChatRoomData
    };

    if ( validMessage ) {
      document.getElementById('chat-input').innerHTML = '';
      document.getElementById('chat-input').focus();
      handleSocketIsNotTyping(userData, activeChatRoomData._id);
      handleSendMessage(newMessage);

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
        <MediaQuery query="(min-width: 768px)">
          <div
            className="emoji-button"
            onClick={::this.handleEmojiPickerToggle}
          >
            <FontAwesome
              name="smile-o"
              size="2x"
            />
          </div>
        </MediaQuery>
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
