import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import {
  Form,
  Button
} from 'muicss/react';
import mapDispatchToProps from '../../../actions';
import Avatar from '../../../components/Avatar';
import Alert from '../../../components/Alert';
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
  handleDeleteUser() {
  }
  render() {
    const {
      user,
      isModalOpen,
      handleCloseModal
    } = this.props;
    const modalClassNames = {
      modal: "modal delete-user-modal",
      closeButton: "close-button"
    };
    const selectedUser = user.selected;

    return (
      <Modal
        classNames={modalClassNames}
        open={isModalOpen}
        onClose={handleCloseModal}
        center
      >
        <Form onSubmit={::this.handleDeleteUser}>
          <div className="modal-header">
            <h3 className="modal-title">Delete User</h3>
          </div>
          <div className="modal-body">
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
          </div>
          <div className="modal-footer">
            <Button
              className="button button-default"
              variant="raised"
              onClick={handleCloseModal}
              disabled={user.isDeleting}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              type="submit"
              variant="raised"
              disabled={user.isDeleting}
            >
              Yes, Delete User
            </Button>
          </div>
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
