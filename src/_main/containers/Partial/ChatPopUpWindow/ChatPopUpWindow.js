import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuidv4 from 'uuid/v4';
import mapDispatchToProps from '../../../actions';
import { handleChatRoomAvatarBadges } from '../../../../utils/avatar';
import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import { Avatar } from '../../../../components/Avatar';
import { ChatBox } from '../ChatBox';
import {
  ChatInput,
  ChatAudioRecorder
} from '../../../components/Chat';
import './styles.scss';

class ChatPopUpWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragDropBoxOpen: false
    };
  }
  handleActiveChatPopUpWindow(event) {
    event.preventDefault();

    const {
      index,
      handleActiveChatPopUpWindow
    } = this.props;

    handleActiveChatPopUpWindow(index);
  }
  handleClosePopUpChatRoom(event) {
    event.preventDefault();

    const {
      popUpChatRoom,
      closePopUpChatRoom
    } = this.props;

    closePopUpChatRoom(popUpChatRoom.data._id);
  }
  handleDragDropBoxToggle(openTheDragDropBox=false) {
    this.setState({isDragDropBoxOpen: openTheDragDropBox});
  }
  render() {
    const {
      index,
      user,
      popUpChatRoom,
      active
    } = this.props;
    const { isDragDropBoxOpe } = this.state;

    return (
      <Draggable bounds="parent" handle=".popup-header" onDrag={::this.handleActiveChatPopUpWindow}>
        <div className={"chat-popup-window " + (active ? 'active' : '')}>
          <div className="popup-header">
            <Avatar
              image={popUpChatRoom.data.chatIcon}
              name={popUpChatRoom.data.name}
              roleChatType={handleChatRoomAvatarBadges(popUpChatRoom.data, user, 'role-chat')}
              accountType={handleChatRoomAvatarBadges(popUpChatRoom.data, user)}
            />
            <div className="chat-room-name">
              {popUpChatRoom.data.name}
              {
                popUpChatRoom.data.chatType === 'private' &&
                <span className="you-label">(you)</span>
              }
            </div>
            <div className="close-icon" onClick={::this.handleClosePopUpChatRoom}>
              <FontAwesomeIcon icon="times" />
            </div>
          </div>
          <div className="popup-body">
            <ChatBox
              chatRoom={popUpChatRoom}
              message={popUpChatRoom.message}
              handleDragDropBoxToggle={(::this.handleDragDropBoxToggle)}
              isDragDropBoxOpen={isDragDropBoxOpen}
              loading={popUpChatRoom.message.fetchNew.loading}
              small
            />
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
  popUpChatRoom: PropTypes.object.isRequired,
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
