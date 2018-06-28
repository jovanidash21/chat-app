import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import './styles.scss';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }
  handleAccountType() {
    const {
      user,
      chatRoom
    } = this.props;
    var accountType = '';

    switch ( chatRoom.data.chatType ) {
      case 'private':
        accountType = user.accountType;
        break;
      case 'direct':
        for ( var i = 0; i < chatRoom.data.members.length; i++ ) {
          var member = chatRoom.data.members[i];

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

    handleChangeChatRoom(chatRoom, user._id, activeChatRoom.data._id);
    handleLeftSideDrawerToggleEvent();
  }
  render() {
    const {
      chatRoom,
      isActive
    } = this.props;

    return (
      <div
        className={
          "chat-room " +
          (isActive ? 'active ' : '') +
          (chatRoom.unReadMessages > 0 ? 'new-message' : '')
        }
        onClick={::this.handleChangeChatRoom}
        title={chatRoom.data.name}
      >
        <Avatar
          image={chatRoom.data.chatIcon}
          accountType={::this.handleAccountType()}
        />
        <div className="chat-room-name">
          {chatRoom.data.name}
          {
            chatRoom.data.chatType === 'private' &&
            <span className="you-label">(you)</span>
          }
        </div>
        {
          chatRoom.unReadMessages > 0 &&
          <div
            className="new-messages-count"
            title={chatRoom.unReadMessages + " New " + (chatRoom.unReadMessages > 1 ? 'Messages' : 'Message')}
          >
            {
              chatRoom.unReadMessages <= 100
                ?
                chatRoom.unReadMessages
                :
                '100 +'
            }
          </div>
        }
      </div>
    )
  }
}

ChatRoom.propTypes = {
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
