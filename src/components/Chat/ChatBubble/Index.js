import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { emojify } from 'react-emojione';
import ReactHtmlParser from 'react-html-parser';
import FontAwesome from 'react-fontawesome';
import TimeAgo from 'react-timeago';
import moment from 'moment';
import Avatar from '../../Avatar';
import './styles.scss';

class ChatBubble extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAudioPlaying: false
    };
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
    const { isAudioPlaying } = this.state;

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
            onClick={(e) => {message.messageType === 'image' ? ::this.handleImageClick(e) : false }}
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
                <div className="audio-player">
                  <audio ref={(audio) => {this.audio = audio}}>
                    <source src={message.fileLink} type="audio/webm" />
                  </audio>
                  <div className="player-button">
                    {
                      !isAudioPlaying
                        ?
                        <div className="play-icon" onClick={::this.handlePlayAudio}>
                          <FontAwesome name="play" />
                        </div>
                        :
                        <div className="pause-icon" onClick={::this.handlePauseAudio}>
                          <FontAwesome name="pause" />
                        </div>
                    }
                  </div>
                  <div className="player-seek">
                    <progress value="0" max="1" />
                  </div>
                </div>
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
  handlePlayAudio(event) {
    event.preventDefault();

    this.setState({isAudioPlaying: true});

    this.audio.play();
  }
  handlePauseAudio(event) {
    event.preventDefault();

    this.setState({isAudioPlaying: false});

    this.audio.pause();
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
