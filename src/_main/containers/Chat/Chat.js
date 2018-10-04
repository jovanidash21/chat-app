import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import Popup from 'react-popup';
import mapDispatchToProps from '../../actions';
import {
  Header,
  LeftSideDrawer,
  RightSideDrawer
} from '../Common';
import {
  ChatBox,
  ActiveChatRoom,
  ChatRoomsList,
  MembersList
} from '../Partial';
import {
  ChatInput,
  ChatAudioRecorder
} from '../../components/Chat';
import { NotificationPopUp } from '../../components/NotificationPopUp';
import '../../styles/Chat.scss';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLeftSideDrawerOpen: false,
      isRightSideDrawerOpen: false,
      isAudioRecorderOpen: false,
      isDragDropBoxOpen: false
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
  }
  calculateViewportHeight() {
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    document.getElementById('chat-section').setAttribute('style', 'height:' + viewportHeight + 'px;');
  }
  handleLeftSideDrawerRender() {
    const { isLeftSideDrawerOpen } = this.state;

    return (
      <MediaQuery query="(min-width: 768px)">
        {(matches) => {
          return (
            <LeftSideDrawer
              handleLeftSideDrawerToggleState={::this.handleLeftSideDrawerToggleState}
              isLeftSideDrawerOpen={matches ? true : isLeftSideDrawerOpen}
              noOverlay={matches ? true : false}
            >
              <ChatRoomsList handleLeftSideDrawerToggleEvent={::this.handleLeftSideDrawerToggleEvent} />
            </LeftSideDrawer>
          )
        }}
      </MediaQuery>
    )
  }
  handleLeftSideDrawerToggleEvent(openTheDrawer=false) {
    this.setState({isLeftSideDrawerOpen: openTheDrawer});
  }
  handleLeftSideDrawerToggleState(state) {
    this.setState({isLeftSideDrawerOpen: state.isOpen});
  }
  handleRightSideDrawerToggleEvent(openTheDrawer=false) {
    this.setState({isRightSideDrawerOpen: openTheDrawer});
  }
  handleRightSideDrawerToggleState(state) {
    this.setState({isRightSideDrawerOpen: state.isOpen});
  }
  handleAudioRecorderToggle(event) {
    event.preventDefault();

    this.setState({isAudioRecorderOpen: !this.state.isAudioRecorderOpen});
  }
  handleDragDropBoxToggle(openTheDragDropBox=false) {
    this.setState({isDragDropBoxOpen: openTheDragDropBox});
  }
  handleSendTextMessage(newMessageID, text) {
    const {
      user,
      chatRoom,
      sendTextMessage
    } = this.props;

    sendTextMessage(newMessageID, text, user.active, chatRoom.active.data._id);
  }
  handleSendAudioMessage(newMessageID, text, audio) {
    const {
      user,
      chatRoom,
      sendAudioMessage
    } = this.props;

    if ( audio.size > 1024 * 1024 * 2 ) {
      Popup.alert('Maximum file size upload is 2MB only');
    } else {
      sendAudioMessage(newMessageID, text, audio, user.active, chatRoom.active.data._id);
    }
  }
  handleNotificationViewMessage(chatRoomObj) {
    const {
      user,
      chatRoom,
      changeChatRoom
    } = this.props;

    changeChatRoom(chatRoomObj, user.active._id, chatRoom.active.data._id);
    ::this.handleLeftSideDrawerToggleEvent();
    ::this.handleRightSideDrawerToggleEvent();
  }
  render() {
    const {
      user,
      chatRoom,
      message,
      socketIsTyping,
      socketIsNotTyping
    } = this.props;
    const {
      isRightSideDrawerOpen,
      isAudioRecorderOpen,
      isDragDropBoxOpen
    } = this.state;
    const isChatInputDisabled = chatRoom.isFetching || message.isFetchingNew || isDragDropBoxOpen;

    return (
      <div id="chat-section" className="chat-section">
        {::this.handleLeftSideDrawerRender()}
        <RightSideDrawer
          handleRightSideDrawerToggleState={::this.handleRightSideDrawerToggleState}
          isRightSideDrawerOpen={isRightSideDrawerOpen}
        >
          <MembersList handleRightSideDrawerToggleEvent={::this.handleRightSideDrawerToggleEvent} />
        </RightSideDrawer>
        <Header handleLeftSideDrawerToggleEvent={::this.handleLeftSideDrawerToggleEvent}>
          <ActiveChatRoom
            handleRightSideDrawerToggleEvent={::this.handleRightSideDrawerToggleEvent}
          />
        </Header>
        <ChatBox
          isAudioRecorderOpen={isAudioRecorderOpen}
          handleDragDropBoxToggle={::this.handleDragDropBoxToggle}
          isDragDropBoxOpen={isDragDropBoxOpen}
        />
        {
          !isAudioRecorderOpen
            ?
            <ChatInput
              user={user.active}
              activeChatRoom={chatRoom.active}
              handleSocketIsTyping={socketIsTyping}
              handleSocketIsNotTyping={socketIsNotTyping}
              handleSendTextMessage={::this.handleSendTextMessage}
              handleAudioRecorderToggle={::this.handleAudioRecorderToggle}
              handleDragDropBoxToggle={::this.handleDragDropBoxToggle}
              isDisabled={isChatInputDisabled}
            />
            :
            <ChatAudioRecorder
              handleAudioRecorderToggle={::this.handleAudioRecorderToggle}
              handleSendAudioMessage={::this.handleSendAudioMessage}
            />
        }
        <NotificationPopUp handleViewMessage={::this.handleNotificationViewMessage} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom,
    message: state.message
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
