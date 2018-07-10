import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  componentDidUpdate(prevProps) {
    if ( prevProps.chatRoom.isFetching && !this.props.chatRoom.isFetching ) {
      const {
        user,
        chatRoom,
        changeChatRoom
      } = this.props;
      const allChatRooms = chatRoom.all.sort((a, b) => {
        var n = a.priority - b.priority;

        if (n !== 0) {
          return n;
        }

        return a.data.name.toLowerCase().localeCompare(b.data.name.toLowerCase());
      });

      changeChatRoom(allChatRooms[0], user.active._id, '');
    }
  }
  handleChatRoomsListRender() {
    const {
      user,
      chatRoom,
      changeChatRoom,
      handleLeftSideDrawerToggleEvent
    } = this.props;

    if ( !chatRoom.isFetching && chatRoom.isFetchingSuccess ) {
      const activeChatRoom = chatRoom.active;

      return (
        <div className="chat-room-list">
          {
            chatRoom.all.sort((a, b) => {
              var priority = a.priority - b.priority;
              var name = a.data.name.toLowerCase().localeCompare(b.data.name.toLowerCase());
              var date = new Date(b.data.createdAt) - new Date(a.data.createdAt);

              if (priority !== 0) {
                return priority;
              } else if ( name !== 0 ) {
                return name
              } else {
                return date;
              }
            }).map((singleChatRoom, i) =>
              <ChatRoom
                key={i}
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
                <FontAwesomeIcon icon="plus-circle" />
              </div>
            </div>
            {::this.handleChatRoomsListRender()}
          </div>
          {
            showModal &&
            <CreateChatRoomModal
              handleDeactivateModal={::this.handleDeactivateModal}
              handleLeftSideDrawerToggleEvent={handleLeftSideDrawerToggleEvent}
              isLoading={chatRoom.isCreating}
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
