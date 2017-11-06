import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
require('../../styles/Header.scss');

class SideBarToggler extends Component {
  constructor(props) {
    super(props);
  }
  handleLogout(event) {
    event.preventDefault();

    const { handleLogout } = this.props;

    handleLogout();
  }
  render() {
    const { userData } = this.props;

    return (
      <div className="mui-dropdown side-bar-toggler">
        <FontAwesome className="icon" name="bars" size="2x" />
        <h2 className="chat-room-name">Chat Room Name</h2>
      </div>
    ) 
  }
}

export default SideBarToggler;