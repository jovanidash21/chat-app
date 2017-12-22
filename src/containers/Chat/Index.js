import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Container } from 'muicss/react';
import io from 'socket.io-client';
import {
  isTyping,
  isNotTyping
} from '../../actions/typer';
import { receiveChatRoom } from '../../actions/chat-room';
import {
  fetchMessages,
  sendMessage
} from '../../actions/message';
import Header from '../Common/Header';
import SideDrawer from '../Partial/SideDrawer';
import Head from '../../components/Head';
import ChatBubble from '../../components/Chat/ChatBubble';
import ChatInput from '../../components/Chat/ChatInput';
import '../../styles/Chat.scss';

const socket = io('');

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  componentDidMount() {
    const {
      user,
      isTyping,
      isNotTyping,
      receiveChatRoom
    } = this.props;

    socket.emit('user logged in', user);

    socket.on('typing broadcast', profilePicture =>
      isTyping(profilePicture)
    );
    socket.on('not typing broadcast', profilePicture =>
      isNotTyping(profilePicture)
    );
    socket.on('new chat room broadcast', chatRoom =>
      receiveChatRoom(chatRoom)
    );

    ::this.handleScrollToBottom();
  }
  componentDidUpdate() {
    ::this.handleScrollToBottom();
  }
  handleSideDrawerRender() {
    const { isOpen } = this.state;

    return (
      <MediaQuery query="(max-width: 767px)">
        {(matches) => {
          return (
            <SideDrawer
              socket={socket}
              handleSideDrawerToggle={::this.handleSideDrawerToggle}
              isOpen={matches ? isOpen : true}
              noOverlay={matches ? false : true }
            />
          )
        }}
      </MediaQuery>
    )
  }
  handleSideDrawerToggle() {
    this.setState({isOpen: !this.state.isOpen});
  }
  handleScrollToBottom() {
    this.messagesBottom.scrollIntoView();
  }
  handleSendMessage(data) {
    const { sendMessage } = this.props;

    sendMessage(data);
  }
  render() {
    const {
      user,
      typer,
      activeChatRoom,
      message
    } = this.props;

    return (
      <div className="chat-page">
        <Head title="Chat App" />
        {::this.handleSideDrawerRender()}
        <Header handleSideDrawerToggle={::this.handleSideDrawerToggle} />
        <div
          className="chat-box"
          ref={(element) => { this.chatBox = element; }}
        >
          <div className="chat-bubbles">
            <Container fluid>
              {
                message.messages &&
                message.messages.map((messageData, i) =>
                  <ChatBubble
                    key={i}
                    userData={messageData.user}
                    message={messageData.text}
                    time={messageData.createdAt}
                    isSender={(messageData.user._id === user.userData._id) ? true : false }
                  />
                )
              }
              <div
                style={{float: "left", clear: "both"}}
                ref={(element) => { this.messagesBottom = element; }}
              >
              </div>
            </Container>
          </div>
        </div>
        <ChatInput
          userData={user.userData}
          activeChatRoomData={activeChatRoom.chatRoomData}
          socket={socket}
          handleSendMessage={::this.handleSendMessage}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    typer: state.typer,
    activeChatRoom: state.activeChatRoom,
    message: state.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    isTyping,
    isNotTyping,
    receiveChatRoom,
    fetchMessages,
    sendMessage
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
