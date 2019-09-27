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
    if (prevProps.message.delete.loading && this.props.message.delete.success) {
      this.props.onClose();
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

    if (selectedMessageID.length > 0) {
      deleteMessage(selectedMessageID, activeChatRoom.data._id);
    }
  }
  render() {
    const {
      message,
      open,
      onClose
    } = this.props;

    return (
      <Modal
        className="delete-message-modal"
        open={open}
        onClose={onClose}
        danger
      >
        <Form>
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
              onClick={onClose}
              disabled={message.delete.loading}
            >
              Cancel
            </Button>
            <Button
              className="button button-danger"
              onClick={::this.handleDeleteMessage}
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
    message: state.message,
  }
}

DeleteMessageModal.propTypes = {
  open: PropTypes.bool,
  selectedMessageID: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}

DeleteMessageModal.defaultProps = {
  open: false,
  selectedMessageID: '',
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteMessageModal);
