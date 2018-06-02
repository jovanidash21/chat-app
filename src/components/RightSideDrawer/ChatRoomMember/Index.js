import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Avatar from '../../Avatar';
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

    handleAddDirectChatRoom(event, chatRoomMember._id);
  }
  render() {
    const {
      userData,
      chatRoomMember
    } = this.props;

    return (
      <div className="chat-room-member" title={chatRoomMember.name}>
        <div className={"online-indicator " + (chatRoomMember.isOnline ? 'online' : '')}>
          <FontAwesome
            className="circle-icon"
            name={chatRoomMember.isOnline ? 'circle' : 'circle-thin'}
          />
        </div>
        <Avatar
          image={chatRoomMember.profilePicture}
          size="23px"
          badgeIcon={(chatRoomMember.accountType !== 'local' ? chatRoomMember.accountType : '' )}
        />
        <div className="member-name">
          {chatRoomMember.name}
          {
            userData._id === chatRoomMember._id &&
            <span className="you-label">(you)</span>
          }
        </div>
        <div className="member-options-button-wrapper">
          {
            userData._id !== chatRoomMember._id &&
            <div>
              <div className="member-options-button" data-mui-toggle="dropdown">
                <FontAwesome
                  className="options-icon"
                   name="ellipsis-v"
                />
              </div>
              <ul className="mui-dropdown__menu mui-dropdown__menu--right">
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
  userData: PropTypes.object.isRequired,
  chatRoomMember: PropTypes.object.isRequired,
  handleAddDirectChatRoom: PropTypes.func.isRequired
}

export default ChatRoomMember;
