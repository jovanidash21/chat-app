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

class DeleteUserModal extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.user.isDeleting && this.props.user.isDeletingSuccess ) {
      this.props.handleCloseModal();
    }
  }
  handleDeleteUser(event) {
    event.preventDefault();

    const {
      user,
      deleteUser
    } = this.props;
    const selectedUser = user.selected;

    deleteUser(selectedUser.id);
  }
  render() {
    const {
      user,
      isModalOpen,
      handleCloseModal
    } = this.props;
    const selectedUser = user.selected;

    return (
      <Modal
        className="delete-user-modal"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      >
        <Form onSubmit={::this.handleDeleteUser}>
          <Modal.Header>
            <h3 className="modal-title">Delete User</h3>
          </Modal.Header>
          <Modal.Body>
            {
              !user.isDeleting &&
              !user.isDeletingSuccess &&
              <Alert label="Error! Please try again" />
            }
            <div className="avatar-wrapper">
              <Avatar
                image={selectedUser.image}
                size="100px"
                title={selectedUser.name}
                accountType={selectedUser.accountType}
                badgeBigger
                badgeCloser
              />
            </div>
            <p>
              <span className="user-name mui--text-danger">{selectedUser.name}</span>&nbsp;
              will be deleted. This will permanently delete all of his/her
              messages including all the private/direct chat rooms.
            </p>
            <p>This action cannot be undone. Are you sure you want to delete this user?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="button button-default"
              onClick={handleCloseModal}
              disabled={user.isDeleting}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              type="submit"
              disabled={user.isDeleting}
            >
              Yes, Delete User
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

DeleteUserModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired
}

DeleteUserModal.defaultProps = {
  isModalOpen: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteUserModal);
