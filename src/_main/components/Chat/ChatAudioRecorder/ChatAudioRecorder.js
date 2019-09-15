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
      audioRecording: false,
      sendAudioClick: false,
    };
  }
  handleStartAudioRecording(event) {
    event.preventDefault();

    this.setState({
      audioRecording: true,
      sendAudioClick: false,
    });
  }
  handleStopAudioRecording(event) {
    event.preventDefault();

    this.setState({
      audioRecording: false,
      sendAudioClick: false,
    });
  }
  handleSendAudioMessageOnClick() {
    const { audioRecording } = this.state;

    if (audioRecording) {
      this.setState({
        audioRecording: false,
        sendAudioClick: true,
      });
    }
  }
  handleAudioUploadRecord(audio) {
    const {
      chatRoomID,
      handleSendAudioMessage,
    } = this.props;
    const { sendAudioClick } = this.state;
    const newMessageID = uuidv4();
    const audioName = 'voice message';

    if (sendAudioClick) {
      handleSendAudioMessage(newMessageID, audioName, audio, chatRoomID);
    }
  }
  render() {
    const {
      handleAudioRecorderToggle,
      small
    } = this.props;
    const { audioRecording } = this.state;

    return (
      <div className={"chat-audio-recorder " + (small ? 'small' : '')}>
        <ReactMic
          className="sound-wave"
          record={audioRecording}
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
            !audioRecording
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
              className={"send-button control " + (audioRecording ? 'active' : '')}
              onClick={(e) => {audioRecording ? ::this.handleSendAudioMessageOnClick(e) : false}}
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
