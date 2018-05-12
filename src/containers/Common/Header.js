import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {
  Appbar,
  Container
} from 'muicss/react/';
import mapDispatchToProps from '../../actions';
import ActiveChatRoomMember from '../../components/Header/ActiveChatRoomMember';
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
      handleSideDrawerToggleEvent
    } = this.props;
    const activeChatRoomData = activeChatRoom.chatRoomData;

    return (
      <Appbar className="header">
        <table width="100%">
          <tbody>
            <tr style={{verticalAlign: 'middle'}}>
              <td className="mui--appbar-height">
                <div className="side-bar-toggler" onClick={handleSideDrawerToggleEvent}>
                  <FontAwesome className="icon" name="bars" size="2x" />
                  <h2
                    className="chat-room-name"
                    data-mui-toggle="dropdown"
                    title={activeChatRoomData.name}
                  >
                    {activeChatRoomData.name}
                  </h2>
                  <ul className="mui-dropdown__menu">
                    {
                      activeChatRoomData.members &&
                      activeChatRoomData.members.map((chatRoomMember, i) =>
                        <ActiveChatRoomMember
                          key={i}
                          chatRoomMember={chatRoomMember}
                        />
                      )
                    }
                  </ul>
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
  handleSideDrawerToggleEvent: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
