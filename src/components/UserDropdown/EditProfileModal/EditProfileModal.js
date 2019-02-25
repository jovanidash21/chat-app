import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button
} from 'muicss/react';
import { isEmailValid } from '../../../utils/form';
import { Modal } from '../../Modal';
import { Alert } from '../../Alert';
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
      profilePicture: '',
      usernameValid: true,
      nameValid: true,
      emailValid: true,
      passwordValid: true,
      confirmPasswordValid: true,
      errorMessage: ''
    };
  }
  onInputChange(event) {
    event.preventDefault();

    this.setState({[event.target.name]: event.target.value});
  }
  handleEditProfileValidation(event) {
    event.preventDefault();

    const {
      username,
      name,
      email,
      password,
      confirmPassword
    } = this.state;
    var usernameValid = true;
    var nameValid = true;
    var emailValid = true;
    var passwordValid = true;
    var confirmPasswordValid = true;
    var errorMessage = '';

    if ( username.trim().length === 0 ) {
      usernameValid = false;
    }

    if ( name.trim().length === 0 ) {
      nameValid = false;
    }

    if ( ! isEmailValid( email ) ) {
      emailValid = false;
    }

    if ( password.trim().length === 0 ) {
      passwordValid = false;
    }

    if ( password.trim().length > 0 && password !== confirmPassword ) {
      confirmPasswordValid = false;
    }

    if ( ! usernameValid || ! nameValid || ! passwordValid ) {
      errorMessage = 'All fields are required. Please check and try again.';
    } else if ( ! emailValid ) {
      errorMessage = 'Please enter a valid email address';
    } else if ( ! confirmPasswordValid ) {
      errorMessage = 'Password do not match';
    }

    this.setState({
      usernameValid: usernameValid,
      nameValid: nameValid,
      emailValid: emailValid,
      passwordValid: passwordValid,
      confirmPasswordValid: confirmPasswordValid,
      errorMessage: errorMessage
    });

    if ( usernameValid && nameValid && emailValid && passwordValid && confirmPasswordValid && errorMessage.length === 0 ) {
      ::this.handleEditProfile();
    }
  }
  handleEditProfile() {
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
      profilePicture,
      usernameValid,
      nameValid,
      emailValid,
      passwordValid,
      confirmPasswordValid,
      errorMessage
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
              invalid={!usernameValid}
            />
            <Input
              value={name}
              label="Name"
              type="text"
              name="name"
              onChange={::this.onInputChange}
              disabled={disabled}
              invalid={!nameValid}
            />
            <Input
              value={email}
              label="Email"
              type="email"
              name="email"
              onChange={::this.onInputChange}
              disabled={disabled}
              invalid={!emailValid}
            />
            <Input
              value={password}
              label="Password"
              type="password"
              name="password"
              onChange={::this.onInputChange}
              disabled={disabled}
              invalid={!passwordValid}
            />
            <Input
              value={confirmPassword}
              label="Confirm Passsword"
              type="password"
              name="confirm_password"
              onChange={::this.onInputChange}
              disabled={disabled}
              invalid={!confirmPasswordValid}
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
              onClick={::this.handleEditProfileValidation}
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
