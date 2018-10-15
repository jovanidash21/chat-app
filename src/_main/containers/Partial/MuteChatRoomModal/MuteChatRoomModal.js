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
  render() {
    const {
      isModalOpen,
      handleCloseModal
    } = this.props;

    return (
      <Modal
        className="mute-message-modal"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      >
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
          >
            Cancel
          </Button>
          <Button className="button button-primary">
            Mute
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
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
