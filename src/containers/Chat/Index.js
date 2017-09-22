import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chat extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1 className="mui--text-center">Welcome to Chat App</h1>
      </div>
    )
  }
}

export default connect()(Chat);
