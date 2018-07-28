import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import LoadingAnimation from '../../../components/LoadingAnimation';
import ChatRoom from '../../../components/LeftSideDrawer/ChatRoom';
import CreateChatRoomModal from '../CreateChatRoomModal';
import './styles.scss';

class ChatRoomsList extends Component {
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
        <div className="chat-rooms-list">
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
      handleLeftSideDrawerToggleEvent
    } = this.props;
    const { showModal } = this.state;

    return (
      <div style={{height: '100%'}}>
        <div className="chat-rooms-list-wrapper">
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
            showModal={showModal}
            handleDeactivateModal={::this.handleDeactivateModal}
            handleLeftSideDrawerToggleEvent={handleLeftSideDrawerToggleEvent}
            isLoading={chatRoom.isCreating}
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

ChatRoomsList.propTypes = {
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomsList);
