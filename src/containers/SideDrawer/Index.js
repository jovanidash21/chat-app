import React, { Component } from 'react';
import { connect } from 'react-redux';
require('../../styles/SideDrawer.scss');

class SideDrawer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="side-drawer">
        <h1 className="title">Chat App</h1>
      </div>
    );
  }
}

export default connect()(SideDrawer);