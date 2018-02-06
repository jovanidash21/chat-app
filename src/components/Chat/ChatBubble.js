import React from 'react';
import PropTypes from 'prop-types';
import { Emojione } from 'react-emoji-render';
import TimeAgo from 'react-timeago';
import moment from 'moment';
import './styles.scss';

const ChatBubble = (props) => {
  return (
    <div className={"chat-bubble-wrapper " + (props.isSender ? 'reverse' : '')} >
      <div
        className={"chat-image " + (!props.isSender ? 'left' : '')}
        style={{backgroundImage: `url(${props.userData.profilePicture})`}}
        title={props.userData.name}
      />
      <div className="chat-message">
        {
          !props.isSender &&
          <div className="chat-user-name">{props.userData.name}</div>
        }
        <div className={"chat-bubble " + (props.isSender ? 'right' : '')}>
          <div className="chat-text">
            <Emojione text={props.message} />
          </div>
        </div>
      </div>
      {
        props.time &&
        <div className="chat-time">
          <TimeAgo
            date={moment(props.time).format("MMM D, YYYY h:mm:ss A")}
            title={moment(props.time).format("dddd - MMM D, YYYY - h:mm A")}
            minPeriod={60}
          />
        </div>
      }
    </div>
  )
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
