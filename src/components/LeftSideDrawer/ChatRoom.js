import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import './styles.scss';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const {
      index,
      user,
      chatRoom,
      handleChangeChatRoom,
    } = this.props;

    if (index === 0) {
      handleChangeChatRoom(chatRoom, user._id, '');
    }
  }
  handleAccountType() {
    const {
      user,
      chatRoom
    } = this.props;
    var accountType = '';

    switch ( chatRoom.chatType ) {
      case 'private':
        accountType = user.accountType;
        break;
      case 'direct':
        for ( var i = 0; i < chatRoom.members.length; i++ ) {
          var member = chatRoom.members[i];

          if ( member._id != user._id ) {
            accountType = member.accountType;
            break;
          } else {
            continue;
          }
        }
        break;
      default:
        break;
    }

    return accountType;
  }
  handleChangeChatRoom(event) {
    event.preventDefault();

    const {
      user,
      chatRoom,
      activeChatRoom,
      handleChangeChatRoom,
      handleLeftSideDrawerToggleEvent
    } = this.props;

    handleChangeChatRoom(chatRoom, user._id, activeChatRoom._id);
    handleLeftSideDrawerToggleEvent(event);
  }
  render() {
    const {
      chatRoom,
      isActive
    } = this.props;

    return (
      <div
        className={"chat-room " + (isActive ? 'active' : '')}
        onClick={::this.handleChangeChatRoom}
        title={chatRoom.name}
      >
        <Avatar
          image={chatRoom.chatIcon}
          accountType={::this.handleAccountType()}
        />
        <div className="chat-room-name">
          {chatRoom.name}
          {
            chatRoom.chatType === 'private' &&
            <span className="you-label">(you)</span>
          }
        </div>
      </div>
    )
  }
}

ChatRoom.propTypes = {
  index: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  chatRoom: PropTypes.object.isRequired,
  activeChatRoom: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  handleChangeChatRoom: PropTypes.func.isRequired,
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired
}

ChatRoom.defaultProps = {
  isActive: false
}

export default ChatRoom;
