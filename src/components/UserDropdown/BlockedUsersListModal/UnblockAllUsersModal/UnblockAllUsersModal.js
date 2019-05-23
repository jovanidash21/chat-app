import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Button
} from 'muicss/react';
import { Modal } from '../../../Modal';
import { Alert } from '../../../Alert';

class UnblockAllUsersModal extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.blockedUserUnblockAll.loading && this.props.blockedUserUnblockAll.success ) {
      this.props.onClose();
    }
  }
  handleUnblockAllUsers(event) {
    event.preventDefault();

    const { handleUnblockAllUsers } = this.props;

    handleUnblockAllUsers();
  }
  render() {
    const {
      blockedUserUnblockAll,
      open,
      onClose,
    } = this.props;

    return (
      <Modal
        className="unblock-all-users-modal"
        open={open}
        onClose={onClose}
        danger
      >
        <Form>
          <Modal.Header>
            <h3 className="modal-title">Unblock All Users</h3>
          </Modal.Header>
          <Modal.Body>
            {
              blockedUserUnblockAll.error &&
              <Alert label={blockedUserUnblockAll.message} />
            }
            <p>Are you sure you want to unblock all users?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="button button-default"
              onClick={onClose}
              disabled={blockedUserUnblockAll.loading}
            >
              Cancel
            </Button>
            <Button
              className="button button-danger"
              onClick={::this.handleUnblockAllUsers}
              disabled={blockedUserUnblockAll.loading}
            >
              Yes, Unblock All
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

UnblockAllUsersModal.propTypes = {
  handleUnblockAllUsers: PropTypes.func.isRequired,
  blockedUserUnblockAll: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

UnblockAllUsersModal.defaultProps = {
  open: false,
}

export default UnblockAllUsersModal;
