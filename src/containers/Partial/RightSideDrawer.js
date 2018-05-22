import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import FontAwesome from 'react-fontawesome';
import mapDispatchToProps from '../../actions';
import LoadingAnimation from '../../components/LoadingAnimation';
import ChatRoomMember from '../../components/RightSideDrawer/ChatRoomMember';
import '../../styles/RightSideDrawer.scss';

class RightSideDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }
  }
  handleComponent() {
    const {
      user,
      chatRoom,
      activeChatRoom,
    } = this.props;

    if (!chatRoom.isLoading && chatRoom.isFetchChatRoomsSuccess) {
      const activeChatRoomData = activeChatRoom.chatRoomData;

      return (
        <div className="right-side-drawer">
          <div className="members-count">
            <FontAwesome
              className="user-icon"
              name="user"
              size="2x"
            />
            <h3>
              {activeChatRoomData.members.length}&nbsp;
              {activeChatRoomData.members.length > 1 ? 'Members' : 'Member'}
            </h3>
          </div>
          <div className="member-list">
            {
              activeChatRoomData.members.length > 0 &&
              activeChatRoomData.members.sort((a, b) =>
                a.name.toLowerCase().localeCompare(b.name.toLowerCase())
              ).map((chatRoomMember, i) =>
                <ChatRoomMember
                  key={i}
                  userData={user.userData}
                  chatRoomMember={chatRoomMember}
                  handleAddDirectChatRoom={::this.handleAddDirectChatRoom}
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
  handleAddDirectChatRoom(event, memberID) {
    const {
      user,
      chatRoom,
      createDirectChatRoom,
      socketJoinChatRoom,
      changeChatRoom,
      fetchMessages,
      handleRightSideDrawerToggleEvent
    } = this.props;
    const userID = user.userData._id;
    const chatRooms = chatRoom.chatRooms;
    var directChatRoomExists = false;
    var directChatRoomData = {};


    for ( var i = 0; i < chatRooms.length; i++ ) {
      if ( chatRooms[i].chatType === 'direct' ) {
        var isMembersMatch = chatRooms[i].members.some(member => member._id === memberID);

        if ( isMembersMatch ) {
          directChatRoomExists = true;
          directChatRoomData = chatRooms[i];
          break;
        } else {
          continue;
        }
      } else {
        continue;
      }
    }

    if ( ! directChatRoomExists ) {
      let data = {
        name: '',
        members: [userID, memberID],
        chatType: 'direct',
        userID: userID
      };

      createDirectChatRoom(data);
      handleRightSideDrawerToggleEvent(event);
    } else {
      let data = {
        userID: userID,
        chatRoomID: directChatRoomData._id
      };

      socketJoinChatRoom(directChatRoomData._id);
      changeChatRoom(directChatRoomData);
      fetchMessages(data);
      handleRightSideDrawerToggleEvent(event);
    }
  }
  render() {
    const {
      isRightSideDrawerOpen,
      handleRightSideDrawerToggleState,
      noOverlay
    } = this.props;
    const { showModal } = this.state;

    return (
      <Menu
        overlayClassName="right-side-drawer-overlay"
        width="250px"
        isOpen={isRightSideDrawerOpen}
        onStateChange={handleRightSideDrawerToggleState}
        noOverlay={noOverlay}
        right
      >
        <div>
          {::this.handleComponent()}
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

RightSideDrawer.propTypes = {
  handleRightSideDrawerToggleEvent: PropTypes.func.isRequired,
  handleRightSideDrawerToggleState: PropTypes.func.isRequired,
  isRightSideDrawerOpen: PropTypes.bool,
  noOverlay: PropTypes.bool
}

RightSideDrawer.defaultProps = {
  isRightSideDrawerOpen: false,
  noOverlay: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSideDrawer);
