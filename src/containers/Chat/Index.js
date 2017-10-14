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
import { getUserData } from '../../actions/user';
import {
  isTyping,
  isNotTyping
} from '../../actions/typer';

const socket = io('');

class Chat extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    socket.on('typing broadcast', username =>
      this.props.dispatch(isTyping(username))
    );
    socket.on('not typing broadcast', username =>
      this.props.dispatch(isNotTyping(username))
    );
  }
  render() {
    const { userData } = this.props.user;

    return (
      <div>
        <Head title="Chat App" />
        <Header />
        <Container fluid={true}>
          <div className="chat">
            <ChatBox />
            <ChatInput
              userData={userData}
              socket={socket}
            />
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {  
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps
)(Chat);
