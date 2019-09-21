import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Appbar } from 'muicss/react/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import { isObjectEmpty } from '../../../../utils/object';
import { isDirectChatRoomMemberOnline } from '../../../../utils/member';
import { MuteUnmuteChatRoomModal } from '../../Partial';
import {
  NewMessagesDropdown,
  ChatRoomDropdown,
} from '../../../components/Header';
import { Skeleton } from '../../../../components/Skeleton';
import { UserDropdown } from '../../../../components/UserDropdown';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      muteUnmuteModalOpen: false,
      editProfileModalOpen: false,
      blockedUsersListModalOpen: false,
    }
  }
  handleLeftSideDrawerToggleEvent(event) {
    event.preventDefault();

    const { handleLeftSideDrawerToggleEvent } = this.props;

    handleLeftSideDrawerToggleEvent(true);
  }
  handleOpenMuteUnmuteModal() {
    this.setState({muteUnmuteModalOpen: true});
  }
  handleCloseMuteUnmuteModal() {
    this.setState({muteUnmuteModalOpen: false});
  }
  handleOpenEditProfileModal() {
    this.setState({editProfileModalOpen: true});
  }
  handleCloseEditProfileModal() {
    this.setState({editProfileModalOpen: false});
  }
  handleOpenBlockedUsersListModal() {
    this.setState({blockedUsersListModalOpen: true});
  }
  handleCloseBlockedUsersListModal() {
    this.setState({blockedUsersListModalOpen: false});
  }
  handleVideoCamRender() {
    const {
      user,
      chatRoom
    } = this.props;
    const activeUser = user.active;
    const activeChatRoom = chatRoom.active;

    if (
      !isObjectEmpty(activeChatRoom.data) &&
      activeChatRoom.data.chatType === 'direct' &&
      !chatRoom.fetch.loading &&
      chatRoom.fetch.success &&
      isDirectChatRoomMemberOnline(activeChatRoom.data.members, activeUser._id)
    ) {
      return (
        <div className="header-item-icon video-cam-icon" onClick={::this.handleRequestVideoCall}>
          <FontAwesomeIcon icon="video" />
        </div>
      )
    }
  }
  handleNewMessagesDropdownRender() {
    const {
      user,
      chatRoom,
      changeChatRoom,
      handleOpenPopUpChatRoom,
      children,
    } = this.props;
    const newMessagesChatRooms = chatRoom.all.filter((singleChatRoom) =>
      singleChatRoom.data.chatType !== 'public' &&
      singleChatRoom.data.chatType !== 'private' &&
      !singleChatRoom.mute.data &&
      singleChatRoom.unReadMessages > 0
    ).sort((a, b) => {
      a.data.name = a.data.name || '';
      b.data.name = b.data.name || '';

      const date = new Date(b.data.latestMessageDate) - new Date(a.data.latestMessageDate);
      const name = a.data.name.toLowerCase().localeCompare(b.data.name.toLowerCase());
      const priority = a.priority - b.priority;

      if (date !== 0) {
        return date;
      } else if (name !== 0) {
        return name;
      } else {
        return priority;
      }
    });

    if ( !chatRoom.fetch.loading && chatRoom.fetch.success ) {
      return (
        <NewMessagesDropdown
          user={user.active}
          chatRooms={newMessagesChatRooms}
          activeChatRoom={chatRoom.active}
          handleOpenPopUpChatRoom={handleOpenPopUpChatRoom}
          handleChangeChatRoom={changeChatRoom}
          handleClearChatRoomUnreadMessages={::this.handleClearChatRoomUnreadMessages}
        />
      )
    }
  }
  handleChatRoomDropdownRender() {
    const { chatRoom } = this.props;
    const activeChatRoom = chatRoom.active;

    if (
      !isObjectEmpty(activeChatRoom.data) &&
      !chatRoom.fetch.loading &&
      chatRoom.fetch.success
    ) {
      return (
        <ChatRoomDropdown
          activeChatRoom={activeChatRoom}
          handleOpenMuteUnmuteModal={::this.handleOpenMuteUnmuteModal}
        />
      )
    }
  }
  handleEditProfile(username, name, email, profilePicture) {
    const {
      user,
      editActiveUser,
    } = this.props;
    const activeUser = user.active;

    if (activeUser.accountType === 'local') {
      editActiveUser(activeUser._id, username, name, email, profilePicture);
    }
  }
  handleFetchBlockedUsers() {
    const {
      user,
      fetchBlockedUsers,
    } = this.props;
    const activeUser = user.active;

    fetchBlockedUsers(activeUser._id);
  }
  handleUnblockAllUsers() {
    const {
      user,
      unblockAllUsers,
    } = this.props;
    const activeUser = user.active;

    unblockAllUsers(activeUser._id);
  }
  handleBlockUnblockUser(selectedUser) {
    const {
      user,
      blockUser,
      unblockUser,
    } = this.props;
    const activeUser = user.active;
    const isBlocked = selectedUser.blocked;

    if (!isBlocked) {
      blockUser( activeUser._id, selectedUser._id );
    } else {
      unblockUser( activeUser._id, selectedUser._id );
    }
  }
  handleRequestVideoCall(event) {
    event.preventDefault();

    const {
      chatRoom,
      handleRequestVideoCall,
    } = this.props;

    if (chatRoom.active.data.chatType === 'direct') {
      handleRequestVideoCall(chatRoom.active);
    }
  }
  handleClearChatRoomUnreadMessages(chatRoomIDs) {
    const {
      user,
      clearChatRoomUnreadMessages,
    } = this.props;

    clearChatRoomUnreadMessages(user.active._id, chatRoomIDs);
  }
  render() {
    const {
      user,
      chatRoom,
      blockedUser,
      upload,
      uploadImage,
      children,
    } = this.props;
    const {
      muteUnmuteModalOpen,
      editProfileModalOpen,
      blockedUsersListModalOpen,
    } = this.state;
    const activeUser = user.active;
    const activeUserEmpty = isObjectEmpty( activeUser );
    const loading = user.fetchActive.loading || chatRoom.fetch.loading;

    return (
      <Appbar className="header">
        <div
          className="hamburger-icon"
          onClick={::this.handleLeftSideDrawerToggleEvent}
        >
          <FontAwesomeIcon icon="bars" size="2x" />
        </div>
        <div className="content">
          {children}
        </div>
        {::this.handleVideoCamRender()}
        {::this.handleNewMessagesDropdownRender()}
        {::this.handleChatRoomDropdownRender()}
        {
          loading &&
          <div className="user-dropdown">
            <div className="dropdown-toggle">
              <Skeleton
                className="avatar"
                height="32px"
                width="32px"
                circle
              />
              <div className="arrow-down-icon">
                <FontAwesomeIcon icon="caret-down" />
              </div>
            </div>
          </div>
        }
        {
          ! loading &&
          ! activeUserEmpty &&
          <UserDropdown
            user={activeUser}
            handleOpenEditProfileModal={::this.handleOpenEditProfileModal}
            handleOpenBlockedUsersListModal={::this.handleOpenBlockedUsersListModal}
          >
            {
              editProfileModalOpen &&
              <UserDropdown.EditProfileModal
                user={activeUser}
                upload={upload}
                handleImageUpload={uploadImage}
                handleEditProfile={::this.handleEditProfile}
                userEdit={user.editActive}
                open={editProfileModalOpen}
                onClose={::this.handleCloseEditProfileModal}
              />
            }
            {
              blockedUsersListModalOpen &&
              <UserDropdown.BlockedUsersListModal
                handleFetchBlockedUsers={::this.handleFetchBlockedUsers}
                blockedUsers={blockedUser.all}
                blockedUserFetch={blockedUser.fetch}
                handleUnblockAllUsers={::this.handleUnblockAllUsers}
                blockedUserUnblockAll={blockedUser.unblockAll}
                handleBlockUnblockUser={::this.handleBlockUnblockUser}
                blockedUserBlock={blockedUser.block}
                blockedUserUnblock={blockedUser.unblock}
                open={blockedUsersListModalOpen}
                onClose={::this.handleCloseBlockedUsersListModal}
              />
            }
          </UserDropdown>
        }
        {
          muteUnmuteModalOpen &&
          <MuteUnmuteChatRoomModal
            open={muteUnmuteModalOpen}
            onClose={::this.handleCloseMuteUnmuteModal}
          />
        }
      </Appbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom,
    blockedUser: state.blockedUser,
    upload: state.upload,
  }
}

Header.propTypes = {
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired,
  handleOpenPopUpChatRoom: PropTypes.func.isRequired,
  handleRequestVideoCall: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
