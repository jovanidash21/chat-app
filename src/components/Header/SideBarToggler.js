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
        <h1>Chat App</h1>
      </div>
    ) 
  }
}


export default SideBarToggler;