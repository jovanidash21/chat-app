import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ChatTyper = (props) => {
  return (
    <div className="chat-typer-wrapper">
      <div
        className="chat-image"
        style={{backgroundImage: `url(${props.profilePicture})`}}
        title={props.name}
      />
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
  profilePicture: PropTypes.string.isRequired
}

export default ChatTyper;
