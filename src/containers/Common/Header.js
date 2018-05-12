import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {
  Appbar,
  Container
} from 'muicss/react/';
import mapDispatchToProps from '../../actions';
import OptionsDropdown from '../../components/Header/OptionsDropdown';
import '../../styles/Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      user,
      activeChatRoom,
      logout,
      handleLeftSideDrawerToggleEvent
    } = this.props;
    const activeChatRoomData = activeChatRoom.chatRoomData;

    return (
      <Appbar className="header">
        <table width="100%">
          <tbody>
            <tr style={{verticalAlign: 'middle'}}>
              <td className="mui--appbar-height">
                <div className="side-bar-toggler">
                  <FontAwesome
                    className="icon"
                    name="bars"
                    size="2x"
                    onClick={handleLeftSideDrawerToggleEvent}
                  />
                  <h2
                    className="chat-room-name"
                    title={activeChatRoomData.name}
                  >
                    {activeChatRoomData.name}
                  </h2>
                </div>
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
    activeChatRoom: state.activeChatRoom
  }
}

Header.propTypes = {
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
