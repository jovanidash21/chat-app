import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'muicss/react';
import ReactResizeDetector from 'react-resize-detector';
import Popup from 'react-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuidv4 from 'uuid/v4';
import mapDispatchToProps from '../../../actions';
import { isObjectEmpty } from '../../../../utils/object';
import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import {
  ChatDateTime,
  ChatBubble,
  ChatTyper,
  ChatImageLightBox,
  ChatDragDropBox,
} from '../../../components/Chat';
import { DeleteMessageModal } from '../DeleteMessageModal';
import './styles.scss';

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLoadedAllMessages: false,
      chatBoxScrollToBottom: false,
      chatBoxScrollToTop: false,
      scrollPosition: 0,
      oldestMessageQuery: false,
      oldestMessageOffsetTop: 0,
      imageLightboxOpen: false,
      imageIndex: -1,
      audioIndex: -1,
      deleteMessageModalOpen: false,
      selectedMessageID: '',
    };
  }
  componentDidMount() {
    this.chatBox.addEventListener('scroll', ::this.handleChatBoxScroll, true);
  }
  componentDidUpdate(prevProps) {
    if (
      (prevProps.fetchNewLoading && !this.props.fetchNewLoading) ||
      this.state.chatBoxScrollToBottom
    ) {
      ::this.handleScrollToBottom();
    }

    if (prevProps.fetchNewLoading && !this.props.fetchNewLoading) {
      this.setState({
        hasLoadedAllMessages: false,
        chatBoxScrollToBottom: true,
      });
    }

    if (prevProps.fetchOldLoading && !this.props.fetchOldLoading) {
      const {
        scrollPosition,
        oldestMessageQuery,
        oldestMessageOffsetTop,
      } = this.state;
      const newOldestMessageOffsetTop = oldestMessageQuery.offsetTop;

      if (
        (this.chatBox.scrollTop < 40 ||
        scrollPosition === this.chatBox.scrollTop) &&
        oldestMessageQuery
      ) {
        this.chatBox.scrollTop = newOldestMessageOffsetTop - oldestMessageOffsetTop;
      }
    }

    if (
      (prevProps.fetchNewLoading &&
        !this.props.fetchNewLoading &&
        this.props.messages.length < 50) ||
      (prevProps.fetchOldLoading &&
        !this.props.fetchOldLoading &&
        this.props.messages.length - prevProps.messages.length < 50)
    ) {
      this.setState({hasLoadedAllMessages: true});
    }
  }
  handleScrollToBottom() {
    this.chatBox.scrollTop = this.chatBox.scrollHeight;
  }
  handleChatBoxScroll() {
    if (
      (this.chatBox.scrollTop === (this.chatBox.scrollHeight - this.chatBox.offsetHeight)) ||
      (this.chatBox.offsetHeight >= this.chatBox.scrollHeight)
    ) {
      this.setState({chatBoxScrollToBottom: true});
    } else {
      this.setState({chatBoxScrollToBottom: false});
    }

    if (this.chatBox.scrollTop < 40) {
      this.setState({chatBoxScrollToTop: true});
      ::this.handleFetchOldMessages();
    } else {
      this.setState({chatBoxScrollToTop: false});
    }
  }
  handleChatBoxRender() {
    const {
      user,
      chatRoom,
      messages,
      typers,
      fetchNewLoading,
      small,
    } = this.props;
    const { hasLoadedAllMessages } = this.state;
    const isActiveUserAdmin = user.active.role === 'admin';

    if (!isObjectEmpty(chatRoom.data) && !fetchNewLoading) {
      return (
        <Container fluid>
          {
            !hasLoadedAllMessages &&
            <div className="loading-icon">
              <FontAwesomeIcon icon="spinner" size="2x" pulse />
            </div>
          }
          {
            messages.length > 0
              ?
              messages.map((singleMessage, i) =>
                <div key={singleMessage._id}>
                  <ChatDateTime
                    messageDate={singleMessage.createdAt}
                    previousMessageDate={i-1 !== -1 ? messages[i-1].createdAt : ''}
                    small={small}
                  />
                  <ChatBubble
                    index={i}
                    message={singleMessage}
                    sender={singleMessage.user._id === user.active._id}
                    previousMessageSenderID={i-1 !== -1 ? messages[i-1].user._id : ''}
                    nextMessageSenderID={i !== messages.length-1 ? messages[i+1].user._id : ''}
                    previousMessageDate={i-1 !== -1 ? messages[i-1].createdAt : ''}
                    nextMessageDate={i !== messages.length-1 ? messages[i+1].createdAt : ''}
                    handleImageLightboxToggle={::this.handleImageLightboxToggle}
                    handleAudioPlayingToggle={::this.handleAudioPlayingToggle}
                    activeUserAdmin={isActiveUserAdmin}
                    handleOpenDeleteMessageModal={::this.handleOpenDeleteMessageModal}
                    small={small}
                  />
                </div>
              )
              :
              <div className="chat-no-messages">
                No messages in this Chat Room
              </div>
          }
          {
            typers.length > 0 &&
            <div className="chat-typers">
              {
                typers.map((singleTyper, i) =>
                  <ChatTyper
                    key={i}
                    typer={singleTyper}
                  />
                )
              }
            </div>
          }
        </Container>
      )
    } else {
      return (
        <div className="user-no-chat-rooms">
          {
            !small &&
            <p>
              Hi! Welcome, create a Chat Room now.
            </p>
          }
          {
            ! hasLoadedAllMessages &&
            <LoadingAnimation name={!small ? 'ball-pulse-sync' : 'double-bounce'} color="#26a69a" />
          }
        </div>
      )
    }
  }
  handleImageLightboxRender() {
    const {
      messages,
      fetchNewLoading
    } = this.props;
    const {
      imageLightboxOpen,
      imageIndex
    } = this.state;

    if (!fetchNewLoading) {
      const imagesArray = [];
      const imageMessages = messages.filter((imageMessage) => {
        return imageMessage.messageType === 'image';
      });

      for (let i = 0; i < imageMessages.length; i += 1) {
        const imageMessage = imageMessages[i];

        imagesArray[i] = {
          id: imageMessage._id,
          src: imageMessage.fileLink
        };
      }

      return (
        <Fragment>
          {
            imageLightboxOpen &&
            <ChatImageLightBox
              images={imagesArray}
              imageIndex={imageIndex}
              handleImageLightboxToggle={::this.handleImageLightboxToggle}
              handlePrevImage={::this.handlePrevImage}
              handleNextImage={::this.handleNextImage}
            />
          }
        </Fragment>
      )
    }
  }
  handleDragDropBoxRender() {
    const {
      handleDragDropBoxToggle,
      dragDropBoxOpen
    } = this.props;

    if (dragDropBoxOpen) {
      return (
        <ChatDragDropBox
          handleDragDropBoxToggle={handleDragDropBoxToggle}
          handleFilesDrop={::this.handleFilesDrop}
          handleSelectFile={::this.handleSelectFile}
        />
      )
    }
  }
  handleFetchOldMessages() {
    const {
      user,
      chatRoom,
      messages,
      fetchNewLoading,
      fetchOldMessages,
      fetchOldLoading
    } = this.props;
    const {
      hasLoadedAllMessages,
      chatBoxScrollToTop
    } = this.state;

    if ( !hasLoadedAllMessages && chatBoxScrollToTop && !fetchNewLoading && !fetchOldLoading ) {
      const scrollPosition = this.chatBox.scrollTop;
      const oldestMessageQuery = document.querySelectorAll(".chat-box .chat-bubble-wrapper")[0];
      const oldestMessageOffsetTop = oldestMessageQuery.offsetTop;

      this.setState({
        scrollPosition: scrollPosition,
        oldestMessageQuery: oldestMessageQuery,
        oldestMessageOffsetTop: oldestMessageOffsetTop
      });

      fetchOldMessages(chatRoom.data._id, user.active._id, messages.length);
    }
  }
  handleSendTextMessage(newMessageID, text) {
    const {
      user,
      chatRoom,
      sendTextMessage
    } = this.props;

    sendTextMessage(newMessageID, text, user.active, chatRoom.data._id);
  }
  handleImageLightboxToggle(messageID) {
    const { messages } = this.props;

    const imageMessages = messages.filter((imageMessage) => {
      return imageMessage.messageType === 'image';
    });

    const imageMessageIndex = imageMessages.findIndex((singleImageMessage) => {
      return singleImageMessage._id === messageID;
    });

    this.setState({
      imageLightboxOpen: !this.state.imageLightboxOpen,
      imageIndex: imageMessageIndex,
    });
  }
  handlePrevImage(imageIndex) {
    this.setState({imageIndex: imageIndex});
  }
  handleNextImage(imageIndex) {
    this.setState({imageIndex: imageIndex});
  }
  handleSendFileMessage(newMessageID, text, file) {
    const {
      user,
      chatRoom,
      sendFileMessage
    } = this.props;

    sendFileMessage(newMessageID, text, file, user.active, chatRoom.data._id);
  }
  handleFilesDrop(acceptedFiles, rejectedFiles) {
    const { handleDragDropBoxToggle } = this.props;

    if (rejectedFiles.length > 0) {
      Popup.alert('Maximum file size upload is 2MB only');
    } else {
      handleDragDropBoxToggle();

      for (let i = 0; i < acceptedFiles.length; i+= 1) {
        const file = acceptedFiles[i];
        const newMessageID = uuidv4();
        const fileName = file.name;

        ::this.handleSendFileMessage(newMessageID, fileName, file);
      }
    }
  }
  handleSelectFile(fileName, file) {
    const { handleDragDropBoxToggle } = this.props;
    const newMessageID = uuidv4();

    if (file.size > 1024 * 1024 * 2) {
      Popup.alert('Maximum file size upload is 2MB only');
    } else {
      handleDragDropBoxToggle();
      ::this.handleSendFileMessage(newMessageID, fileName, file);
    }
  }
  handleAudioPlayingToggle(audioPlayingIndex) {
    const { audioIndex } = this.state;

    if (audioIndex > -1 && audioIndex !== audioPlayingIndex) {
      const previousAudio = this.chatBox.getElementsByClassName('react-plyr-' + audioIndex)[0];

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
  handleOpenDeleteMessageModal(selectedMessageID) {
    this.setState({
      deleteMessageModalOpen: true,
      selectedMessageID: selectedMessageID
    });
  }
  handleCloseDeleteMessageModal() {
    this.setState({
      deleteMessageModalOpen: false,
      selectedMessageID: ''
    });
  }
  render() {
    const {
      user,
      chatRoom,
      isTyping,
      isNotTyping,
      fetchNewLoading,
      small
    } = this.props;
    const {
      deleteMessageModalOpen,
      selectedMessageID
    } = this.state;

    return (
      <ReactResizeDetector handleHeight onResize={::this.handleScrollToBottom}>
        <div className="chat-box-container">
          <div
            className={
              "chat-box" +
              (fetchNewLoading ? ' loading' : '') +
              (small ? ' small' : '')
            }
            ref={(element) => { this.chatBox = element; }}
          >
            {::this.handleChatBoxRender()}
            {::this.handleImageLightboxRender()}
            {::this.handleDragDropBoxRender()}
            {
              deleteMessageModalOpen &&
              <DeleteMessageModal
                open={deleteMessageModalOpen}
                selectedMessageID={selectedMessageID}
                onClose={::this.handleCloseDeleteMessageModal}
              />
            }
          </div>
        </div>
      </ReactResizeDetector>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

ChatBox.propTypes = {
  chatRoom: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  typers: PropTypes.array,
  handleDragDropBoxToggle: PropTypes.func.isRequired,
  dragDropBoxOpen: PropTypes.bool,
  fetchNewLoading: PropTypes.bool,
  fetchOldLoading: PropTypes.bool,
  small: PropTypes.bool,
}

ChatBox.defaultProps = {
  typers: [],
  dragDropBoxOpen: false,
  fetchNewLoading: false,
  fetchOldLoading: false,
  small: false,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatBox);
