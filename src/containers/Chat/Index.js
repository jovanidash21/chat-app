import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Container } from 'muicss/react';
import Popup from 'react-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../actions';
import Header from '../Partial/Header';
import LeftSideDrawer from '../Partial/LeftSideDrawer';
import RightSideDrawer from '../Partial/RightSideDrawer';
import Head from '../../components/Head';
import LoadingAnimation from '../../components/LoadingAnimation';
import ChatBubble from '../../components/Chat/ChatBubble';
import ChatTyper from '../../components/Chat/ChatTyper';
import ChatInput from '../../components/Chat/ChatInput';
import ChatAudioRecorder from '../../components/Chat/ChatAudioRecorder';
import NotificationPopUp from '../../components/NotificationPopUp';
import ChatImageLightBox from '../../components/Chat/ChatImageLightBox';
import '../../styles/Chat.scss';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLoadedAllMessages: false,
      isChatBoxScrollToBottom: false,
      isChatBoxScrollToTop: false,
      scrollPosition: 0,
      oldestMessageQuery: false,
      oldestMessageOffsetTop: 0,
      isLeftSideDrawerOpen: false,
      isRightSideDrawerOpen: false,
      isAudioRecorderOpen: false,
      isImageLightboxOpen: false,
      imageIndex: -1,
      audioIndex: -1
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
    this.chatBox.addEventListener('scroll', ::this.handleChatBoxScroll, true);
  }
  componentDidUpdate(prevProps) {
    if (
      ( prevProps.message.isFetchingNew && !this.props.message.isFetchingNew ) ||
      ( !prevProps.message.isSending && this.props.message.isSending ) ||
      this.state.isChatBoxScrollToBottom
    ) {
      ::this.handleScrollToBottom();
    }

    if ( prevProps.message.isFetchingNew && !this.props.message.isFetchingNew ) {
      this.setState({hasLoadedAllMessages: false});
    }

    if ( prevProps.message.isFetchingOld && !this.props.message.isFetchingOld ) {
      const {
        scrollPosition,
        oldestMessageQuery,
        oldestMessageOffsetTop
      } = this.state;
      const newOldestMessageOffsetTop = oldestMessageQuery.offsetTop;

      if ( scrollPosition === this.chatBox.scrollTop && oldestMessageQuery ) {
        this.chatBox.scrollTop = newOldestMessageOffsetTop - oldestMessageOffsetTop;
      }
    }

    if (
      ( prevProps.message.isFetchingNew &&
        !this.props.message.isFetchingNew &&
        this.props.message.all.length < 50 ) ||
      ( prevProps.message.isFetchingOld &&
        !this.props.message.isFetchingOld &&
        this.props.message.all.length - prevProps.message.all.length < 50 )
    ) {
      this.setState({hasLoadedAllMessages: true});
    }
  }
  calculateViewportHeight() {
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    document.getElementById('chat-section').setAttribute('style', 'height:' + viewportHeight + 'px;');
  }
  handleScrollToBottom() {
    this.messagesBottom.scrollIntoView();
  }
  handleChatBoxScroll() {
    if ( this.chatBox.scrollTop === (this.chatBox.scrollHeight - this.chatBox.offsetHeight) ) {
      this.setState({isChatBoxScrollToBottom: true});
    } else {
      this.setState({isChatBoxScrollToBottom: false});
    }

    if ( this.chatBox.scrollTop < 40 ) {
      this.setState({isChatBoxScrollToTop: true});
      ::this.handleFetchOldMessages();
    } else {
      this.setState({isChatBoxScrollToTop: false});
    }
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
  handleChatBoxRender() {
    const {
      user,
      typer,
      chatRoom,
      message
    } = this.props;
    const { hasLoadedAllMessages } = this.state;

    if (chatRoom.all.length === 0) {
      return (
        <div className="user-no-chat-rooms">
          Hi! Welcome, create a Chat Room now.
        </div>
      )
    } else if ( !message.isFetchingNew && message.isFetchingNewSuccess ) {
      return (
        <Container fluid>
          {
            !hasLoadedAllMessages &&
            <div className="loading-icon">
              <FontAwesomeIcon icon="spinner" size="2x" pulse />
            </div>
          }
          {
            message.all.length > 0
              ?
              message.all.map((singleMessage, i) =>
                <ChatBubble
                  key={singleMessage._id}
                  index={i}
                  message={singleMessage}
                  isSender={(singleMessage.user._id === user.active._id) ? true : false }
                  handleImageLightboxToggle={::this.handleImageLightboxToggle}
                  handleAudioPlayingToggle={::this.handleAudioPlayingToggle}
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
  handleImageLightboxRender() {
    const { message } = this.props;
    const {
      isImageLightboxOpen,
      imageIndex
    } = this.state;
    if ( !message.isFetchingNew && message.isFetchingNewSuccess ) {
      const imagesArray = [];
      const imageMessages = message.all.filter(imageMessage =>
        imageMessage.messageType === 'image'
      );

      for (var i = 0; i < imageMessages.length; i++) {
        var imageMessage = imageMessages[i];

        imagesArray[i] = {
          id: imageMessage._id,
          src: imageMessage.fileLink
        };
      }

      return (
        <div>
          {
            isImageLightboxOpen &&
            <ChatImageLightBox
              images={imagesArray}
              imageIndex={imageIndex}
              handleImageLightboxToggle={::this.handleImageLightboxToggle}
              handlePrevImage={::this.handlePrevImage}
              handleNextImage={::this.handleNextImage}
            />
          }
        </div>
      )
    }
  }
  handleAudioRecorderToggle(event) {
    event.preventDefault();

    this.setState({isAudioRecorderOpen: !this.state.isAudioRecorderOpen});
    ::this.handleScrollToBottom();
  }
  handleFetchOldMessages() {
    const {
      user,
      chatRoom,
      message,
      fetchOldMessages
    } = this.props;
    const {
      hasLoadedAllMessages,
      isChatBoxScrollToTop
    } = this.state;

    if ( !hasLoadedAllMessages && isChatBoxScrollToTop && !message.isFetchingOld ) {
      const scrollPosition = this.chatBox.scrollTop;
      const oldestMessageQuery = document.querySelectorAll(".chat-box .chat-bubble-wrapper")[0];
      const oldestMessageOffsetTop = oldestMessageQuery.offsetTop;

      this.setState({
        scrollPosition: scrollPosition,
        oldestMessageQuery: oldestMessageQuery,
        oldestMessageOffsetTop: oldestMessageOffsetTop
      });

      fetchOldMessages(chatRoom.active.data._id, user.active._id, message.all.length);
    }
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
      Popup.alert('Maximum upload file size is 2MB only');
    } else {
      sendAudioMessage(newMessageID, text, audio, user.active, chatRoom.active.data._id);
    }
  }
  handleSendFileMessage(newMessageID, text, file) {
    const {
      user,
      chatRoom,
      sendFileMessage
    } = this.props;

    if ( file.size > 1024 * 1024 * 2 ) {
      Popup.alert('Maximum upload file size is 2MB only');
    } else {
      sendFileMessage(newMessageID, text, file, user.active, chatRoom.active.data._id);
    }
  }
  handleSendImageMessage(newMessageID, text, image) {
    const {
      user,
      chatRoom,
      sendImageMessage
    } = this.props;

    if ( image.type.indexOf('image/') === -1 ) {
      Popup.alert('Please select an image file');
    } else if ( image.size > 1024 * 1024 * 2 ) {
      Popup.alert('Maximum upload file size is 2MB only');
    } else {
      sendImageMessage(newMessageID, text, image, user.active, chatRoom.active.data._id);
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
  handleImageLightboxToggle(messageID) {
    const { message } = this.props;
    var index = -1;

    const imageMessages = message.all.filter(imageMessage =>
      imageMessage.messageType === 'image'
    );

    for (var i = 0; i < imageMessages.length; i++) {
      var imageMessage = imageMessages[i];

      if (imageMessage._id === messageID) {
        index = i;
        break;
      }
    }

    this.setState({
      isImageLightboxOpen: !this.state.isImageLightboxOpen,
      imageIndex: index
    });
  }
  handlePrevImage(imageIndex) {
    this.setState({imageIndex: imageIndex});
  }
  handleNextImage(imageIndex) {
    this.setState({imageIndex: imageIndex});
  }
  handleAudioPlayingToggle(audioPlayingIndex) {
    const { audioIndex } = this.state;

    if ( audioIndex > -1 && audioIndex !== audioPlayingIndex ) {
      var previousAudio = document.getElementsByClassName('react-plyr-' + audioIndex)[0];

      if (
        previousAudio.currentTime > 0  &&
        !previousAudio.paused &&
        !previousAudio.ended &&
        previousAudio.readyState > 2
      ) {
        previousAudio.pause();
      }
    }

    this.setState({audioIndex: audioPlayingIndex});
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
    const {
      isRightSideDrawerOpen,
      isAudioRecorderOpen
    } = this.state;

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
        <div  className={"chat-box-wrapper " + (isAudioRecorderOpen ? 'audio-recorder-open' : '')}>
          <div
            className="chat-box"
            ref={(element) => { this.chatBox = element; }}
          >
            {::this.handleChatBoxRender()}
            <div
              style={{float: "left", clear: "both"}}
              ref={(element) => { this.messagesBottom = element; }}
            />
          </div>
        </div>
        {::this.handleImageLightboxRender()}
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
              handleSendFileMessage={::this.handleSendFileMessage}
              handleSendImageMessage={::this.handleSendImageMessage}
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
    typer: state.typer,
    chatRoom: state.chatRoom,
    message: state.message
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
