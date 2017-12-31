import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ActiveChatRoomMember = (props) => {
  return (
    <li className="chat-room-member-wrapper">
      <div className="member" title={props.chatRoomMember.name}>
        <div
          className="member-image"
          style={{backgroundImage: `url(${props.chatRoomMember.profilePicture})`}}
        />
        <div className="member-name">
          {props.chatRoomMember.name}
        </div>
      </div>
    </li>
  )
}

ActiveChatRoomMember.propTypes = {
  chatRoomMember: PropTypes.object.isRequired
}

export default ActiveChatRoomMember;
