import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './styles.scss';

const ChatTyper = (props) => {
  return (
    <div className="chat-typer-wrapper">
      <div
        className="chat-image"
        style={{backgroundImage: `url(${props.profilePicture})`}}
        title={props.name}
      >
        {
          props.badge.length > 0 &&
          <div className={`badge-logo closer ${props.badge}`}>
            <FontAwesome
              className="social-icon"
              name={props.badge}
            />
          </div>
        }
      </div>
      <div className="chat-typer">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

ChatTyper.propTypes = {
  name: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
  badge: PropTypes.string
}

ChatTyper.defaultProps = {
  badge: ''
}

export default ChatTyper;
