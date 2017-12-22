import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Appbar,
  Container
} from 'muicss/react/';
import { logout } from '../../actions/auth';
import SideBarToggler from '../../components/Header/SideBarToggler';
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
      handleSideDrawerToggle
    } = this.props;

    return (
      <Appbar className="header">
        <table width="100%">
          <tbody>
            <tr style={{verticalAlign: 'middle'}}>
              <td className="mui--appbar-height">
                <SideBarToggler
                  activeChatRoomData={activeChatRoom.chatRoomData}
                  handleSideDrawerToggle={handleSideDrawerToggle}
                />
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout
  }, dispatch);
}

Header.propTypes = {
  handleSideDrawerToggle: PropTypes.func
}

Header.defaultProps = {
  handleSideDrawerToggle: () => {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
