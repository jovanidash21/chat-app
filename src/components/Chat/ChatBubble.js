import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emojione from 'emojione';
import ReactHtmlParser from 'react-html-parser';
import TimeAgo from 'react-timeago';
import moment from 'moment';
import './styles.scss';

class ChatBubble extends Component {
  constructor(props) {
    super(props);
  }
  handleConvertEmojiTextToImage() {
    const { message } = this.props;
    var messageText = message;

    messageText = messageText.replace(/:[^>]*:/g, (match, i, original) => {
      return ',' + match + ',';
    });

    var messageArray = messageText.split(",");

    for ( var i = 0; i < messageArray.length; i++ ) {
      if ( /:[^>]*:/.test(messageArray[i]) ) {
        messageArray[i] = ReactHtmlParser(emojione.toImage(messageArray[i]));
      }
    }

    return messageArray;
  }
 render() {
    const {
      userData,
      time,
      isSender
    } = this.props;

    return (
      <div className={"chat-bubble-wrapper " + (isSender ? 'reverse' : '')} >
        <div
        className={"chat-image " + (!isSender ? 'left' : '')}
        style={{backgroundImage: `url(${userData.profilePicture})`}}
        title={userData.name}
        />
          <div className="chat-message">
            {
              !isSender &&
              <div className="chat-user-name">{userData.name}</div>
            }
            <div className={"chat-bubble " + (isSender ? 'right' : '')}>
              <div className="chat-text">
                {::this.handleConvertEmojiTextToImage()}
              </div>
            </div>
          </div>
          {
            time &&
            <div className="chat-time">
              <TimeAgo
              date={moment(time).format("MMM D, YYYY h:mm:ss A")}
              title={moment(time).format("dddd - MMM D, YYYY - h:mm A")}
              minPeriod={60}
              />
            </div>
          }
      </div>
    )
  }
}

ChatBubble.propTypes = {
  userData: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.string,
  isSender: PropTypes.bool.isRequired
}

ChatBubble.defaultProps = {
  time: ''
}

export default ChatBubble;
