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
  handleBlockUser(event) {
    event.preventDefault();
  }
  render() {
    const {
      open,
      selectedUser,
      handleCloseModal,
    } = this.props;

    return (
      <Modal
        className="block-unblock-user-modal"
        open={open}
        onClose={handleCloseModal}
      >
        <Form>
          <Modal.Header>
            <h3 className="modal-title">Block User</h3>
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
              will be blocked. This user will not be able to send you a message.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="button button-default"
              onClick={handleCloseModal}
              disabled={false}
            >
              Cancel
            </Button>
            <Button
              className="button button-primary"
              onClick={::this.handleBlockUser}
              disabled={false}
            >
              Block User
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

BlockUnblockUserModal.propTypes = {
  open: PropTypes.bool,
  selectedUser: PropTypes.object.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
}

BlockUnblockUserModal.defaultProps = {
  open: false,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockUnblockUserModal);
