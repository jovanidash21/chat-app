import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Appbar } from 'muicss/react/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import { isObjectEmpty } from '../../../../utils/object';
import { MuteUnmuteChatRoomModal } from '../../Partial';
import {
  NewMessagesDropdown,
  ChatRoomDropdown
} from '../../../components/Header';
import { UserDropdown } from '../../../../components/UserDropdown';
import './styles.scss';

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
  handleNewMessagesDropdownRender() {
    const {
      user,
      chatRoom,
      changeChatRoom,
      clearChatRoomUnreadMessages,
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
        return name
      } else {
        return priority;
      }
    });

    if ( !chatRoom.fetch.loading && chatRoom.fetch.success ) {
      return (
        <NewMessagesDropdown
          user={user.active}
          count={newMessagesChatRooms.length}
          handleClearChatRoomUnreadMessages={clearChatRoomUnreadMessages}
        >
          {
            newMessagesChatRooms.length > 0 &&
            newMessagesChatRooms.map((singleChatRoom, i) =>
              <NewMessagesDropdown.ChatRoom
                key={i}
                user={user.active}
                chatRoom={singleChatRoom}
                activeChatRoom={chatRoom.active}
                handleChangeChatRoom={changeChatRoom}
                handleClearChatRoomUnreadMessages={clearChatRoomUnreadMessages}
              />
            )
          }
        </NewMessagesDropdown>
      )
    }
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
        <table width="100%">
          <tbody>
            <tr style={{verticalAlign: 'middle'}}>
              <td className="mui--appbar-height">
                <div className="left-part-header">
                  <div
                    className="hamburger-icon"
                    onClick={::this.handleLeftSideDrawerToggleEvent}
                  >
                    <FontAwesomeIcon icon="bars" size="2x" />
                  </div>
                  {children}
                </div>
              </td>
              <td className="mui--appbar-height mui--text-right">
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
              </td>
            </tr>
          </tbody>
        </table>
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
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
