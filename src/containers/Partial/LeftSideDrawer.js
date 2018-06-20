import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import FontAwesome from 'react-fontawesome';
import mapDispatchToProps from '../../actions';
import LoadingAnimation from '../../components/LoadingAnimation';
import ChatRoom from '../../components/LeftSideDrawer/ChatRoom';
import CreateChatRoomModal from './CreateChatRoomModal';
import '../../styles/LeftSideDrawer.scss';

class LeftSideDrawer extends Component {
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

    fetchChatRooms(user.active._id);
  }
  handleChatRoomsListRender() {
    const {
      user,
      chatRoom,
      changeChatRoom,
      handleLeftSideDrawerToggleEvent
    } = this.props;

    if ( !chatRoom.isLoading && !chatRoom.isFetchingChatRooms ) {
      const activeChatRoom = chatRoom.active;

      return (
        <div className="chat-room-list">
          {
            chatRoom.all.sort((a, b) =>  {
              var n = a.priority - b.priority;

              if (n !== 0) {
                return n;
              }

              return a.data.name.toLowerCase().localeCompare(b.data.name.toLowerCase());
            }).map((singleChatRoom, i) =>
              <ChatRoom
                key={i}
                index={i}
                user={user.active}
                chatRoom={singleChatRoom}
                activeChatRoom={activeChatRoom}
                isActive={(activeChatRoom.data._id === singleChatRoom.data._id) ? true : false}
                handleChangeChatRoom={changeChatRoom}
                handleLeftSideDrawerToggleEvent={handleLeftSideDrawerToggleEvent}
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
      isLeftSideDrawerOpen,
      handleLeftSideDrawerToggleEvent,
      handleLeftSideDrawerToggleState,
      noOverlay
    } = this.props;
    const { showModal } = this.state;

    return (
      <Menu
        overlayClassName={"left-side-drawer-overlay"}
        width="250px"
        isOpen={isLeftSideDrawerOpen}
        onStateChange={handleLeftSideDrawerToggleState}
        noOverlay={noOverlay}
      >
        <div>
          <div className="left-side-drawer">
            <h1 className="title">Chat App</h1>
            <div className="chat-rooms-options">
              <h3>Chat Rooms</h3>
              <div className="add-chat-room-icon"
                onClick={::this.handleActivateModal}
                title="Add Chat Room"
              >
                <FontAwesome name="plus-circle" />
              </div>
            </div>
            {::this.handleChatRoomsListRender()}
          </div>
          {
            showModal &&
            <CreateChatRoomModal
              handleDeactivateModal={::this.handleDeactivateModal}
              handleLeftSideDrawerToggleEvent={handleLeftSideDrawerToggleEvent}
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
    chatRoom: state.chatRoom
  }
}

LeftSideDrawer.propTypes = {
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired,
  handleLeftSideDrawerToggleState: PropTypes.func.isRequired,
  isLeftSideDrawerOpen: PropTypes.bool,
  noOverlay: PropTypes.bool
}

LeftSideDrawer.defaultProps = {
  isLeftSideDrawerOpen: false,
  noOverlay: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSideDrawer);
