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
  handleAudioRecording(event) {
    event.preventDefault();

    this.setState({isAudioRecording: !this.state.isAudioRecording});
  }
  handleAudioUploadRecord(audio) {
    console.log(audio);
  }
  render() {
    const { handleAudioRecorderToggle } = this.props;
    const { isAudioRecording } = this.state;

    return (
      <div className="chat-audio-recorder">
        <ReactMic
          record={isAudioRecording}
          className="sound-wave"
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
                  onClick={::this.handleAudioRecording}
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
                  onClick={::this.handleAudioRecording}
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
              onClick={::this.handleAudioRecording}
              title="Send"
            >
              <FontAwesome name="paper-plane" size="2x" />
            </div>
            <span>Send</span>
          </div>
        </div>
      </div>
    )
  }
}

ChatAudioRecorder.propTypes = {
  handleAudioRecorderToggle: PropTypes.func.isRequired
}

export default ChatAudioRecorder;
