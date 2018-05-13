import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import FontAwesome from 'react-fontawesome';
import {
  Appbar,
  Container
} from 'muicss/react/';
import mapDispatchToProps from '../../actions';
import LoadingAnimation from '../../components/LoadingAnimation';
import OptionsDropdown from '../../components/Header/OptionsDropdown';
import '../../styles/Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  handleComponent() {
    const {
      chatRoom,
      activeChatRoom,
      handleLeftSideDrawerToggleEvent,
      handleRightSideDrawerToggleEvent
    } = this.props;

    if (!chatRoom.isLoading && chatRoom.isFetchChatRoomsSuccess) {
      const activeChatRoomData = activeChatRoom.chatRoomData;

      return (
        <div className="side-bar-toggler">
          <MediaQuery query="(max-width: 767px)">
            <FontAwesome
              className="hamburger-icon"
              name="bars"
              size="2x"
              onClick={handleLeftSideDrawerToggleEvent}
            />
          </MediaQuery>
          <h2
            className="chat-room-name"
            title={activeChatRoomData.name}
          >
            {activeChatRoomData.name}
          </h2>
          <div
            className="members-count"
            onClick={handleRightSideDrawerToggleEvent}
          >
            <FontAwesome
              className="user-icon"
              name="user"
            />
            {activeChatRoomData.members.length}
          </div>
        </div>
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="white" />
      )
    }
  }
  render() {
    const {
      user,
      logout
    } = this.props;

    return (
      <Appbar className="header">
        <table width="100%">
          <tbody>
            <tr style={{verticalAlign: 'middle'}}>
              <td className="mui--appbar-height">
                {::this.handleComponent()}
              </td>
              <td className="mui--appbar-height mui--text-right">
                <OptionsDropdown
                  userData={user.userData}
                  handleLogout={logout}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Appbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom,
    activeChatRoom: state.activeChatRoom
  }
}

Header.propTypes = {
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired,
  handleRightSideDrawerToggleEvent: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
