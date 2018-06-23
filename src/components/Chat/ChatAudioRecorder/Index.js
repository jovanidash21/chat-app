import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import { ReactMic } from 'react-mic';
import FontAwesome from 'react-fontawesome';
import uuidv4 from 'uuid/v4';
import './styles.scss';

class ChatAudioRecorder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAudioRecording: false
    };
  }
  handleStartAudioRecording(event) {
    event.preventDefault();

    this.setState({isAudioRecording: true});
  }
  handleStopAudioRecording(event) {
    event.preventDefault();

    this.setState({isAudioRecording: false});
  }
  handleAudioUploadRecord(audio) {
    const { handleSendAudioMessage } = this.props;
    const newMessageID = uuidv4();
    const audioName = 'voice message';

    handleSendAudioMessage(newMessageID, audioName, audio.blob);
  }
  render() {
    const { handleAudioRecorderToggle } = this.props;
    const { isAudioRecording } = this.state;

    return (
      <div className="chat-audio-recorder">
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
              <FontAwesome name="times" size="2x" />
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
                  <FontAwesome name="circle" size="2x" />
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
                  <FontAwesome name="stop" size="2x" />
                </div>
                <span>Stop</span>
              </div>
          }
          <div className="control-wrapper">
            <div
              className="send-button control"
              onClick={::this.handleStopAudioRecording}
              title="Send"
            >
              <FontAwesome name="check" size="2x" />
            </div>
            <span>Send</span>
          </div>
        </div>
      </div>
    )
  }
}

ChatAudioRecorder.propTypes = {
  handleAudioRecorderToggle: PropTypes.func.isRequired,
  handleSendAudioMessage: PropTypes.func.isRequired
}

export default ChatAudioRecorder;
