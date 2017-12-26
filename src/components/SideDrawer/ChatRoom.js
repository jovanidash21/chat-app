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
      handleSideDrawerToggle
    } = this.props;

    const data = {
      userID: userData._id,
      chatRoomID: chatRoomData._id
    };

    handleSocketJoinChatRoom(chatRoomData._id);
    handleSocketLeaveChatRoom(activeChatRoomData._id);
    handleChangeChatRoom(chatRoomData);
    handleFetchMessages(data);
    handleSideDrawerToggle();
  }
  render() {
    const { chatRoomData } = this.props;

    return (
      <div className="chat-room" onClick={::this.handleChangeChatRoom}>
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
  handleSocketJoinChatRoom: PropTypes.func.isRequired,
  handleSocketLeaveChatRoom: PropTypes.func.isRequired,
  handleChangeChatRoom: PropTypes.func.isRequired,
  handleFetchMessages: PropTypes.func.isRequired,
  handleSideDrawerToggle: PropTypes.func.isRequired
}

export default ChatRoom;
