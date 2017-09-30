import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  logout
} from "../../actions";
import Appbar from 'muicss/lib/react/appbar';
import Container from 'muicss/lib/react/container';
import {
  OptionsDropdown
} from '../../components';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    this.props.dispatch(logout());
  }
  render() {
    const {
      handleLogout
    } = this

    return (
      <Appbar className="header">
        <Container>
          <table width="100%">
            <tbody>
              <tr style={{verticalAlign: 'middle'}}>
                <td className="mui--appbar-height">
                  <h1>Chat App</h1>
                </td>
                <td className="mui--appbar-height mui--text-right">
                  <OptionsDropdown handleLogout={handleLogout} />
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
    logout: state.logout
  }
}

export default connect(
  mapStateToProps
)(Header);
