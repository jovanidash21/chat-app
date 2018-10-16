import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OnlineIndicator } from '../OnlineIndicator';
import { Avatar } from '../../../components/Avatar';
import './styles.scss';

class ChatRoomMember extends Component {
  constructor(props) {
    super(props);
  }
  handleAddDirectChatRoom(event) {
    event.preventDefault();

    const {
      chatRoomMember,
      handleAddDirectChatRoom
    } = this.props;

    handleAddDirectChatRoom(chatRoomMember._id);
  }
  render() {
    const {
      user,
      chatRoomMember,
      isActive
    } = this.props;

    return (
      <div
        className={
          "chat-room-member " +
          (chatRoomMember.isOnline ? 'online ' : 'offline ') +
          (isActive ? 'active' : '')
        }
        title={chatRoomMember.name}
      >
        <OnlineIndicator isOnline={chatRoomMember.isOnline} />
        <Avatar
          image={chatRoomMember.profilePicture}
          size="23px"
          name={chatRoomMember.name}
          username={chatRoomMember.username}
          roleChatType={chatRoomMember.role}
          accountType={chatRoomMember.accountType}
          showUserTooltip
        />
        <div className="member-name">
          {chatRoomMember.name}
          {
            user._id === chatRoomMember._id &&
            <span className="you-label">(you)</span>
          }
        </div>
        <div className="member-options-button-wrapper">
          {
            user._id !== chatRoomMember._id &&
            <div>
              <div className="member-options-button" data-mui-toggle="dropdown">
                <FontAwesomeIcon icon="ellipsis-v" />
              </div>
              <ul className="dropdown-menu mui-dropdown__menu mui-dropdown__menu--right">
                <li>
                  <a href="#" onClick={::this.handleAddDirectChatRoom}>
                    Direct messages
                  </a>
                </li>
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
}

ChatRoomMember.propTypes = {
  user: PropTypes.object.isRequired,
  chatRoomMember: PropTypes.object.isRequired,
  handleAddDirectChatRoom: PropTypes.func.isRequired,
  isActive: PropTypes.bool
}

ChatRoomMember.defaultProps = {
  isActive: false
}

export default ChatRoomMember;
