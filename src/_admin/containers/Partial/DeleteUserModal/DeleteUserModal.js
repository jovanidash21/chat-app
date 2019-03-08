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

    this.state = {
      loading: true
    };
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.user.fetchSelect.loading && !this.props.user.fetchSelect.loading ) {
      this.setState({
        loading: false
      });
    }

    if ( prevProps.user.delete.loading && this.props.user.delete.success ) {
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

    deleteUser(selectedUser._id);
  }
  render() {
    const {
      user,
      isModalOpen,
      handleCloseModal
    } = this.props;
    const { loading } = this.state;
    const selectedUser = user.selected;

    return (
      <Modal
        className="delete-user-modal"
        open={isModalOpen}
        onClose={handleCloseModal}
        danger
        loading={loading}
      >
        <Form onSubmit={::this.handleDeleteUser}>
          <Modal.Header>
            <h3 className="modal-title">Delete User</h3>
          </Modal.Header>
          <Modal.Body>
            {
              user.delete.error &&
              <Alert label={user.delete.message} />
            }
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
              will be deleted. This will permanently delete all of his/her
              messages including all the private/direct chat rooms.
            </p>
            <p>This action cannot be undone. Are you sure you want to delete this user?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="button button-default"
              onClick={handleCloseModal}
              disabled={user.delete.loading}
            >
              Cancel
            </Button>
            <Button
              className="button button-danger"
              type="submit"
              disabled={user.delete.loading}
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
