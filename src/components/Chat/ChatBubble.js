import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import moment from 'moment';
import './styles.scss';

const ChatBubble = (props) => {
  return (
    <div className={"chat-bubble-wrapper " + (props.isSender ? 'reverse' : '')} >
      <div
        className="chat-image"
        style={{backgroundImage: `url(${props.userData.profilePicture})`}}
        title={props.userData.username}
      />
      <div className={"chat-bubble " + (props.isSender ? 'right' : '')}>
        <div className="chat-text">
          {props.message}
        </div>
      </div>
      <div className="chat-time">
        <TimeAgo
          date={moment(props.time).format("MMM D, YYYY h:mm a")}
          minPeriod={60}
        />
      </div>
    </div>
  );
}

ChatBubble.propTypes = {
  userData: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isSender: PropTypes.bool.isRequired
}

export default ChatBubble;
