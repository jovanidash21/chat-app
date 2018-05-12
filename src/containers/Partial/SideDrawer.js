import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import FontAwesome from 'react-fontawesome';
import mapDispatchToProps from '../../actions';
import LoadingAnimation from '../../components/LoadingAnimation';
import ChatRoom from '../../components/SideDrawer/ChatRoom';
import CreateChatRoomModal from './CreateChatRoomModal';
import '../../styles/SideDrawer.scss';

class SideDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }
  }
  componentWillMount() {
    const {
      user,
      fetchChatRooms
    } = this.props;

    fetchChatRooms(user.userData._id);
  }
  handleComponent() {
    const {
      user,
      chatRoom,
      activeChatRoom,
      socketJoinChatRoom,
      socketLeaveChatRoom,
      changeChatRoom,
      fetchMessages,
      handleSideDrawerToggleEvent
    } = this.props;

    if (!chatRoom.isLoading && chatRoom.isFetchChatRoomsSuccess) {
      const activeChatRoomData = activeChatRoom.chatRoomData;

      return (
        <div className="chat-room-list">
          {
            chatRoom.chatRooms.map((chatRoomData, i) =>
              <ChatRoom
                key={i}
                index={i}
                userData={user.userData}
                chatRoomData={chatRoomData}
                activeChatRoomData={activeChatRoomData}
                isActive={(activeChatRoomData._id === chatRoomData._id) ? true : false}
                handleSocketJoinChatRoom={socketJoinChatRoom}
                handleSocketLeaveChatRoom={socketLeaveChatRoom}
                handleChangeChatRoom={changeChatRoom}
                handleFetchMessages={fetchMessages}
                handleSideDrawerToggleEvent={handleSideDrawerToggleEvent}
              />
            )
          }
        </div>
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="white" />
      )
    }
  }
  handleActivateModal() {
    this.setState({showModal: true});
  }
  handleDeactivateModal() {
    this.setState({showModal: false});
  }
  render() {
    const {
      user,
      chatRoom,
      fetchChatRooms,
      createChatRoom,
      isOpen,
      handleSideDrawerToggleState,
      noOverlay
    } = this.props;
    const { showModal } = this.state;

    return (
      <Menu
        width="250px"
        isOpen={isOpen}
        onStateChange={handleSideDrawerToggleState}
        noOverlay={noOverlay}
      >
        <div>
          <div className="side-drawer">
            <h1 className="title">Chat App</h1>
            <div className="chat-rooms-options">
              <h3>Chat Rooms</h3>
              <div className="add-chat-room-icon" onClick={::this.handleActivateModal}>
                <FontAwesome name="plus-circle" />
              </div>
            </div>
            {::this.handleComponent()}
          </div>
          {
            showModal &&
            <CreateChatRoomModal
              handleDeactivateModal={::this.handleDeactivateModal}
              isLoading={chatRoom.isLoading}
            />
          }
        </div>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom,
    activeChatRoom: state.activeChatRoom
  }
}

SideDrawer.propTypes = {
  handleSideDrawerToggleEvent: PropTypes.func.isRequired,
  handleSideDrawerToggleState: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  noOverlay: PropTypes.bool
}

SideDrawer.defaultProps = {
  isOpen: false,
  noOverlay: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideDrawer);
