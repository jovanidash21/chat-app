import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { emojify } from 'react-emojione';
import ReactHtmlParser from 'react-html-parser';
import FontAwesome from 'react-fontawesome';
import ReactAudioPlayer from 'react-audio-player';
import TimeAgo from 'react-timeago';
import moment from 'moment';
import Avatar from '../../Avatar';
import './styles.scss';

class ChatBubble extends Component {
  constructor(props) {
    super(props);
  }
  handleMessageText() {
    const {
      message,
      isSender
    } = this.props;
    var messageText = message.text;

    switch (message.messageType) {
      case 'text':
        const options = {
          style: {
            height: 25,
            width: 25
          }
        };

        messageText = messageText.replace(/ /g, "\u00a0");
        messageText = emojify(messageText, options);
        break;
      case 'file':
        messageText = '<a download="' + messageText + '" href="' + message.fileLink + '" target="_blank">' + messageText + '</a>';
        messageText = ReactHtmlParser(messageText);
        break;
      case 'image':
        messageText = '<img class="image-message" src="' + message.fileLink + '" />';
        messageText = ReactHtmlParser(messageText);
        break;
      case 'audio':
        messageText = '';
        break
    }

    return messageText;
  }
  handleChatBubbleRender() {
    const {
      message,
      isSender
    } = this.props;

    if ( message.messageType !== 'text' && message.fileLink.length === 0 ) {
      return (
        <div className="uploading-icon">
          <FontAwesome name="spinner" pulse />
        </div>
      )
    } else {
      return (
        <div className="chat-message">
          <div
            className={(message.messageType !== 'image' ? 'chat-bubble ' : 'chat-image ') + (isSender ? 'right' : '')}
            onClick={message.messageType === 'image' ? ::this.handleImageClick : false}
          >
            <div className="chat-text">
              {
                message.messageType === 'file' &&
                <div className="file-icon">
                  <FontAwesome name="file" />
                </div>
              }
              {
                message.messageType === 'audio' &&
                <ReactAudioPlayer
                  src={message.fileLink}
                  autoPlay={false}
                  controls
                />
              }
              {::this.handleMessageText()}
            </div>
          </div>
          {
            message.createdAt &&
            <div className="chat-time">
              <TimeAgo
                date={moment(message.createdAt).format("MMM D, YYYY h:mm:ss A")}
                title={moment(message.createdAt).format("dddd - MMM D, YYYY - h:mm A")}
                minPeriod={60}
              />
            </div>
          }
        </div>
      )
    }
  }
  handleImageClick(event) {
    event.preventDefault();

    const {
      message,
      handleImageLightboxToggle
    } = this.props;

    handleImageLightboxToggle(message._id);
  }
  render() {
    const {
      message,
      isSender
    } = this.props;

    return (
      <div className={"chat-bubble-wrapper " + (isSender ? 'reverse' : '')}>
        {
          !isSender &&
          <Avatar
            image={message.user.profilePicture}
            size="35px"
            title={message.user.name}
            accountType={message.user.accountType}
            badgeCloser
          />
        }
        <div className="chat-details">
          {
            !isSender &&
            <div className="chat-user-name">{message.user.name}</div>
          }
          {::this.handleChatBubbleRender()}
        </div>
      </div>
    )
  }
}

ChatBubble.propTypes = {
  message: PropTypes.object.isRequired,
  isSender: PropTypes.bool.isRequired,
  handleImageLightboxToggle: PropTypes.func.isRequired
}

export default ChatBubble;
