import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Button
} from 'muicss/react';
import mapDispatchToProps from '../../../actions';
import { Modal } from '../../../../components/Modal';
import { Avatar } from '../../../../components/Avatar';
import { Alert } from '../../../../components/Alert';
import './styles.scss';

class BlockUnblockUserModal extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if (
      (prevProps.blockedUser.block.loading && this.props.blockedUser.block.success) ||
      (prevProps.blockedUser.unblock.loading && this.props.blockedUser.unblock.success)
    ) {
      this.props.onClose();
    }
  }
  handleBlockUnblockUser(event) {
    event.preventDefault();

    const {
      user,
      blockUser,
      unblockUser,
      selectedUser,
    } = this.props;
    const activeUser = user.active;
    const isBlocked = selectedUser.blocked;

    if (!isBlocked) {
      blockUser(activeUser._id, selectedUser._id);
    } else {
      unblockUser(activeUser._id, selectedUser._id);
    }
  }
  render() {
    const {
      user,
      blockedUser,
      open,
      selectedUser,
      onClose,
    } = this.props;
    const isBlocked = selectedUser.blocked;

    return (
      <Modal
        className="block-unblock-user-modal"
        open={open}
        onClose={onClose}
      >
        <Form onSubmit={::this.handleBlockUnblockUser}>
          <Modal.Header>
            <h3 className="modal-title">{!isBlocked ? 'Block' : 'Unblock'} User</h3>
          </Modal.Header>
          <Modal.Body>
            <div className="avatar-wrapper">
              <Avatar
                image={selectedUser.profilePicture}
                size="100px"
                name={selectedUser.name}
                roleChatType={selectedUser.role}
                accountType={selectedUser.accountType}
                badgeBigger
                badgeCloser
              />
            </div>
            <p>
              <span className="user-name mui--text-danger">{selectedUser.name}</span>&nbsp;
              {
                ! isBlocked
                  ? 'will be blocked. This user will not be able to send you a message and view their messages.'
                  : 'will be unblocked. This user will now be able to send you a message and view their messages.'
              }
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="button button-default"
              onClick={onClose}
              disabled={blockedUser.block.loading || blockedUser.unblock.loading}
            >
              Cancel
            </Button>
            <Button
              className="button button-primary"
              type="submit"
              disabled={blockedUser.block.loading || blockedUser.unblock.loading}
            >
              {!isBlocked ? 'Block' : 'Unblock'}
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
    blockedUser: state.blockedUser,
  }
}

BlockUnblockUserModal.propTypes = {
  open: PropTypes.bool,
  selectedUser: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

BlockUnblockUserModal.defaultProps = {
  open: false,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockUnblockUserModal);
