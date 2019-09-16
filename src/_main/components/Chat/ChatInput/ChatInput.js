import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import ContentEditable from 'react-simple-contenteditable';
import { Button } from 'muicss/react';
import emojione from 'emojione';
import EmojiPicker from 'emojione-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'react-popup';
import uuidv4 from 'uuid/v4';
import { AutocompleteBox } from './AutocompleteBox';
import {
  getCaretPosition,
  insertHTML,
  getAutoCompleteTextQuery,
  insertAutocompleteHTML,
  removeAutocompleteHTML,
  getPlainText,
} from '../../../../utils/input';
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
      userTagging: false,
      validMessage: false,
      maxLengthReached: false,
    };
  }
  componentWillMount() {
    document.addEventListener('mousedown', ::this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', ::this.handleClick, false);
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
  handleClick(event) {
    if (this.emojiPicker && ! this.emojiPicker.contains(event.target)) {
      this.setState({emojiPicker: false});
    }

    if (this.autocompleteBox && ! this.autocompleteBox.contains(event.target)) {
      this.setState({userTagging: false});
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
      chatRoomID,
      handleIsTyping,
      handleIsNotTyping,
    } = this.props;
    const {
      message,
      typing,
      userTagging,
      validMessage,
      maxLengthReached,
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
        validMessage: true,
      });

      handleIsTyping(user, chatRoomID);
    }

    if (
      message.trim().length === 0 &&
      typing &&
      validMessage &&
      chatInputText.trim().length === 0
    ) {
      this.setState({
        typing: false,
        validMessage: false,
      });

      handleIsNotTyping(user, chatRoomID);
    }

    if ( event.key === 'Escape' ) {
      this.setState({
        emojiPicker: false,
        userTagging: false,
      });
    }

    if ((event.key === 'Enter') && validMessage && !maxLengthReached) {
      ::this.handleSendTextMessageOnChange(event);

      this.setState({
        message: '',
        typing: false,
        emojiPicker: false,
        validMessage: false,
      });
    }

    if (removeAutocompleteHTML()) {
      this.setState({message: document.getElementById(::this.handleDivID()).innerHTML});
    }

    ::this.handleSaveCaretPosition();
    ::this.handleUserTaggingToggle();
  }
  onMessageClick(event) {
    event.preventDefault();

    ::this.handleSaveCaretPosition();
    ::this.handleUserTaggingToggle();
  }
  onMessagePaste(event) {
    const messageTextLength = ::this.handleMessageText('length');
    const maxLengthLeft = 160 - messageTextLength;

    if ( maxLengthLeft <= 0 ) {
      Popup.alert('Sorry, maximum of 160 characters only!');
    }
  }
  handleSaveCaretPosition() {
    const caretPosition = getCaretPosition( document.getElementById(::this.handleDivID()) );

    this.setState({caretPosition: caretPosition});
  }
  handleEmojiPickerToggle(event) {
    event.preventDefault();

    this.setState({
      emojiPicker: ! this.state.emojiPicker,
      userTagging: false,
    });
  }
  handleUserTaggingToggle() {
    const {
      chatRoomID,
      handleSearchUser,
    } = this.props;
    const userTagQuery = getAutoCompleteTextQuery( document.getElementById(::this.handleDivID()) );

    if ( userTagQuery.length > 0 ) {
      this.setState({
        emojiPicker: false,
        userTagging: true,
      });

      handleSearchUser(userTagQuery, chatRoomID);
    } else {
      this.setState({userTagging: false});
    }
  }
  handleEmojiPickerSelect(emoji) {
    const {
      user,
      chatRoomID,
      handleIsTyping,
    } = this.props;
    const {
      caretPosition,
      message,
      typing,
      validMessage,
      maxLengthReached,
    } = this.state;
    const messageTextLength = ::this.handleMessageText('length');
    const emojiSelect = emojione.toImage(emoji.shortname);
    let newCaretPosition = caretPosition;
    let newMessage = message;

    if (maxLengthReached || messageTextLength >= 159) {
      Popup.alert('Sorry, maximum of 160 characters only!');
    } else {
      newCaretPosition = insertHTML(document.getElementById(::this.handleDivID()), caretPosition, emojiSelect);
      newMessage = document.getElementById(::this.handleDivID()).innerHTML;
    }

    this.setState({
      caretPosition: newCaretPosition,
      message: newMessage,
    });

    if ( !typing && !validMessage ) {
      this.setState({
        typing: true,
        validMessage: true,
      });

      handleIsTyping(user, chatRoomID);
    }
  }
  handleUserTaggingSelect(selectedUser) {
    const {
      user,
      chatRoomID,
      handleIsTyping,
    } = this.props;
    const {
      caretPosition,
      message,
      typing,
      validMessage,
      maxLengthReached,
    } = this.state;
    const messageTextLength = ::this.handleMessageText('length');
    let newCaretPosition = caretPosition;
    let newMessage = message;

    if ( maxLengthReached || messageTextLength >= ( 160 - selectedUser.username.length ) ) {
      Popup.alert('Sorry, maximum of 160 characters only!');
    } else {
      newCaretPosition = insertAutocompleteHTML(document.getElementById(::this.handleDivID()), caretPosition, `<span data-id="${selectedUser._id}" class="user-username-tag">@${selectedUser.username}</span>`);
      newMessage = document.getElementById(::this.handleDivID()).innerHTML;
    }

    this.setState({
      caretPosition: newCaretPosition,
      message: newMessage,
      userTagging: false,
    });

    if (!typing && !validMessage) {
      this.setState({
        typing: true,
        validMessage: true,
      });

      handleIsTyping(user, chatRoomID);
    }
  }
  handleMessageTextLength() {
    const messageTextLength = ::this.handleMessageText('length');

    if (messageTextLength > 160) {
      this.setState({maxLengthReached: true});
    } else {
      this.setState({maxLengthReached: false});
    }
  }
  handleMessageText(type) {
    const messageText = getPlainText( document.getElementById(::this.handleDivID()) );

    if (type === 'text') {
      return messageText;
    } else if (type === 'length') {
      return messageText.length;
    }
  }
  handleSendTextMessageOnChange(event) {
    const {
      user,
      chatRoomID,
      handleIsNotTyping,
      handleSendTextMessage,
    } = this.props;
    const messageText = ::this.handleMessageText('text');
    const newMessageID = uuidv4();

    document.getElementById(::this.handleDivID()).innerHTML = '';
    handleIsNotTyping(user, chatRoomID);
    handleSendTextMessage(newMessageID, messageText, chatRoomID);
  }
  handleSendTextMessageOnClick(event) {
    event.preventDefault();

    const {
      user,
      chatRoomID,
      handleIsNotTyping,
      handleSendTextMessage,
    } = this.props;
    const {
      validMessage,
      maxLengthReached,
    } = this.state;
    const messageText = ::this.handleMessageText('text');
    const newMessageID = uuidv4();

    if (validMessage && !maxLengthReached) {
      document.getElementById(::this.handleDivID()).innerHTML = '';
      document.getElementById(::this.handleDivID()).focus();
      handleIsNotTyping(user, chatRoomID);
      handleSendTextMessage(newMessageID, messageText, chatRoomID);

      this.setState({
        message: '',
        typing: false,
        emojiPicker: false,
        validMessage: false,
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
      userTagSuggestions,
      disabled,
      userTagLoading,
      small,
    } = this.props;
    const {
      message,
      emojiPicker,
      userTagging,
      validMessage,
      maxLengthReached,
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
          <Fragment>
            {
              emojiPicker &&
              <div ref={(element) => { this.emojiPicker = element; }}>
                <EmojiPicker onChange={::this.handleEmojiPickerSelect} search />
              </div>
            }
          </Fragment>
        </MediaQuery>
        {
          userTagging &&
          <div ref={(element) => { this.autocompleteBox = element; }}>
            <AutocompleteBox
              suggestions={userTagSuggestions}
              loading={userTagLoading}
              handleSelectSuggestion={::this.handleUserTaggingSelect}
            />
          </div>
        }
        <div className="chat-input">
          <ContentEditable
            className="textfield single-line"
            id={::this.handleDivID()}
            placeholder="Type here"
            autoComplete="off"
            html={message}
            tagName="span"
            onClick={::this.onMessageClick}
            onChange={::this.onMessageChange}
            onKeyPress={::this.onMessageKeyPress}
            onKeyUp={::this.onMessageKeyUp}
            onPaste={::this.onMessagePaste}
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
  chatRoomID: PropTypes.string.isRequired,
  handleIsTyping: PropTypes.func.isRequired,
  handleIsNotTyping: PropTypes.func.isRequired,
  handleSearchUser: PropTypes.func.isRequired,
  handleSendTextMessage: PropTypes.func.isRequired,
  handleAudioRecorderToggle: PropTypes.func.isRequired,
  handleDragDropBoxToggle: PropTypes.func.isRequired,
  userTagSuggestions: PropTypes.array,
  disabled: PropTypes.bool,
  userTagLoading: PropTypes.bool,
  small: PropTypes.bool,
}

ChatInput.defaultProps = {
  id: '',
  userTagSuggestions: [],
  disabled: false,
  userTagLoading: false,
  small: false,
}

export default ChatInput;
