import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../Avatar';
import './styles.scss';

const ChatTyper = (props) => {
  return (
    <div className="chat-typer-wrapper">
      <Avatar
        image={props.profilePicture}
        size="21px"
        title={props.name}
        badgeIcon={props.badge}
        badgeCloser
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
  profilePicture: PropTypes.string.isRequired,
  badge: PropTypes.string
}

ChatTyper.defaultProps = {
  badge: ''
}

export default ChatTyper;
