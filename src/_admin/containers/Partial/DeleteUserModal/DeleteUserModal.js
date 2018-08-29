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
import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import './styles.scss';

class DeleteUserModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.user.isFetchingSelected && !this.props.user.isFetchingSelected ) {
      this.setState({
        isLoading: false
      });
    }

    if ( prevProps.user.isDeleting && this.props.user.isDeletingSuccess ) {
      this.props.handleCloseModal();
    }
  }
  handleDeleteUserFormRender() {
    const {
      user,
      isModalOpen,
      handleCloseModal
    } = this.props;
    const { isLoading } = this.state;
    const selectedUser = user.selected;

    if ( !isLoading ) {
      return (
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
                image={selectedUser.profilePicture}
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
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="black" />
      )
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
      isModalOpen,
      handleCloseModal
    } = this.props;

    return (
      <Modal
        className="delete-user-modal"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      >
        {::this.handleDeleteUserFormRender()}
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