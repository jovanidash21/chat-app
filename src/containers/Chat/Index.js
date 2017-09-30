import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  logout
} from "../../actions";
import Container from 'muicss/lib/react/container';
import Header from '../Header';
import {
  ChatBox
} from '../../components';


class Chat extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container fluid={true}>
          <ChatBox />
        </Container>
      </div>
    )
  }
}

export default connect()(Chat);
