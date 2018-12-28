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
  ChatPopUpWindow,
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
      activeChatPopUpWindow: -1,
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
              <ChatRoomsList
                handleLeftSideDrawerToggleEvent={::this.handleLeftSideDrawerToggleEvent}
                handleOpenPopUpChatRoom={::this.handleOpenPopUpChatRoom}
              />
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
    var popUpIndex = -1;

    for ( var i = 0; i < allPopUpChatRooms.length; i++ ) {
      var singleChatRoom = allPopUpChatRooms[i];

      if ( singleChatRoom.data._id === selectedChatRoom.data._id ) {
        chatRoomFound = true;
        popUpIndex = i;
        break;
      }
    }

    if ( ! chatRoomFound ) {
      if ( allPopUpChatRooms.length >= 5 ) {
        closePopUpChatRoom(allPopUpChatRooms[0].data._id);
      }

      openPopUpChatRoom(selectedChatRoom, activeUser._id, activeChatRoom.data._id);
      this.setState({activeChatPopUpWindow: allPopUpChatRooms.length});
    } else {
      this.setState({activeChatPopUpWindow: popUpIndex});
    }
  }
  handleActiveChatPopUpWindow(popUpIndex) {
    this.setState({activeChatPopUpWindow: popUpIndex});
  }
  handleAudioRecorderToggle(event) {
    event.preventDefault();

    this.setState({isAudioRecorderOpen: !this.state.isAudioRecorderOpen});
  }
  handleDragDropBoxToggle(openTheDragDropBox=false) {
    this.setState({isDragDropBoxOpen: openTheDragDropBox});
  }
  handleSendTextMessage(newMessageID, text, chatRoomID) {
    const {
      user,
      sendTextMessage
    } = this.props;

    sendTextMessage(newMessageID, text, user.active, chatRoomID);
  }
  handleSendAudioMessage(newMessageID, text, audio, chatRoomID) {
    const {
      user,
      sendAudioMessage
    } = this.props;
    const audioLength = new Date(audio.stopTime) - new Date(audio.startTime);

    if ( audioLength > ( 60 * 1000 ) ) {
      Popup.alert('Maximum of 1 minute audio only');
    } else {
      sendAudioMessage(newMessageID, text, audio.blob, user.active, chatRoomID);
    }
  }
  handleNotificationViewMessage(chatRoomObj, mobile) {
    const {
      user,
      chatRoom,
      changeChatRoom
    } = this.props;

    if ( mobile ) {
      changeChatRoom(chatRoomObj, user.active._id, chatRoom.active.data._id);
      ::this.handleLeftSideDrawerToggleEvent();
      ::this.handleRightSideDrawerToggleEvent();
    } else {
      ::this.handleOpenPopUpChatRoom(chatRoomObj);
    }
  }
  render() {
    const {
      user,
      chatRoom,
      popUpChatRoom,
      message,
      isTyping,
      isNotTyping
    } = this.props;
    const {
      isRightSideDrawerOpen,
      activeChatPopUpWindow,
      isAudioRecorderOpen,
      isDragDropBoxOpen
    } = this.state;
    const activeChatRoom = chatRoom.active;
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
        <div className={"chat-box-wrapper " + (isAudioRecorderOpen ? 'audio-recorder-open' : '')}>
          <MediaQuery query="(min-width: 768px)">
            {
              popUpChatRoom.all.length > 0 &&
              <div className="chat-popup-window-wrapper">
                {
                  popUpChatRoom.all.map((singlePopUpChatRoom, i) =>
                    <ChatPopUpWindow
                      key={i}
                      index={i}
                      popUpChatRoom={singlePopUpChatRoom}
                      handleSendTextMessage={::this.handleSendTextMessage}
                      handleSendAudioMessage={::this.handleSendAudioMessage}
                      handleDragDropBoxToggle={::this.handleDragDropBoxToggle}
                      handleActiveChatPopUpWindow={::this.handleActiveChatPopUpWindow}
                      active={activeChatPopUpWindow === i}
                    />
                  )
                }
              </div>
            }
          </MediaQuery>
          <ChatBox
            chatRoom={activeChatRoom}
            message={message}
            handleDragDropBoxToggle={(::this.handleDragDropBoxToggle)}
            isDragDropBoxOpen={isDragDropBoxOpen}
            loading={message.fetchNew.loading}
          />
        </div>
        {
          !isAudioRecorderOpen
            ?
            <ChatInput
              user={user.active}
              chatRoom={activeChatRoom}
              handleIsTyping={isTyping}
              handleIsNotTyping={isNotTyping}
              handleSendTextMessage={::this.handleSendTextMessage}
              handleAudioRecorderToggle={::this.handleAudioRecorderToggle}
              handleDragDropBoxToggle={::this.handleDragDropBoxToggle}
              disabled={isChatInputDisabled}
            />
            :
            <ChatAudioRecorder
              chatRoom={activeChatRoom}
              handleAudioRecorderToggle={::this.handleAudioRecorderToggle}
              handleSendAudioMessage={::this.handleSendAudioMessage}
            />
        }
        <MediaQuery query="(max-width: 767px)">
          {(matches) => {
            return (
              <NotificationPopUp
                handleViewMessage={::this.handleNotificationViewMessage}
                mobile={matches}
              />
            )
          }}
        </MediaQuery>
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
