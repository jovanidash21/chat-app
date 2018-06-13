import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Container } from 'muicss/react';
import mapDispatchToProps from '../../actions';
import Header from '../Partial/Header';
import LeftSideDrawer from '../Partial/LeftSideDrawer';
import RightSideDrawer from '../Partial/RightSideDrawer';
import Head from '../../components/Head';
import LoadingAnimation from '../../components/LoadingAnimation';
import ChatBubble from '../../components/Chat/ChatBubble';
import ChatTyper from '../../components/Chat/ChatTyper';
import ChatInput from '../../components/Chat/ChatInput';
import NotificationPopUp from '../../components/NotificationPopUp';
import '../../styles/Chat.scss';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLeftSideDrawerOpen: false,
      isRightSideDrawerOpen: false,
    };
  }
  componentWillMount() {
    const {
      user,
      socketUserLogin
    } = this.props;

    socketUserLogin(user.active);
    document.body.className = '';
    document.body.classList.add('chat-page');
  }
  componentDidMount() {
    ::this.calculateViewportHeight();
    window.addEventListener('onorientationchange', ::this.calculateViewportHeight, true);
    window.addEventListener('resize', ::this.calculateViewportHeight, true);

    ::this.handleScrollToBottom();
  }
  componentDidUpdate() {
    ::this.handleScrollToBottom();
  }
  calculateViewportHeight() {
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    document.getElementById('chat-section').setAttribute('style', 'height:' + viewportHeight + 'px;');
  }
  handleLeftSideDrawerRender() {
    const { isLeftSideDrawerOpen } = this.state;

    return (
      <MediaQuery query="(max-width: 767px)">
        {(matches) => {
          return (
            <LeftSideDrawer
              handleLeftSideDrawerToggleEvent={::this.handleLeftSideDrawerToggleEvent}
              handleLeftSideDrawerToggleState={::this.handleLeftSideDrawerToggleState}
              isLeftSideDrawerOpen={matches ? isLeftSideDrawerOpen : true}
              noOverlay={matches ? false : true}
            />
          )
        }}
      </MediaQuery>
    )
  }
  handleLeftSideDrawerToggleEvent(event) {
    event.preventDefault();

    this.setState({isLeftSideDrawerOpen: !this.state.isLeftSideDrawerOpen});
  }
  handleLeftSideDrawerToggleState(state) {
    this.setState({isLeftSideDrawerOpen: state.isOpen});
  }
  handleRightSideDrawerToggleEvent(event) {
    event.preventDefault();

    this.setState({isRightSideDrawerOpen: !this.state.isRightSideDrawerOpen});
  }
  handleRightSideDrawerToggleState(state) {
    this.setState({isRightSideDrawerOpen: state.isOpen});
  }
  handleChatBoxRender() {
    const {
      user,
      typer,
      chatRoom,
      message
    } = this.props;

    if (chatRoom.all.length === 0) {
      return (
        <div className="user-no-chat-rooms">
          Hi! Welcome, create a Chat Room now.
        </div>
      )
    } else if (!message.isLoading && message.isFetchMessagesSuccess) {
      return (
        <Container fluid>
          {
            message.all.length > 0
              ?
              message.all.map((singleMessage, i) =>
                <ChatBubble
                  key={i}
                  user={singleMessage.user}
                  message={singleMessage.text}
                  time={singleMessage.createdAt}
                  isSender={(singleMessage.user._id === user.active._id) ? true : false }
                />
              )
              :
              <div className="chat-no-messages">
                No messages in this Chat Room
              </div>
          }
          <div className="chat-typers">
            {
              typer.all.length > 0 &&
              typer.all.map((singleTyper, i) =>
                <ChatTyper
                  key={i}
                  typer={singleTyper}
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
  handleSendTextMessage(newMessageID, text) {
    const {
      user,
      chatRoom,
      sendTextMessage
    } = this.props;

    sendTextMessage(newMessageID, text, user.active, chatRoom.active);
  }
  handleSendFileMessage(newMessageID, file) {
    const {
      user,
      chatRoom,
      sendFileMessage
    } = this.props;

    sendFileMessage(newMessageID, file, user.active, chatRoom.active);
  }
  handleNotificationViewMessage(chatRoomObj) {
    const {
      user,
      chatRoom,
      changeChatRoom
    } = this.props;

    changeChatRoom(chatRoomObj, user.active._id, chatRoom.active.data._id);
  }
  render() {
    const {
      user,
      typer,
      chatRoom,
      message,
      socketIsTyping,
      socketIsNotTyping
    } = this.props;
    const { isRightSideDrawerOpen } = this.state;

    return (
      <div id="chat-section" className="chat-section">
        <Head title="Chat App" />
        {::this.handleLeftSideDrawerRender()}
        <RightSideDrawer
          handleRightSideDrawerToggleEvent={::this.handleRightSideDrawerToggleEvent}
          handleRightSideDrawerToggleState={::this.handleRightSideDrawerToggleState}
          isRightSideDrawerOpen={isRightSideDrawerOpen}
        />
        <Header
          handleLeftSideDrawerToggleEvent={::this.handleLeftSideDrawerToggleEvent}
          handleRightSideDrawerToggleEvent={::this.handleRightSideDrawerToggleEvent}
        />
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
          user={user.active}
          activeChatRoom={chatRoom.active}
          handleSocketIsTyping={socketIsTyping}
          handleSocketIsNotTyping={socketIsNotTyping}
          handleSendTextMessage={::this.handleSendTextMessage}
          handleSendFileMessage={::this.handleSendFileMessage}
        />
        <NotificationPopUp handleViewMessage={::this.handleNotificationViewMessage} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    typer: state.typer,
    chatRoom: state.chatRoom,
    message: state.message
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
