import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '../../../../components/Avatar';
import './styles.scss';

const ChatTyper = (props) => {
  return (
    <div className="chat-typer-wrapper">
      <Avatar
        image={props.typer.profilePicture}
        size="21px"
        name={props.typer.name}
        roleChatType={props.typer.role}
        accountType={props.typer.accountType}
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
  typer: PropTypes.object.isRequired,
}

export default ChatTyper;
