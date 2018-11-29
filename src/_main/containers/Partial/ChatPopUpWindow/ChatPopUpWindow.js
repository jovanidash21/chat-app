import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuidv4 from 'uuid/v4';
import mapDispatchToProps from '../../../actions';
import './styles.scss';

class ChatPopUpWindow extends Component {
  constructor(props) {
    super(props);
  }
  handleActiveChatPopUpWindow(event) {
    event.preventDefault();

    const {
      index,
      handleActiveChatPopUpWindow
    } = this.props;

    handleActiveChatPopUpWindow(index);
  }
  render() {
    const { active } = this.props;

    return (
      <Draggable bounds="parent" handle=".popup-header">
        <div
          className={"chat-popup-window " + (active ? 'active' : '')}
          onClick={::this.handleActiveChatPopUpWindow}
        >
          <div className="popup-header">
            <div className="chat-room-name">
              Chat Room Name
            </div>
            <div className="close-icon">
              <FontAwesomeIcon icon="times" />
            </div>
          </div>
          <div className="popup-body">

          </div>
          <div className="popup-footer">

          </div>
        </div>
      </Draggable>
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

ChatPopUpWindow.propTypes = {
  index: PropTypes.number.isRequired,
  handleActiveChatPopUpWindow: PropTypes.func.isRequired,
  active: PropTypes.bool
}

ChatPopUpWindow.defaultProps = {
  active: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPopUpWindow);
