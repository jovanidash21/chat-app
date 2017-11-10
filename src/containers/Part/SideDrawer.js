import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {
  fetchChatRooms,
  createChatRoom
} from '../../actions/chat-room';
import LoadingAnimation from '../../components/LoadingAnimation';
import ChatRoom from '../../components/SideDrawer/ChatRoom';
import CreateChatRoomModal from '../../components/SideDrawer/CreateChatRoomModal';
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
    const { chatRoom } = this.props;

    if (!chatRoom.isLoading && chatRoom.isFetchChatRoomsSuccess) {
      return (
        <div>
          <div className="chat-rooms-options">
            <h3>Chat Rooms</h3>
            <div className="add-chat-room-icon" onClick={::this.handleActivateModal}>
              <FontAwesome name="plus" />
            </div>
          </div>

          <div className="chat-room-list">
            {
              chatRoom.chatRooms.map((chatRoomData, i) =>
                <ChatRoom
                  key={i}
                  chatRoomData={chatRoomData}
                />
              )
            }
          </div>
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
      createChatRoom
    } = this.props;
    const { showModal } = this.state;

    return (
      <div>
        <div className="side-drawer">
          <h1 className="title">Chat App</h1>
          {::this.handleComponent()}
        </div>
        {
          showModal &&
          <CreateChatRoomModal
            handleDeactivateModal={::this.handleDeactivateModal}
            handleAddChatRoom={createChatRoom}
            userData={user.userData}
            isLoading={chatRoom.isLoading}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchChatRooms,
    createChatRoom
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideDrawer);
