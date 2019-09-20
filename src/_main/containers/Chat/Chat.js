import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import Popup from 'react-popup';
import Peer from 'simple-peer';
import mapDispatchToProps from '../../actions';
import { isObjectEmpty } from '../../../utils/object';
import { getMedia } from '../../../utils/media';
import {
  Header,
  LeftSideDrawer,
  RightSideDrawer,
} from '../Common';
import {
  ChatBox,
  ChatPopUpWindow,
  ActiveChatRoom,
  ChatRoomsList,
  MembersList,
  VideoCallRequestModal,
  VideoCallWindow,
} from '../Partial';
import {
  ChatInput,
  ChatAudioRecorder,
} from '../../components/Chat';
import { NotificationPopUp } from '../../components/NotificationPopUp';
import {
  SOCKET_BROADCAST_REQUEST_VIDEO_CALL,
  SOCKET_BROADCAST_CANCEL_REQUEST_VIDEO_CALL,
  SOCKET_BROADCAST_REJECT_VIDEO_CALL,
  SOCKET_BROADCAST_ACCEPT_VIDEO_CALL,
  SOCKET_BROADCAST_END_VIDEO_CALL,
} from '../../constants/video-call';
import socket from '../../../socket';
import '../../styles/Chat.scss';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.peer = null;
    this.callerPeerID = null;

    this.state = {
      leftSideDrawerOpen: false,
      rightSideDrawerOpen: false,
      activeChatPopUpWindow: -1,
      audioRecorderOpen: false,
      dragDropBoxOpen: false,
      localVideoSource: {},
      remoteVideoSource: {},
      videoCallRequestModalOpen: false,
      videoCallWindowOpen: false,
    };
  }
  componentWillMount() {
    document.body.className = '';
    document.body.classList.add('chat-page');
  }
  componentDidMount() {
    ::this.calculateViewportHeight();
    window.addEventListener( 'onorientationchange', ::this.calculateViewportHeight, true );
    window.addEventListener( 'resize', ::this.calculateViewportHeight, true );

    socket.on('action', (action) => {
      switch (action.type) {
        case SOCKET_BROADCAST_REQUEST_VIDEO_CALL:
          this.callerPeerID = action.peerID;
          this.setState({videoCallRequestModalOpen: true});
          break;
        case SOCKET_BROADCAST_CANCEL_REQUEST_VIDEO_CALL:
          this.setState({videoCallRequestModalOpen: false});
          break;
        case SOCKET_BROADCAST_REJECT_VIDEO_CALL:
        case SOCKET_BROADCAST_END_VIDEO_CALL:
          this.setState({videoCallWindowOpen: false});
          break;
        case SOCKET_BROADCAST_ACCEPT_VIDEO_CALL:
          ::this.handleSignalPeer(action.peerID);
          break;
      }
    });
  }
  calculateViewportHeight() {
    if (this.chatSection) {
      const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

      this.chatSection.setAttribute('style', 'height:' + viewportHeight + 'px;');
    }
  }
  handleLeftSideDrawerRender() {
    const { leftSideDrawerOpen } = this.state;

    return (
      <MediaQuery query="(min-width: 768px)">
        {(matches) => {
          return (
            <LeftSideDrawer
              handleLeftSideDrawerToggleState={::this.handleLeftSideDrawerToggleState}
              open={matches ? true : leftSideDrawerOpen}
              noOverlay={matches}
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
  handleLeftSideDrawerToggleEvent(openTheDrawer = false) {
    this.setState({leftSideDrawerOpen: openTheDrawer});
  }
  handleLeftSideDrawerToggleState(state) {
    this.setState({leftSideDrawerOpen: state.isOpen});
  }
  handleRightSideDrawerToggleEvent(openTheDrawer = false) {
    this.setState({rightSideDrawerOpen: openTheDrawer});
  }
  handleRightSideDrawerToggleState(state) {
    this.setState({rightSideDrawerOpen: state.isOpen});
  }
  handleOpenPopUpChatRoom(selectedChatRoom) {
    const {
      user,
      chatRoom,
      popUpChatRoom,
      openPopUpChatRoom,
      closePopUpChatRoom,
    } = this.props;
    const activeUser = user.active;
    const activeChatRoom = chatRoom.active;
    const allPopUpChatRooms = popUpChatRoom.all;

    const popUpIndex = allPopUpChatRooms.findIndex(( singleChatRoom ) => {
      return singleChatRoom.data._id === selectedChatRoom.data._id;
    });

    if ( popUpIndex === -1 ) {
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

    this.setState({audioRecorderOpen: ! this.state.audioRecorderOpen});
  }
  handleDragDropBoxToggle(openTheDragDropBox = false) {
    this.setState({dragDropBoxOpen: openTheDragDropBox});
  }
  handleSendTextMessage(newMessageID, text, chatRoomID) {
    const {
      user,
      sendTextMessage,
    } = this.props;

    sendTextMessage(newMessageID, text, user.active, chatRoomID);
  }
  handleSendAudioMessage(newMessageID, text, audio, chatRoomID) {
    const {
      user,
      sendAudioMessage,
    } = this.props;
    const audioLength = new Date( audio.stopTime ) - new Date( audio.startTime );

    if ( audioLength > ( 60 * 1000 ) ) {
      Popup.alert('Maximum of 1 minute audio only');
    } else {
      sendAudioMessage( newMessageID, text, audio.blob, user.active, chatRoomID );
    }
  }
  handleVideoCallError() {
    Popup.alert('Camera is not supported on your device!');
  }
  handleSignalPeer(peerID) {
    if ( this.peer ) {
      this.peer.signal(peerID);

      this.peer.on('stream', ( remoteStream ) => {
        this.setState({remoteVideoSource: remoteStream});
      });
    }
  }
  handleRequestVideoCall(chatRoom) {
    const {
      user,
      requestVideoCall,
    } = this.props;
    const activeUser = user.active;
    const chatRoomMembers = chatRoom.data.members;

    if ( chatRoom.data.chatType === 'direct' ) {
      const memberIndex = chatRoomMembers.findIndex(( singleMember ) => {
        return singleMember._id !== activeUser._id;
      });

      if ( memberIndex > -1 ) {
        getMedia(
          (stream) => {
            this.peer = new Peer({
              initiator: true,
              trickle: false,
              stream: stream
            });

            this.peer.on('signal', (signal) => {
              requestVideoCall(activeUser._id, chatRoomMembers[memberIndex], signal);
            });

            this.setState({
              localVideoSource: stream,
              remoteVideoSource: {},
              videoCallWindowOpen: true,
            });
          },
          ::this.handleVideoCallError
        );
      }
    }
  }
  handleCancelRequestVideoCall(receiverID) {
    const { cancelRequestVideoCall } = this.props;

    cancelRequestVideoCall(receiverID);
    this.setState({videoCallWindowOpen: false});
  }
  handleAcceptVideoCall(callerID) {
    const { acceptVideoCall } = this.props;

    getMedia(
      (stream) => {
        this.peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream
        });

        ::this.handleSignalPeer(this.callerPeerID);

        this.peer.on('signal', (signal) => {
          acceptVideoCall(callerID, signal);
        });

        this.setState({
          localVideoSource: stream,
          videoCallRequestModalOpen: false,
          videoCallWindowOpen: true,
        });
      },
      () => {
        ::this.handleRejectVideoCall();
        ::this.handleVideoCallError();
      }
    );
  }
  handleRejectVideoCall() {
    const {
      videoCall,
      rejectVideoCall,
    } = this.props;
    const peerUser = videoCall.peerUser;

    rejectVideoCall(peerUser._id);
    this.setState({videoCallRequestModalOpen: false});
  }
  handleEndVideoCall(peerUserID) {
    const { endVideoCall } = this.props;

    endVideoCall(peerUserID);
    this.setState({videoCallWindowOpen: false});
  }
  handleNotificationViewMessage(chatRoomObj, mobile) {
    const {
      user,
      chatRoom,
      changeChatRoom,
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
      typer,
      chatRoom,
      popUpChatRoom,
      message,
      videoCall,
      searchUser,
      isTyping,
      isNotTyping,
    } = this.props;
    const {
      rightSideDrawerOpen,
      activeChatPopUpWindow,
      audioRecorderOpen,
      dragDropBoxOpen,
      localVideoSource,
      remoteVideoSource,
      videoCallRequestModalOpen,
      videoCallWindowOpen,
    } = this.state;
    const activeChatRoom = chatRoom.active;
    const loading = user.fetchActive.loading || chatRoom.fetch.loading;
    const isChatInputDisabled = message.fetchNew.loading || dragDropBoxOpen;

    return (
      <div className="chat-section" ref={(element) => { this.chatSection = element; }}>
        {::this.handleLeftSideDrawerRender()}
        <RightSideDrawer
          handleRightSideDrawerToggleState={::this.handleRightSideDrawerToggleState}
          open={rightSideDrawerOpen}
        >
          <MembersList
            handleRightSideDrawerToggleEvent={::this.handleRightSideDrawerToggleEvent}
            handleOpenPopUpChatRoom={::this.handleOpenPopUpChatRoom}
          />
        </RightSideDrawer>
        <Header
          handleLeftSideDrawerToggleEvent={::this.handleLeftSideDrawerToggleEvent}
          handleOpenPopUpChatRoom={::this.handleOpenPopUpChatRoom}
          handleRequestVideoCall={::this.handleRequestVideoCall}
        >
          <ActiveChatRoom
            handleRightSideDrawerToggleEvent={::this.handleRightSideDrawerToggleEvent}
          />
        </Header>
        <div className={"chat-box-wrapper " + (audioRecorderOpen ? 'audio-recorder-open' : '')}>
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
                      handleRequestVideoCall={::this.handleRequestVideoCall}
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
            messages={message.all}
            typers={typer.all}
            handleDragDropBoxToggle={(::this.handleDragDropBoxToggle)}
            dragDropBoxOpen={dragDropBoxOpen}
            fetchNewLoading={message.fetchNew.loading}
            fetchOldLoading={message.fetchOld.loading}
          />
        </div>
        {
          ! loading &&
          ! isObjectEmpty( activeChatRoom.data ) &&
          <Fragment>
            {
              ! audioRecorderOpen
                ?
                <ChatInput
                  user={user.active}
                  chatRoomID={activeChatRoom.data._id}
                  handleIsTyping={isTyping}
                  handleIsNotTyping={isNotTyping}
                  handleSearchUser={searchUser}
                  handleSendTextMessage={::this.handleSendTextMessage}
                  handleAudioRecorderToggle={::this.handleAudioRecorderToggle}
                  handleDragDropBoxToggle={::this.handleDragDropBoxToggle}
                  userTagSuggestions={user.searched}
                  disabled={isChatInputDisabled}
                  userTagLoading={user.search.loading}
                />
                :
                <ChatAudioRecorder
                  chatRoomID={activeChatRoom.data._id}
                  handleAudioRecorderToggle={::this.handleAudioRecorderToggle}
                  handleSendAudioMessage={::this.handleSendAudioMessage}
                />
            }
          </Fragment>
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
        {
          videoCallRequestModalOpen &&
          <VideoCallRequestModal
            open={videoCallRequestModalOpen}
            handleAcceptVideoCall={::this.handleAcceptVideoCall}
            handleRejectVideoCall={::this.handleRejectVideoCall}
          />
        }
        {
          videoCallWindowOpen &&
          <VideoCallWindow
            localVideoSource={localVideoSource}
            remoteVideoSource={remoteVideoSource}
            handleCancelRequestVideoCall={::this.handleCancelRequestVideoCall}
            handleEndVideoCall={::this.handleEndVideoCall}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    typer: state.typer,
    chatRoom: state.chatRoom,
    popUpChatRoom: state.popUpChatRoom,
    message: state.message,
    videoCall: state.videoCall,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
