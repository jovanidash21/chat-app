import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Button,
} from 'muicss/react';
import { Modal } from '../../Modal';
import { Skeleton } from '../../Skeleton';
import { Avatar } from '../../Avatar';
import { Alert } from '../../Alert';
import './styles.scss';

class BlockedUsersListModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      open,
      onClose,
    } = this.props;

    return (
      <Modal
        className="block-unblock-user-modal"
        open={open}
        onClose={onClose}
      >
        <Modal.Header>
          <h3 className="modal-title">Blocked Users</h3>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
      </Modal>
    )
  }
}

BlockedUsersListModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

BlockedUsersListModal.defaultProps = {
  open: false,
}

export default BlockedUsersListModal;
