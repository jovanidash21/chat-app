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

    this.chatSection.setAttribute('style', 'height:' + viewportHeight + 'px;');
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
  handleOpenPopUpChatRoom(selectedChatRoom) {
    const {
      user,
      chatRoom,
      popUpChatRoom,
      openPopUpChatRoom,
      closePopUpChatRoom
    } = this.props;
    const activeUser = user.active;
    const activeChatRoom = chatRoom.active;
    const allPopUpChatRooms = popUpChatRoom.all;
    var chatRoomFound = false;

    for ( var i = 0; i < allPopUpChatRooms.length; i++ ) {
      var singleChatRoom = allPopUpChatRooms[i];

      if ( singleChatRoom.data._id === selectedChatRoom.data._id ) {
        chatRoomFound = true;
        break;
      }
    }

    if ( ! chatRoomFound ) {
      if ( allPopUpChatRooms.length >= 5 ) {
        closePopUpChatRoom(allPopUpChatRooms[0].data._id);
      }

      openPopUpChatRoom(selectedChatRoom, activeUser._id, activeChatRoom.data._id);
    }
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
    const audioLength = new Date(audio.stopTime) - new Date(audio.startTime);

    if ( audioLength > ( 60 * 1000 ) ) {
      Popup.alert('Maximum of 1 minute audio only');
    } else {
      sendAudioMessage(newMessageID, text, audio.blob, user.active, chatRoom.active.data._id);
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
      isTyping,
      isNotTyping
    } = this.props;
    const {
      isRightSideDrawerOpen,
      isAudioRecorderOpen,
      isDragDropBoxOpen
    } = this.state;
    const isChatInputDisabled = chatRoom.fetch.loading || message.fetchNew.loading || isDragDropBoxOpen;

    return (
      <div className="chat-section" ref={(element) => { this.chatSection = element; }}>
        {::this.handleLeftSideDrawerRender()}
        <RightSideDrawer
          handleRightSideDrawerToggleState={::this.handleRightSideDrawerToggleState}
          isRightSideDrawerOpen={isRightSideDrawerOpen}
        >
          <MembersList handleRightSideDrawerToggleEvent={::this.handleRightSideDrawerToggleEvent} />
        </RightSideDrawer>
        <Header
          handleLeftSideDrawerToggleEvent={::this.handleLeftSideDrawerToggleEvent}
          handleOpenPopUpChatRoom={::this.handleOpenPopUpChatRoom}
        >
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
              handleIsTyping={isTyping}
              handleIsNotTyping={isNotTyping}
              handleSendTextMessage={::this.handleSendTextMessage}
              handleAudioRecorderToggle={::this.handleAudioRecorderToggle}
              handleDragDropBoxToggle={::this.handleDragDropBoxToggle}
              disabled={isChatInputDisabled}
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
    popUpChatRoom: state.popUpChatRoom,
    message: state.message
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
