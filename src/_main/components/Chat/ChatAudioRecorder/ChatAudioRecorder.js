import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactMic } from 'react-mic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuidv4 from 'uuid/v4';
import './styles.scss';

class ChatAudioRecorder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAudioRecording: false,
      isSendAudioClick: false,
    };
  }
  handleStartAudioRecording(event) {
    event.preventDefault();

    this.setState({
      isAudioRecording: true,
      isSendAudioClick: false,
    });
  }
  handleStopAudioRecording(event) {
    event.preventDefault();

    this.setState({
      isAudioRecording: false,
      isSendAudioClick: false,
    });
  }
  handleSendAudioMessageOnClick() {
    const { isAudioRecording } = this.state;

    if ( isAudioRecording ) {
      this.setState({
        isAudioRecording: false,
        isSendAudioClick: true,
      });
    }
  }
  handleAudioUploadRecord(audio) {
    const {
      chatRoomID,
      handleSendAudioMessage,
    } = this.props;
    const { isSendAudioClick } = this.state;
    const newMessageID = uuidv4();
    const audioName = 'voice message';

    if ( isSendAudioClick ) {
      handleSendAudioMessage(newMessageID, audioName, audio, chatRoomID);
    }
  }
  render() {
    const {
      handleAudioRecorderToggle,
      small
    } = this.props;
    const { isAudioRecording } = this.state;

    return (
      <div className={"chat-audio-recorder " + (small ? 'small' : '')}>
        <ReactMic
          className="sound-wave"
          record={isAudioRecording}
          onStop={::this.handleAudioUploadRecord}
          strokeColor="#000000"
          backgroundColor="#eee"
        />
        <div className="audio-controls">
          <div className="control-wrapper">
            <div
              className="close-button control"
              onClick={handleAudioRecorderToggle}
              title="Close"
            >
              <FontAwesomeIcon icon="times" size="2x" />
            </div>
            <span>Close</span>
          </div>
          {
            !isAudioRecording
              ?
              <div className="control-wrapper">
                <div
                  className="play-button control"
                  onClick={::this.handleStartAudioRecording}
                  title="Start Recording"
                >
                  <FontAwesomeIcon icon="circle" size="2x" />
                </div>
                <span>Start</span>
              </div>
              :
              <div className="control-wrapper">
                <div
                  className="stop-button control"
                  onClick={::this.handleStopAudioRecording}
                  title="Start Recording"
                >
                  <FontAwesomeIcon icon="stop" size="2x" />
                </div>
                <span>Stop</span>
              </div>
          }
          <div className="control-wrapper">
            <div
              className={"send-button control " + (isAudioRecording ? 'active' : '')}
              onClick={(e) => {isAudioRecording ? ::this.handleSendAudioMessageOnClick(e) : false}}
              title="Send"
            >
              <FontAwesomeIcon icon="check" size="2x" />
            </div>
            <span>Send</span>
          </div>
        </div>
      </div>
    )
  }
}

ChatAudioRecorder.propTypes = {
  chatRoomID: PropTypes.string.isRequired,
  handleAudioRecorderToggle: PropTypes.func.isRequired,
  handleSendAudioMessage: PropTypes.func.isRequired,
  small: PropTypes.bool,
}

ChatAudioRecorder.defaultProps = {
  small: false,
}

export default ChatAudioRecorder;
