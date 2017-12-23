import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Container } from 'muicss/react';
import {
  isTyping,
  isNotTyping
} from '../../actions/typer';
import { receiveChatRoom } from '../../actions/chat-room';
import {
  fetchMessages,
  sendMessage,
  receiveMessage
} from '../../actions/message';
import Header from '../Common/Header';
import SideDrawer from '../Partial/SideDrawer';
import Head from '../../components/Head';
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
    sendMessage,
    receiveMessage
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
