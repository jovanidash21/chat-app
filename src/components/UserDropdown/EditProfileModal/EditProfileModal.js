import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button
} from 'muicss/react';
import { isEmailValid } from '../../../utils/form';
import { Modal } from '../../Modal';
import { Alert } from '../../Alert';
import { Avatar } from '../../Avatar';
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
      profilePicture: '',
      usernameValid: true,
      nameValid: true,
      emailValid: true,
      errorMessage: ''
    };
  }
  componentWillMount() {
    ::this.handleUserDetails();
  }
  handleUserDetails() {
    const { user } = this.props;

    this.setState({
      username: user.username,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture
    });
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
      email
    } = this.state;
    var usernameValid = true;
    var nameValid = true;
    var emailValid = true;
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

    if ( ! usernameValid || ! nameValid ) {
      errorMessage = 'All fields are required. Please check and try again.';
    } else if ( ! emailValid ) {
      errorMessage = 'Please enter a valid email address';
    }

    this.setState({
      usernameValid: usernameValid,
      nameValid: nameValid,
      emailValid: emailValid,
      errorMessage: errorMessage
    });

    if ( usernameValid && nameValid && emailValid && errorMessage.length === 0 ) {
      ::this.handleEditProfile();
    }
  }
  handleEditProfile() {
    const { handleEditProfile } = this.props;

    handleEditProfile();
  }
  render() {
    const {
      user,
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
      profilePicture,
      usernameValid,
      nameValid,
      emailValid,
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
            <div className="avatar-wrapper">
              <Avatar
                image={user.profilePicture}
                size="100px"
                name={user.name}
                roleChatType={user.role}
                accountType={user.accountType}
                badgeBigger
                badgeCloser
              />
            </div>
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
  user: PropTypes.object.isRequired,
  handleEditProfile: PropTypes.func.isRequired,
  userEdit: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
}

EditProfileModal.defaultProps = {
  open: false,
}

export default EditProfileModal;
