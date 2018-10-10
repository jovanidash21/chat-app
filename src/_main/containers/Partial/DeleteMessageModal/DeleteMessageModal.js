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

class DeleteMessageModal extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.message.delete.loading && this.props.message.delete.success ) {
      this.props.handleCloseModal();
    }
  }
  handleDeleteMessage(event) {
    event.preventDefault();

    const {
      chatRoom,
      deleteMessage,
      selectedMessageID
    } = this.props;
    const activeChatRoom = chatRoom.active;

    if ( selectedMessageID.length > 0 ) {
      deleteMessage(selectedMessageID, activeChatRoom.data._id);
    }
  }
  render() {
    const {
      message,
      isModalOpen,
      handleCloseModal
    } = this.props;

    return (
      <Modal
        className="delete-message-modal"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        isDanger
      >
        <Form onSubmit={::this.handleDeleteMessage}>
          <Modal.Header>
            <h3 className="modal-title">Delete Message</h3>
          </Modal.Header>
          <Modal.Body>
            {
              message.delete.error &&
              <Alert label={message.delete.message} />
            }
            <p>This action cannot be undone. Are you sure you want to delete this message?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="button button-default"
              onClick={handleCloseModal}
              disabled={message.delete.loading}
            >
              Cancel
            </Button>
            <Button
              className="button button-danger"
              type="submit"
              disabled={message.delete.loading}
            >
              Yes, Delete Message
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chatRoom: state.chatRoom,
    message: state.message
  }
}

DeleteMessageModal.propTypes = {
  isModalOpen: PropTypes.bool,
  selectedMessageID: PropTypes.string,
  handleCloseModal: PropTypes.func.isRequired
}

DeleteMessageModal.defaultProps = {
  isModalOpen: false,
  selectedMessageID: ''
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteMessageModal);
