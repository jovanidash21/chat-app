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

class MuteChatRoomModal extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.chatRoom.mute.loading && this.props.chatRoom.mute.success ) {
      this.props.handleCloseModal();
    }
  }
  handleMuteChatRoom(event) {
    event.preventDefault();

    const {
      user,
      chatRoom,
      muteChatRoom
    } = this.props;
    const activeUser = user.active;
    const activeChatRoom = chatRoom.active;

    muteChatRoom(activeUser._id, activeChatRoom.data._id);
  }
  render() {
    const {
      chatRoom,
      isModalOpen,
      handleCloseModal
    } = this.props;

    return (
      <Modal
        className="mute-message-modal"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      >
        <Form onSubmit={::this.handleMuteChatRoom}>
          <Modal.Header>
            <h3 className="modal-title">Mute Chat Room</h3>
          </Modal.Header>
          <Modal.Body>
            <p>Muting will turn off popup notifications from this chat room</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="button button-default"
              onClick={handleCloseModal}
              disabled={chatRoom.mute.loading}
            >
              Cancel
            </Button>
            <Button
              className="button button-primary"
              type="submit"
              disabled={chatRoom.mute.loading}
            >
              Mute
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

MuteChatRoomModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired
}

MuteChatRoomModal.defaultProps = {
  isModalOpen: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MuteChatRoomModal);
