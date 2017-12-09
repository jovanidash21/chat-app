import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import '../../styles/Header.scss';

class SideBarToggler extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="side-bar-toggler">
        <FontAwesome className="icon" name="bars" size="2x" />
        <h2 className="chat-room-name">Chat Room Name</h2>
      </div>
    )
  }
}

export default SideBarToggler;
