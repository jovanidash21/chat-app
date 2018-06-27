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
      isAudioRecording: false,
      isSendAudioClick: false
    };
  }
  handleStartAudioRecording(event) {
    event.preventDefault();

    this.setState({
      isAudioRecording: true,
      isSendAudioClick: false
    });
  }
  handleStopAudioRecording(event) {
    event.preventDefault();

    this.setState({
      isAudioRecording: false,
      isSendAudioClick: false
    });
  }
  handleSendAudioMessageOnClick() {
    const { isAudioRecording } = this.state;

    if ( isAudioRecording ) {
      this.setState({
        isAudioRecording: false,
        isSendAudioClick: true
      });
    }
  }
  handleAudioUploadRecord(audio) {
    const { handleSendAudioMessage } = this.props;
    const { isSendAudioClick } = this.state;
    const newMessageID = uuidv4();
    const audioName = 'voice message';

    if ( isSendAudioClick ) {
      handleSendAudioMessage(newMessageID, audioName, audio.blob);
    }
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
              className={"send-button control " + (isAudioRecording ? 'active' : '')}
              onClick={(e) => { isAudioRecording ? ::this.handleSendAudioMessageOnClick(e) : false}}
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
