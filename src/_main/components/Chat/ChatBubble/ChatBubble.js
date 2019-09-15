import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { emojify } from 'react-emojione';
import MediaQuery from 'react-responsive';
import Linkify from 'react-linkify';
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Plyr from 'react-plyr';
import { isDatesSameDay } from '../../../../utils/date';
import { Avatar } from '../../../../components/Avatar';
import './styles.scss';

class ChatBubble extends Component {
  constructor(props) {
    super(props);
  }
  handleTextFormat(text, tag, slice = 1) {
    if (tag !== '') {
      return ReactHtmlParser('<' + tag + '>' + text.slice(slice, -slice) + '</' + tag + '>')[0];
    }
  }
  handleMessageText() {
    const {
      message,
      sender,
      small,
    } = this.props;
    let messageText = message.text;

    switch (message.messageType) {
      case 'text':
        const emojiSize = !small ? 25 : 20;
        const options = {
          style: {
            height: emojiSize,
            width: emojiSize,
          },
        };

        messageText = messageText.replace(/ /g, "\u00a0");
        messageText = messageText.split(/(\<@[A-z0-9\s\.\,\:\(\)\-\_\^]+\>|\*[A-z0-9\s\.\,\:\(\)\-\_\^]+\*|\_[A-z0-9\s\.\,\:\(\)\-\_\^]+\_|\~[A-z0-9\s\.\,\:\(\)\-\_\^]+\~|\`\`\`[A-z0-9\s\.\,\:\(\)\-\_\^]+\`\`\`|\`[A-z0-9\s\.\,\:\(\)\-\_\^]+\`)/);

        for ( let i = 0; i < messageText.length; i += 1 ) {
          let tag = '';
          let slice = 1;

          if ( /\<@[A-z0-9\s\.\,\:\(\)\-\_\^]+\>/gi.test(messageText[i]) ) {
            tag = 'b';
          } else if ( /\*[A-z0-9\s\.\,\:\(\)\-\_\^]+\*/gi.test(messageText[i]) ) {
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
      sender,
      activeUserAdmin,
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
            activeUserAdmin &&
            <div
              className="trash-icon"
              title="Delete Message"
              onClick={::this.handleOpenDeleteMessageModal}
            >
              <FontAwesomeIcon icon={["far", "trash-alt"]} />
            </div>
          }
          <div
            className={(message.messageType !== 'image' ? 'chat-bubble ' : 'chat-image ') + (sender ? 'right' : '')}
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
            sender &&
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
                      <FontAwesomeIcon className="sent" icon="check-square" />
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
      handleImageLightboxToggle,
    } = this.props;

    handleImageLightboxToggle(message._id);
  }
  handleAudioOnPlay(event) {
    const {
      index,
      handleAudioPlayingToggle,
    } = this.props;

    handleAudioPlayingToggle(index);
  }
  handleOpenDeleteMessageModal(event) {
    event.preventDefault();

    const {
      message,
      activeUserAdmin,
      handleOpenDeleteMessageModal,
    } = this.props;

    if ( activeUserAdmin ) {
      handleOpenDeleteMessageModal(message._id);
    }
  }
  render() {
    const {
      message,
      sender,
      previousMessageSenderID,
      nextMessageSenderID,
      previousMessageDate,
      nextMessageDate,
      small,
    } = this.props;
    const isThisAndPreviousDatesSameDay = isDatesSameDay(message.createdAt, previousMessageDate);
    const isThisAndNextDatesSameDay = isDatesSameDay(message.createdAt, nextMessageDate);
    const isPreviousMessageSameSender = isThisAndPreviousDatesSameDay && message.user._id === previousMessageSenderID;
    const isNextMessageSameSender = isThisAndNextDatesSameDay && message.user._id === nextMessageSenderID;

    return (
      <div
        className={
          "chat-bubble-wrapper " +
          (sender ? 'reverse ' : '') +
          (isPreviousMessageSameSender ? 'no-b-radius-top ' : '') +
          (isNextMessageSameSender ? 'no-b-radius-bottom ' : '') +
          (!sender && isPreviousMessageSameSender ? 'no-avatar ' : '') +
          (small ? 'small' : '')
        }
      >
        {
          ! sender &&
          ! isPreviousMessageSameSender &&
          <MediaQuery query="(max-width: 767px)">
            {(matches) => {
              return (
                <Avatar
                  image={message.user.profilePicture}
                  size={matches || small ? '25px' : '35px'}
                  name={message.user.name}
                  username={message.user.username}
                  roleChatType={message.user.role}
                  accountType={message.user.accountType}
                  badgeCloser={matches || small ? false : true}
                  showUserTooltip
                />
              )
            }}
          </MediaQuery>
        }
        <div className="chat-details">
          {
            ! sender &&
            ! isPreviousMessageSameSender &&
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
  sender: PropTypes.bool.isRequired,
  previousMessageSenderID: PropTypes.string.isRequired,
  nextMessageSenderID: PropTypes.string.isRequired,
  previousMessageDate: PropTypes.string.isRequired,
  nextMessageDate: PropTypes.string.isRequired,
  handleImageLightboxToggle: PropTypes.func.isRequired,
  handleAudioPlayingToggle: PropTypes.func.isRequired,
  activeUserAdmin: PropTypes.bool,
  handleOpenDeleteMessageModal: PropTypes.func,
  small: PropTypes.bool,
}

ChatBubble.defaultProps = {
  activeUserAdmin: false,
  handleOpenDeleteMessageModal: () => {},
  small: false,
}

export default ChatBubble;
