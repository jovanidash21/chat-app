import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Button
} from 'muicss/react';
import mapDispatchToProps from '../../../actions';
import { Modal } from '../../../../components/Modal';
import { Alert } from '../../../../components/Alert';

class MuteUnmuteChatRoomModal extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if (
      ( prevProps.chatRoom.mute.loading && this.props.chatRoom.mute.success ) ||
      ( prevProps.chatRoom.unmute.loading && this.props.chatRoom.unmute.success  )
    ) {
      this.props.handleCloseModal();
    }
  }
  handleMuteUnmuteChatRoom(event) {
    event.preventDefault();

    const {
      user,
      chatRoom,
      muteChatRoom,
      unmuteChatRoom
    } = this.props;
    const activeUser = user.active;
    const activeChatRoom = chatRoom.active;
    const isMuted = activeChatRoom.mute.data;

    if ( !isMuted ) {
      muteChatRoom(activeUser._id, activeChatRoom.data._id);
    } else {
      unmuteChatRoom(activeUser._id, activeChatRoom.data._id);
    }
  }
  render() {
    const {
      chatRoom,
      isModalOpen,
      handleCloseModal
    } = this.props;
    const activeChatRoom = chatRoom.active;
    const isMuted = activeChatRoom.mute.data;

    return (
      <Modal
        className="mute-message-modal"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      >
        <Form onSubmit={::this.handleMuteUnmuteChatRoom}>
          <Modal.Header>
            <h3 className="modal-title">{!isMuted ? 'Mute' : 'Unmute'} Chat Room</h3>
          </Modal.Header>
          <Modal.Body>
            <p>
              {
                !isMuted
                  ? 'Muting will turn off popup notifications from this chat room'
                  : 'Unmuting will turn on popup notifications from this chat room'
              }
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="button button-default"
              onClick={handleCloseModal}
              disabled={chatRoom.mute.loading || chatRoom.unmute.loading}
            >
              Cancel
            </Button>
            <Button
              className="button button-primary"
              type="submit"
              disabled={chatRoom.mute.loading || chatRoom.unmute.loading}
            >
              {!isMuted ? 'Mute' : 'Unmute'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom
  }
}

MuteUnmuteChatRoomModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired
}

MuteUnmuteChatRoomModal.defaultProps = {
  isModalOpen: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MuteUnmuteChatRoomModal);
