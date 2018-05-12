import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ChatRoomMember = (props) => {
  return (
    <div className="chat-room-member" title={props.chatRoomMember.name}>
      <div
        className="member-icon"
        style={{backgroundImage: `url(${props.chatRoomMember.profilePicture})`}}
      />
      <div className="member-name">
        {props.chatRoomMember.name}
      </div>
    </div>
  )
}

ChatRoomMember.propTypes = {
  chatRoomMember: PropTypes.object.isRequired
}

export default ChatRoomMember;
