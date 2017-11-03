import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Appbar,
  Container
} from 'muicss/react/';
import { logout } from '../../actions/auth';
import { 
  SideBarToggler,
  OptionsDropdown 
} from '../../components';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { 
      user,
      logout
    } = this.props;

    return (
      <Appbar className="header">
        <Container>
          <table width="100%">
            <tbody>
              <tr style={{verticalAlign: 'middle'}}>
                <td className="mui--appbar-height">
                  <SideBarToggler />
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
        </Container>
      </Appbar>
    )
  }
}

const mapStateToProps = (state) => {  
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
