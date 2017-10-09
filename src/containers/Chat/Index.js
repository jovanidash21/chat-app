import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Container from 'muicss/lib/react/container';
import Header from '../Header';
import {
  Head,
  ChatBox,
  ChatInput
} from '../../components';

class Chat extends Component {
  render() {
    return (
      <div>
        <Head title="Chat App" />
        <Header />
        <Container fluid={true}>
          <div className="chat">
            <ChatBox />
            <ChatInput />
          </div>
        </Container>
      </div>
    )
  }
}

export default connect()(Chat);
