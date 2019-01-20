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
  ChatRoomDropdown
} from '../../../components/Header';
import { UserDropdown } from '../../../../components/UserDropdown';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    }
  }
  handleLeftSideDrawerToggleEvent(event) {
    event.preventDefault();

    const { handleLeftSideDrawerToggleEvent } = this.props;

    handleLeftSideDrawerToggleEvent(true);
  }
  handleOpenModal() {
    this.setState({isModalOpen: true});
  }
  handleCloseModal() {
    this.setState({isModalOpen: false});
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
      children
    } = this.props;
    const newMessagesChatRooms = chatRoom.all.filter((singleChatRoom) =>
      singleChatRoom.data.chatType !== 'public' &&
      singleChatRoom.data.chatType !== 'private' &&
      !singleChatRoom.mute.data &&
      singleChatRoom.unReadMessages > 0
    ).sort((a, b) => {
      var date = new Date(b.data.latestMessageDate) - new Date(a.data.latestMessageDate);
      var name = a.data.name.toLowerCase().localeCompare(b.data.name.toLowerCase());
      var priority = a.priority - b.priority;

      if ( date !== 0 ) {
        return date;
      } else if ( name !== 0 ) {
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
  handleRequestVideoCall(event) {
    event.preventDefault();

    const {
      chatRoom,
      handleRequestVideoCall
    } = this.props;

    if ( chatRoom.active.data.chatType === 'direct' ) {
      handleRequestVideoCall(chatRoom.active);
    }
  }
  handleClearChatRoomUnreadMessages(chatRoomIDs) {
    const {
      user,
      clearChatRoomUnreadMessages
    } = this.props;

    clearChatRoomUnreadMessages(user.active._id, chatRoomIDs);
  }
  render() {
    const {
      user,
      chatRoom,
      children
    } = this.props;
    const { isModalOpen } = this.state;

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
        {
          !chatRoom.fetch.loading &&
          chatRoom.fetch.success &&
          !isObjectEmpty(chatRoom.active.data) &&
          <ChatRoomDropdown
            activeChatRoom={chatRoom.active}
            handleOpenMuteUnmuteModal={::this.handleOpenModal}
          />
        }
        <UserDropdown user={user.active} />
        {
          isModalOpen &&
          <MuteUnmuteChatRoomModal
            isModalOpen={isModalOpen}
            handleCloseModal={::this.handleCloseModal}
          />
        }
      </Appbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom
  }
}

Header.propTypes = {
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired,
  handleOpenPopUpChatRoom: PropTypes.func.isRequired,
  handleRequestVideoCall: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
