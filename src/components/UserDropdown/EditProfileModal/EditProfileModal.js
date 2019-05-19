import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
} from 'muicss/react';
import Popup from 'react-popup';
import { isEmailValid } from '../../../utils/form';
import { Modal } from '../../Modal';
import { Alert } from '../../Alert';
import {
  AvatarUploader,
  Input,
} from '../../Form';
import './styles.scss';

class EditProfileModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      name: '',
      email: '',
      profilePicture: '',
      usernameValid: true,
      nameValid: true,
      emailValid: true,
      errorMessage: '',
      successMessage: '',
    };
  }
  componentWillMount() {
    ::this.handleUserDetails();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.upload.image.loading &&
      !this.props.upload.image.loading &&
      this.props.upload.image.success
    ) {
      this.setState({profilePicture: this.props.upload.imageLink});
    }

    if ( ! prevProps.userEdit.loading && this.props.userEdit.loading ) {
      this.setState({
        errorMessage: '',
        successMessage: ''
      });
    }

    if ( prevProps.userEdit.loading && ! this.props.userEdit.loading ) {
      if ( this.props.userEdit.error ) {
        this.setState({
          errorMessage: this.props.userEdit.message,
          successMessage: ''
        });
      } else if ( this.props.userEdit.success ) {
        this.setState({
          errorMessage: '',
          successMessage: this.props.userEdit.message
        });
      }
    }
  }
  handleUserDetails() {
    const { user } = this.props;

    this.setState({
      username: user.username,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  }
  handleImageUpload(image) {
    const { handleImageUpload } = this.props;

    if ( image.type.indexOf('image/') === -1 ) {
      Popup.alert('Please select an image file');
    } else if ( image.size > 1024 * 1024 * 2 ) {
      Popup.alert('Maximum upload file size is 2MB only');
    } else {
      handleImageUpload(image);
    }
  }
  handleRemoveImage() {
    this.setState({profilePicture: ''});
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
    } = this.state;
    let usernameValid = true;
    let nameValid = true;
    let emailValid = true;
    let errorMessage = '';

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
      errorMessage: errorMessage,
    });

    if ( usernameValid && nameValid && emailValid && errorMessage.length === 0 ) {
      ::this.handleEditProfile();
    }
  }
  handleEditProfile() {
    const { handleEditProfile } = this.props;
    const {
      username,
      name,
      email,
      profilePicture,
    } = this.state;

    handleEditProfile(username, name, email, profilePicture);
  }
  render() {
    const {
      user,
      userEdit,
      open,
      onClose,
    } = this.props;
    const {
      username,
      name,
      email,
      profilePicture,
      usernameValid,
      nameValid,
      emailValid,
      errorMessage,
      successMessage,
    } = this.state;
    const isLocalUser = user.accountType === 'local';

    return (
      <Modal
        className="edit-profile-modal"
        open={open}
        onClose={onClose}
      >
        <Form>
          <Modal.Header>
            <h3 className="modal-title">{isLocalUser ? 'Edit ' : ''}Profile</h3>
          </Modal.Header>
          <Modal.Body>
            {
              errorMessage.length > 0 &&
              <Alert label={errorMessage} type="danger" />
            }
            {
              errorMessage.length === 0 && successMessage.length > 0 &&
              <Alert label={successMessage} type="success" />
            }
            <div className="avatar-wrapper">
              <AvatarUploader
                imageLink={profilePicture}
                name={name}
                roleChatType={user.role}
                accountType={user.accountType}
                handleImageUpload={::this.handleImageUpload}
                handleRemoveImage={::this.handleRemoveImage}
                disabled={userEdit.loading}
              />
            </div>
            {
              isLocalUser &&
              <Input
                value={username}
                label="Username"
                type="text"
                name="username"
                onChange={::this.onInputChange}
                disabled={userEdit.loading}
                invalid={!usernameValid}
              />
            }
            <Input
              value={name}
              label="Name"
              type="text"
              name="name"
              onChange={::this.onInputChange}
              disabled={userEdit.loading || !isLocalUser}
              invalid={!nameValid}
            />
            <Input
              value={email}
              label="Email"
              type="text"
              name="email"
              onChange={::this.onInputChange}
              disabled={userEdit.loading || !isLocalUser}
              invalid={!emailValid}
            />
          </Modal.Body>
          {
            isLocalUser &&
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
          }
        </Form>
      </Modal>
    );
  }
}

EditProfileModal.propTypes = {
  user: PropTypes.object.isRequired,
  upload: PropTypes.object.isRequired,
  handleImageUpload: PropTypes.func.isRequired,
  handleEditProfile: PropTypes.func.isRequired,
  userEdit: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

EditProfileModal.defaultProps = {
  open: false,
}

export default EditProfileModal;
