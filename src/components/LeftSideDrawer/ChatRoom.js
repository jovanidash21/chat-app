import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './styles.scss';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const {
      index,
      userData,
      chatRoomData,
      handleChangeChatRoom,
    } = this.props;

    if (index === 0) {
      handleChangeChatRoom(chatRoomData, userData._id, '');
    }
  }
  handleAccountTypeBadgeLogo() {
    const {
      userData,
      chatRoomData
    } = this.props;

    switch ( chatRoomData.chatType ) {
      case 'private':
        return (
          <div className={`badge-logo ${userData.accountType}`}>
            <FontAwesome
              className="social-icon"
              name={userData.accountType}
            />
          </div>
        )
        break;
      case 'direct':
        for ( var i = 0; i < chatRoomData.members.length; i++ ) {
          var member = chatRoomData.members[i];

          if ( member._id != userData._id ) {
            if ( member.accountType !== 'local' ) {
              return (
                <div className={`badge-logo ${member.accountType}`}>
                  <FontAwesome
                    className="social-icon"
                    name={member.accountType}
                  />
                </div>
              )
            }
            return;
          } else {
            continue;
          }
        }
        break;
      case 'group':
        return;
    }
  }
  handleChangeChatRoom(event) {
    event.preventDefault();

    const {
      userData,
      chatRoomData,
      activeChatRoom,
      handleChangeChatRoom,
      handleFetchMessages,
      handleFetchMembers,
      handleLeftSideDrawerToggleEvent
    } = this.props;

    handleChangeChatRoom(chatRoomData, userData._id, activeChatRoom._id);
    handleLeftSideDrawerToggleEvent(event);
  }
  render() {
    const {
      chatRoomData,
      isActive
    } = this.props;

    return (
      <div
        className={"chat-room " + (isActive ? 'active' : '')}
        onClick={::this.handleChangeChatRoom}
        title={chatRoomData.name}
      >
        <div className="chat-room-icon" style={{backgroundImage: `url(${chatRoomData.chatIcon})`}}>
          {::this.handleAccountTypeBadgeLogo()}
        </div>
        <div className="chat-room-name">
          {chatRoomData.name}
          {
            chatRoomData.chatType === 'private' &&
            <span className="you-label">(you)</span>
          }
        </div>
      </div>
    )
  }
}

ChatRoom.propTypes = {
  index: PropTypes.number.isRequired,
  userData: PropTypes.object.isRequired,
  chatRoomData: PropTypes.object.isRequired,
  activeChatRoom: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  handleChangeChatRoom: PropTypes.func.isRequired,
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired
}

ChatRoom.defaultProps = {
  isActive: false
}

export default ChatRoom;
