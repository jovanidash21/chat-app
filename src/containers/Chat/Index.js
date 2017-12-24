import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Container } from 'muicss/react';
import {
  socketIsTyping,
  socketIsNotTyping
} from '../../actions/typer';
import { receiveChatRoom } from '../../actions/chat-room';
import {
  fetchMessages,
  sendMessage
} from '../../actions/message';
import Header from '../Common/Header';
import SideDrawer from '../Partial/SideDrawer';
import Head from '../../components/Head';
import LoadingAnimation from '../../components/LoadingAnimation';
import ChatBubble from '../../components/Chat/ChatBubble';
import ChatTyper from '../../components/Chat/ChatTyper';
import ChatInput from '../../components/Chat/ChatInput';
import '../../styles/Chat.scss';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  componentDidMount() {
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
  handleChatBoxRender() {
    const {
      user,
      typer,
      message
    } = this.props;

    if (!message.isLoading && message.isFetchMessagesSuccess) {
      return (
        <Container fluid>
          {
            message.messages.length
              ?
              message.messages.map((messageData, i) =>
                <ChatBubble
                  key={i}
                  userData={messageData.user}
                  message={messageData.text}
                  time={messageData.createdAt}
                  isSender={(messageData.user._id === user.userData._id) ? true : false }
                />
              )
              :
              <div className="chat-no-messages">
                No messages in this Chat Room
              </div>
          }
          <div className="chat-typers">
            {
              typer.map((typerData, i) =>
                <ChatTyper
                  key={i}
                  name={typerData.name}
                  profilePicture={typerData.profilePicture}
                />
              )
            }
          </div>
        </Container>
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="black" />
      )
    }
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
      message,
      socketIsTyping,
      socketIsNotTyping
    } = this.props;

    return (
      <div className="chat-page">
        <Head title="Chat App" />
        {::this.handleSideDrawerRender()}
        <Header handleSideDrawerToggle={::this.handleSideDrawerToggle} />
        <div className="chat-box">
          <div className="chat-bubbles">
            {::this.handleChatBoxRender()}
            <div
              style={{float: "left", clear: "both"}}
              ref={(element) => { this.messagesBottom = element; }}
            >
            </div>
          </div>
        </div>
        <ChatInput
          userData={user.userData}
          activeChatRoomData={activeChatRoom.chatRoomData}
          handleSocketIsTyping={socketIsTyping}
          handleSocketIsNotTyping={socketIsNotTyping}
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
    socketIsTyping,
    socketIsNotTyping,
    receiveChatRoom,
    fetchMessages,
    sendMessage
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
