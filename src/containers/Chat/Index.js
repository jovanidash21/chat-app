import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  logout
} from "../../actions";
import {
  LogoutButton
} from '../../components';

class Chat extends Component {
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
      <div className="mui--text-center">
        <h1>Welcome to Chat App</h1>
        <LogoutButton handleLogout={handleLogout} />
      </div>
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
)(Chat);
