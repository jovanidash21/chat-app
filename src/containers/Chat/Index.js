import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  logout
} from "../../actions";
import Header from '../Header';

class Chat extends Component {
  render() {
    return (
      <div>
        <Header/>
      </div>
    )
  }
}

export default connect()(Chat);
