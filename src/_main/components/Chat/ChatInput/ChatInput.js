import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import ContentEditable from 'react-simple-contenteditable';
import { Button } from 'muicss/react';
import emojione from 'emojione';
import EmojiPicker from 'emojione-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'react-popup';
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
      validMessage: false,
      maxLengthReached: false
    };
  }
  handleDivID() {
    const { id } = this.props;
    const chatInputID = 'chat-input';

    if ( id.length > 0 ) {
      return chatInputID + '-' + id;
    } else {
      return chatInputID;
    }
  }
  onMessageChange(event, value) {
    event.preventDefault();

    const messageValue = value;

    this.setState({message: messageValue});
    ::this.handleMessageTextLength();
  }
  onMessageKeyPress(event) {
    const { maxLengthReached } = this.state;
    const messageTextLength = ::this.handleMessageText('length');

    if ( event.key === 'Enter' ) {
      event.preventDefault();
    }

    if ( maxLengthReached || messageTextLength >= 160 ) {
      Popup.alert('Sorry, maximum of 160 characters only!');
    }
  }
  onMessageKeyUp(event) {
    const {
      user,
      chatRoom,
      handleIsTyping,
      handleIsNotTyping
    } = this.props;
    const {
      message,
      typing,
      validMessage,
      maxLengthReached
    } = this.state;
    const chatInputText = document.getElementById(::this.handleDivID()).innerHTML;

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

      handleIsTyping(user, chatRoom.data._id);
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

      handleIsNotTyping(user, chatRoom.data._id);
    }

    if ( (event.key === 'Enter') && validMessage && !maxLengthReached ) {
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
  onMessagePaste(event) {
    const messageTextLength = ::this.handleMessageText('length');
    const maxLengthLeft = 160 - messageTextLength;

    if ( maxLengthLeft <= 0 ) {
      Popup.alert('Sorry, maximum of 160 characters only!');
    }
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

    this.setState({emojiPicker: !this.state.emojiPicker});
  }
  handleEmojiPickerSelect(emoji) {
    const {
      user,
      chatRoom,
      handleIsTyping
    } = this.props;
    const {
      caretPosition,
      typing,
      validMessage,
      maxLengthReached
    } = this.state;
    const messageTextLength = ::this.handleMessageText('length');

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

    document.getElementById(::this.handleDivID()).focus();

    if ( maxLengthReached || messageTextLength >= 159 ) {
      Popup.alert('Sorry, maximum of 160 characters only!');
    } else {
      ::this.handleInsertEmoji(emojiSelect);
    }

    if ( !typing && !validMessage ) {
      this.setState({
        typing: true,
        validMessage: true
      });

      handleIsTyping(user, chatRoom.data._id);
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
  handleMessageTextLength() {
    const messageTextLength = ::this.handleMessageText('length');

    if ( messageTextLength > 160 ) {
      this.setState({maxLengthReached: true});
    } else {
      this.setState({maxLengthReached: false});
    }
  }
  handleMessageText(type) {
    var emojis = document.getElementById(::this.handleDivID()).getElementsByClassName('emojione');
    var chatInputText = document.getElementById(::this.handleDivID()).innerHTML;

    var nth = 0;
    chatInputText = chatInputText.replace(/<img class="emojione" alt="(.*?)" title="(.*?)" src="(.*?)"[^>]*>/g, (match, i, original) => {
      nth++;
      return emojis[nth - 1].alt;
    });

    var element = document.createElement('div');
    element.innerHTML = chatInputText;

    var messageText = element.textContent || element.innerText || "";
    messageText = messageText.trim();

    if ( type === 'text' ) {
      return messageText;
    } else if ( type === 'length' ) {
      return messageText.length;
    }
  }
  handleSendTextMessageOnChange(event) {
    const {
      user,
      chatRoom,
      handleIsNotTyping,
      handleSendTextMessage
    } = this.props;
    const messageText = ::this.handleMessageText('text');
    const newMessageID = uuidv4();

    document.getElementById(::this.handleDivID()).innerHTML = '';
    handleIsNotTyping(user, chatRoom.data._id);
    handleSendTextMessage(newMessageID, messageText, chatRoom.data._id);
  }
  handleSendTextMessageOnClick(event) {
    event.preventDefault();

    const {
      user,
      chatRoom,
      handleIsNotTyping,
      handleSendTextMessage
    } = this.props;
    const {
      validMessage,
      maxLengthReached
    } = this.state;
    const messageText = ::this.handleMessageText('text');
    const newMessageID = uuidv4();

    if ( validMessage && !maxLengthReached ) {
      document.getElementById(::this.handleDivID()).innerHTML = '';
      document.getElementById(::this.handleDivID()).focus();
      handleIsNotTyping(user, chatRoom.data._id);
      handleSendTextMessage(newMessageID, messageText, chatRoom.data._id);

      this.setState({
        message: '',
        typing: false,
        emojiPicker: false,
        validMessage: false
      });
    }
  }
  handleDragDropBoxToggle(event) {
    event.preventDefault();

    const { handleDragDropBoxToggle } = this.props;

    handleDragDropBoxToggle(true);
  }
  render() {
    const {
      handleAudioRecorderToggle,
      disabled,
      small
    } = this.props;
    const {
      message,
      emojiPicker,
      validMessage,
      maxLengthReached
    } = this.state;

    return (
      <div
        className={
          "chat-input-wrapper" +
          (disabled ? ' disabled' : '') +
          (small ? ' small' : '')
        }
      >
        <MediaQuery query="(min-width: 768px)">
          <React.Fragment>
            {
              emojiPicker &&
              <React.Fragment>
                <EmojiPicker onChange={::this.handleEmojiPickerSelect} search />
                {
                  !small &&
                  <div className="emoji-picker-overlay" onClick={::this.handleEmojiPickerToggle} />
                }
              </React.Fragment>
            }
          </React.Fragment>
        </MediaQuery>
        <div className="chat-input">
          <ContentEditable
            className="textfield single-line"
            id={::this.handleDivID()}
            placeholder="Type here"
            autoComplete="off"
            html={message}
            tagName="span"
            onClick={::this.handleSaveCaretPosition}
            onChange={::this.onMessageChange}
            onKeyPress={::this.onMessageKeyPress}
            onKeyUp={::this.onMessageKeyUp}
            onPaste={::this.onMessagePaste}
            contentEditable="plaintext-only"
          />
          <div className="extras">
            <div className="extra-buttons">
              <div
                className="extra-button audio-button"
                onClick={handleAudioRecorderToggle}
                title="Send Voice Message"
              >
                <FontAwesomeIcon icon="microphone" />
              </div>
              <div
                className="extra-button file-button"
                onClick={::this.handleDragDropBoxToggle}
                title="Add a File"
              >
                <FontAwesomeIcon icon="paperclip" />
              </div>
              <MediaQuery query="(min-width: 768px)">
                <div
                  className={"extra-button emoji-button " + (emojiPicker ? 'active' : '')}
                  onClick={::this.handleEmojiPickerToggle}
                  title="Add Emoji"
                >
                  <FontAwesomeIcon icon={["far", "smile"]} />
                </div>
              </MediaQuery>
            </div>
            {
              !small &&
              <div className="extra-notes">
                <div className="note">
                  <b>*bold*</b>
                </div>
                <div className="note">
                  <i>_italic_</i>
                </div>
                <div className="note">
                  ~strike~
                </div>
                <div className="note">
                  <code>`code`</code>
                </div>
                <div className="note">
                  <code>```preformatted```</code>
                </div>
              </div>
            }
          </div>
        </div>
        <Button
          className="button button-primary send-button"
          onClick={::this.handleSendTextMessageOnClick}
          disabled={!validMessage || maxLengthReached}
        >
          <div className="send-icon">
            <FontAwesomeIcon icon={["far", "paper-plane"]} size="2x" />
          </div>
        </Button>
      </div>
    )
  }
}

ChatInput.propTypes = {
  id: PropTypes.string,
  user: PropTypes.object.isRequired,
  chatRoom: PropTypes.object.isRequired,
  handleIsTyping: PropTypes.func.isRequired,
  handleIsNotTyping: PropTypes.func.isRequired,
  handleSendTextMessage: PropTypes.func.isRequired,
  handleAudioRecorderToggle: PropTypes.func.isRequired,
  handleDragDropBoxToggle: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  small: PropTypes.bool
}

ChatInput.defaultProps = {
  id: '',
  disabled: false,
  small: false
}

export default ChatInput;
