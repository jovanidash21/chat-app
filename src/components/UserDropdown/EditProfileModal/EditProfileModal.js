import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button
} from 'muicss/react';
import { Modal } from '../../Modal';
import { Input } from '../../Form';
import './styles.scss';

class EditProfileModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      disabled: false,
      username: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      profilePicture: ''
    };
  }
  onInputChange(event) {
    event.preventDefault();

    this.setState({[event.target.name]: event.target.value});
  }
  handleEditProfile(event) {
    event.preventDefault();

    const { handleEditProfile } = this.props;

    handleEditProfile();
  }
  render() {
    const {
      userEdit,
      open,
      onClose
    } = this.props;
    const {
      loading,
      disabled,
      username,
      name,
      email,
      password,
      confirmPassword,
      profilePicture
    } = this.state;

    return (
      <Modal
        className="edit-profile-modal"
        open={open}
        onClose={onClose}
      >
        <Form>
          <Modal.Header>
            <h3 className="modal-title">Edit Profile</h3>
          </Modal.Header>
          <Modal.Body>
            {
              userEdit.error &&
              <Alert label={userEdit.message} />
            }
            <Input
              value={username}
              label="Username"
              type="text"
              name="username"
              onChange={::this.onInputChange}
              disabled={disabled}
            />
            <Input
              value={name}
              label="Name"
              type="text"
              name="name"
              onChange={::this.onInputChange}
              disabled={disabled}
            />
            <Input
              value={email}
              label="Email"
              type="email"
              name="email"
              onChange={::this.onInputChange}
              disabled={disabled}
            />
            <Input
              value={password}
              label="Password"
              type="password"
              name="password"
              onChange={::this.onInputChange}
              disabled={disabled}
            />
            <Input
              value={confirmPassword}
              label="Confirm Passsword"
              type="password"
              name="confirm_password"
              onChange={::this.onInputChange}
              disabled={disabled}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="button button-default"
              onClick={onClose}
              disabled={userEdit.loading}
            >
              Cancel
            </Button>
            <Button
              className="button button-primary"
              onClick={::this.handleEditProfile}
              disabled={userEdit.loading}
            >
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

EditProfileModal.propTypes = {
  handleEditProfile: PropTypes.func.isRequired,
  userEdit: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
}

EditProfileModal.defaultProps = {
  open: false,
}

export default EditProfileModal;
