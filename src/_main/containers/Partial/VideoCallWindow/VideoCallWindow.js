import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import { isObjectEmpty } from '../../../../utils/object';
import './styles.scss';

class VideoCallWindow extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    ::this.handleLocalVideoSource();
  }
  componentDidUpdate() {
    if (!isObjectEmpty(this.props.remoteVideoSource) && !this.remoteVideo.srcObject) {
      this.remoteVideo.srcObject = this.props.remoteVideoSource;
    }
  }
  componentWillUnmount() {
    if (this.localVideo && this.localVideo.srcObject) {
      this.localVideo.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }
  handleLocalVideoSource() {
    const { localVideoSource } = this.props;

    if (!isObjectEmpty(localVideoSource) && !this.localVideo.srcObject) {
      this.localVideo.srcObject = localVideoSource;
    }
  }
  handleCancelRequestVideoCall(event) {
    const {
      videoCall,
      handleCancelRequestVideoCall
    } = this.props;
    const peerUser = videoCall.peerUser;

    handleCancelRequestVideoCall(peerUser._id);
  }
  handleEndVideoCall(event) {
    event.preventDefault();

    const {
      videoCall,
      handleEndVideoCall
    } = this.props;
    const peerUser = videoCall.peerUser;

    handleEndVideoCall(peerUser._id);
  }
  render() {
    const { videoCall } = this.props;
    const videoConstraints = {
      height: {
        min: 360,
        ideal: 720,
        max: 1080
      },
      facingMode: "user"
    };

    return (
      <div className="video-call-window">
        <video
          className="remote-video"
          ref={(element) => { this.remoteVideo = element; }}
          autoPlay
        />
        <video
          className="local-video"
          ref={(element) => { this.localVideo = element; }}
          autoPlay muted
        />
        <div className="video-call-controls">
          <div
            className="video-call-button end-call-button"
            title="Reject Video Call"
            onClick={
              !videoCall.active
                ? ::this.handleCancelRequestVideoCall
                : ::this.handleEndVideoCall
            }
          >
            <FontAwesomeIcon icon="phone" size="2x" />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    videoCall: state.videoCall
  }
}

VideoCallWindow.propTypes = {
  localVideoSource: PropTypes.object,
  remoteVideoSource: PropTypes.object,
  handleCancelRequestVideoCall: PropTypes.func.isRequired,
  handleEndVideoCall: PropTypes.func.isRequired
}

VideoCallWindow.defaultProps = {
  localVideoSource: {},
  remoteVideoSource: {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoCallWindow);
