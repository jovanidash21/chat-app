import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      handleSocketJoinChatRoom,
      handleChangeChatRoom,
      handleFetchMessages
    } = this.props;

    if (index === 0) {
      const data = {
        userID: userData._id,
        chatRoomID: chatRoomData._id
      };

      handleSocketJoinChatRoom(chatRoomData._id);
      handleChangeChatRoom(chatRoomData);
      handleFetchMessages(data);
    }
  }
  handleChangeChatRoom(event) {
    event.preventDefault();

    const {
      userData,
      chatRoomData,
      activeChatRoomData,
      handleSocketJoinChatRoom,
      handleSocketLeaveChatRoom,
      handleChangeChatRoom,
      handleFetchMessages,
      handleSideDrawerToggleEvent
    } = this.props;

    const data = {
      userID: userData._id,
      chatRoomID: chatRoomData._id
    };

    handleSocketJoinChatRoom(chatRoomData._id);
    handleSocketLeaveChatRoom(activeChatRoomData._id);
    handleChangeChatRoom(chatRoomData);
    handleFetchMessages(data);
    handleSideDrawerToggleEvent(event);
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
        <div className="chat-room-icon" style={{backgroundImage: `url(${chatRoomData.chatIcon})`}}></div>
        <div className="chat-room-name">
          {chatRoomData.name}
        </div>
      </div>
    )
  }
}

ChatRoom.propTypes = {
  index: PropTypes.number.isRequired,
  userData: PropTypes.object.isRequired,
  chatRoomData: PropTypes.object.isRequired,
  activeChatRoomData: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  handleSocketJoinChatRoom: PropTypes.func.isRequired,
  handleSocketLeaveChatRoom: PropTypes.func.isRequired,
  handleChangeChatRoom: PropTypes.func.isRequired,
  handleFetchMessages: PropTypes.func.isRequired,
  handleSideDrawerToggleEvent: PropTypes.func.isRequired
}

ChatRoom.defaultProps = {
  isActive: false
}

export default ChatRoom;
