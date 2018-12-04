import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { emojify } from 'react-emojione';
import MediaQuery from 'react-responsive';
import Linkify from 'react-linkify';
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Plyr from 'react-plyr';
import TimeAgo from 'react-timeago';
import moment from 'moment';
import { isDatesSameDay } from '../../../../utils/date';
import { Avatar } from '../../../../components/Avatar';
import './styles.scss';

class ChatBubble extends Component {
  constructor(props) {
    super(props);
  }
  handleTextFormat(text, tag, slice=1) {
    if ( tag !== '' ) {
      return ReactHtmlParser('<' + tag + '>' + text.slice(slice, -slice) + '</' + tag + '>')[0];
    }
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
        messageText = messageText.split(/(\*[A-z0-9\s\.\,\:\(\)\-\_\^]+\*|\_[A-z0-9\s\.\,\:\(\)\-\_\^]+\_|\~[A-z0-9\s\.\,\:\(\)\-\_\^]+\~|\`\`\`[A-z0-9\s\.\,\:\(\)\-\_\^]+\`\`\`|\`[A-z0-9\s\.\,\:\(\)\-\_\^]+\`)/);

        for (var i = 0; i < messageText.length; i++) {
          var tag = '';
          var slice = 1;

          if ( /\*[A-z0-9\s\.\,\:\(\)\-\_\^]+\*/gi.test(messageText[i]) ) {
            tag = 'b';
          } else if ( /\_[A-z0-9\s\.\,\:\(\)\-\_\^]+\_/gi.test(messageText[i]) ) {
            tag = 'i';
          } else if ( /\~[A-z0-9\s\.\,\:\(\)\-\_\^]+\~/gi.test(messageText[i]) ) {
            tag = 'strike';
          } else if ( /\`\`\`[A-z0-9\s\.\,\:\(\)\-\_\^]+\`\`\`/gi.test(messageText[i]) ) {
            tag = 'pre';
            slice = 3;
          } else if ( /\`[A-z0-9\s\.\,\:\(\)\-\_\^]+\`/gi.test(messageText[i]) ) {
            tag = 'code';
          }

          if ( tag.length > 0 ) {
            const formatText = ::this.handleTextFormat(messageText[i], tag, slice);

            messageText[i] = {...formatText};
            messageText[i].key = i;
          } else {
            messageText[i] = emojify(messageText[i], options);
            messageText[i] = (<Linkify key={i} properties={{target: '_blank'}}>{messageText[i]}</Linkify>);
          }
        }
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
      index,
      message,
      isSender,
      isActiveUserAdmin
    } = this.props;

    if ( message.messageType !== 'text' && message.fileLink.length === 0 ) {
      return (
        <div className="uploading-icon">
          <FontAwesomeIcon icon="spinner" pulse />
        </div>
      )
    } else {
      return (
        <div className="chat-message">
          {
            isActiveUserAdmin &&
            <div
              className="trash-icon"
              title="Delete Message"
              onClick={::this.handleOpenModal}
            >
              <FontAwesomeIcon icon={["far", "trash-alt"]} />
            </div>
          }
          <div
            className={(message.messageType !== 'image' ? 'chat-bubble ' : 'chat-image ') + (isSender ? 'right' : '')}
            onClick={(e) => {message.messageType === 'image' ? ::this.handleImageClick(e) : false }}
          >
            <div className="chat-text">
              {
                message.messageType === 'file' &&
                <div className="file-icon">
                  <FontAwesomeIcon icon="file" />
                </div>
              }
              {
                message.messageType === 'audio' &&
                <Plyr
                  className={"react-plyr-" + index}
                  type="audio"
                  url={message.fileLink}
                  volume={1}
                  onPlay={::this.handleAudioOnPlay}
                />
              }
              {::this.handleMessageText()}
            </div>
          </div>
          {
            isSender &&
            <div className="sending-status">
              {
                message.isSending !== undefined && (
                  message.isSending
                    ?
                    <div title="Message is sending">
                      <FontAwesomeIcon className="sending" icon={["far", "square"]} />
                    </div>
                    :
                    <div title="Message is sent">
                      <FontAwesomeIcon
                        className="sent"
                        icon="check-square"
                        title="Message is sent"
                      />
                    </div>
                )
              }
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
  handleAudioOnPlay(event) {
    const {
      index,
      handleAudioPlayingToggle
    } = this.props;

    handleAudioPlayingToggle(index);
  }
  handleOpenModal(event) {
    event.preventDefault();

    const {
      message,
      isActiveUserAdmin,
      handleOpenModal
    } = this.props;

    if ( isActiveUserAdmin ) {
      handleOpenModal(message._id);
    }
  }
  render() {
    const {
      message,
      isSender,
      previousMessageSenderID,
      nextMessageSenderID,
      previousMessageDate,
      nextMessageDate
    } = this.props;
    const isThisAndPreviousDatesSameDay = isDatesSameDay(message.createdAt, previousMessageDate);
    const isThisAndNextDatesSameDay = isDatesSameDay(message.createdAt, nextMessageDate);
    const isPreviousMessageSameSender = isThisAndPreviousDatesSameDay && message.user._id === previousMessageSenderID;
    const isNextMessageSameSender = isThisAndNextDatesSameDay && message.user._id === nextMessageSenderID;

    return (
      <div
        className={
          "chat-bubble-wrapper " +
          (isSender ? 'reverse ' : '') +
          (isPreviousMessageSameSender ? 'no-b-radius-top ' : '') +
          (isNextMessageSameSender ? 'no-b-radius-bottom ' : '') +
          (!isSender && isPreviousMessageSameSender ? 'no-avatar' : '')
        }
      >
        {
          !isSender &&
          !isPreviousMessageSameSender &&
          <MediaQuery query="(min-width: 768px)">
            {(matches) => {
              return (
                <Avatar
                  image={message.user.profilePicture}
                  size={matches ? '35px' : '25px'}
                  name={message.user.name}
                  username={message.user.username}
                  roleChatType={message.user.role}
                  accountType={message.user.accountType}
                  badgeCloser={matches ? true : false}
                  showUserTooltip
                />
              )
            }}
          </MediaQuery>
        }
        <div className="chat-details">
          {
            !isSender &&
            !isPreviousMessageSameSender &&
            <div className="chat-user-name">{message.user.name}</div>
          }
          {::this.handleChatBubbleRender()}
        </div>
      </div>
    )
  }
}

ChatBubble.propTypes = {
  index: PropTypes.number.isRequired,
  message: PropTypes.object.isRequired,
  isSender: PropTypes.bool.isRequired,
  previousMessageSenderID: PropTypes.string.isRequired,
  nextMessageSenderID: PropTypes.string.isRequired,
  previousMessageDate: PropTypes.string.isRequired,
  nextMessageDate: PropTypes.string.isRequired,
  handleImageLightboxToggle: PropTypes.func.isRequired,
  handleAudioPlayingToggle: PropTypes.func.isRequired,
  isActiveUserAdmin: PropTypes.bool,
  handleOpenModal: PropTypes.func
}

ChatBubble.defaultProps = {
  isActiveUserAdmin: false,
  handleOpenModal: () => {}
}

export default ChatBubble;
