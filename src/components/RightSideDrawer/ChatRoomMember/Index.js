import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './styles.scss';

class ChatRoomMember extends Component {
  constructor(props) {
    super(props);
  }
  handleOnlineIcon() {
    const { chatRoomMember } = this.props;

    return (
      <div className={"online-indicator " + (chatRoomMember.isOnline ? 'online' : '')}>
        <FontAwesome
          className="circle-icon"
          name={chatRoomMember.isOnline ? 'circle' : 'circle-thin'}
        />
      </div>
    )
  }
  handleAccountTypeBadgeLogo() {
    const { chatRoomMember } = this.props;

    return (
      <div className={`badge-logo ${chatRoomMember.accountType}`}>
        <FontAwesome
          className="social-icon"
          name={chatRoomMember.accountType}
        />
      </div>
    )
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
        {::this.handleOnlineIcon()}
        <div
          className="member-icon"
          style={{backgroundImage: `url(${chatRoomMember.profilePicture})`}}
        >
          {
            chatRoomMember.accountType !== 'local' &&
            ::this.handleAccountTypeBadgeLogo()
          }
        </div>
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
