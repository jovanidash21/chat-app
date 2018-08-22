import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Panel,
  Form,
  Input,
  Select,
  Option,
  Button
} from 'muicss/react';
import Popup from 'react-popup';
import mapDispatchToProps from '../../../actions';
import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import {
  PasswordInput,
  AvatarUploader
} from '../../../components/Form';
import './styles.scss';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isDisabled: false,
      username: '',
      name: '',
      email: '',
      role: 'ordinary',
      password: '',
      profilePicture: ''
    };
  }
  componentWillMount() {
    if ( this.props.mode === 'create' ) {
      this.setState({
        isLoading: false
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.upload.isUploadingImage &&
      !this.props.upload.isUploadingImage &&
      this.props.upload.isUploadingImageSuccess
    ) {
      this.setState({
        profilePicture: this.props.upload.imageLink
      });
    }

    if ( this.props.mode === 'create' ) {
      if (
        prevProps.user.isCreating &&
        !this.props.user.isCreating &&
        this.props.user.isCreatingSuccess
      ) {
        this.setState({
          username: '',
          name: '',
          email: '',
          role: 'ordinary',
          password: '',
          profilePicture: ''
        });
      }

      if ( !prevProps.user.isCreating && this.props.user.isCreating ) {
        this.setState({
          isDisabled: true
        });
      }

      if (
        prevProps.user.isCreating &&
        !this.props.user.isCreating
      ) {
        this.setState({
          isDisabled: false
        });
      }
    }

    if ( this.props.mode === 'edit' ) {
      if (
        prevProps.user.isFetchingSelected &&
        !this.props.user.isFetchingSelected
      ) {
        ::this.handleDisplayeSelectedUser();
      }

      if ( !prevProps.user.isEditing && this.props.user.isEditing ) {
        this.setState({
          isDisabled: true
        });
      }

      if (
        prevProps.user.isEditing &&
        !this.props.user.isEditing
      ) {
        this.setState({
          isDisabled: false
        });
      }
    }
  }
  handleUserFormRender() {
    const {
      user,
      mode
    } = this.props;
    const {
      isLoading,
      isDisabled,
      username,
      name,
      email,
      role,
      password
    } = this.state;

    if ( !isLoading ) {
      return (
        <div>
          <Input
            value={username}
            label="Username"
            type="text"
            name="username"
            autoComplete="off"
            floatingLabel={true}
            required={true}
            onChange={::this.handleChange}
            disabled={isDisabled}
          />
          <Input
            value={name}
            label="Name"
            type="text"
            name="name"
            autoComplete="off"
            floatingLabel={true}
            required={true}
            onChange={::this.handleChange}
            disabled={isDisabled}
          />
          <Input
            value={email}
            label="Email"
            type="email"
            name="email"
            autoComplete="off"
            floatingLabel={true}
            required={true}
            onChange={::this.handleChange}
            disabled={isDisabled}
          />
          <Select
            value={role}
            label="Role"
            name="role"
            onChange={::this.handleChange}
            disabled={isDisabled}
          >
            <Option value="ordinary" label="Ordinary" />
            <Option value="admin" label="Admin" />
          </Select>
          {
            mode === 'create' &&
            <PasswordInput
              value={password}
              handleChange={::this.handleChange}
              handleGeneratePassword={::this.handleGeneratePassword}
              isDisabled={isDisabled}
            />
          }
          <Button
            className="button button-primary"
            type="submit"
            disabled={isDisabled}
          >
            {
              mode === 'create'
                ? 'Create User'
                : 'Update User'
            }
          </Button>
        </div>
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="black" />
      )
    }
  }
  handleAvatarUploadRender() {
    const { user } = this.props;
    const {
      isLoading,
      name,
      profilePicture
    } = this.state;
    const selectedUser = user.selected;

    if ( !isLoading ) {
      return (
        <AvatarUploader
          imageLink={profilePicture}
          name={name}
          accountType={selectedUser.accountType}
          handleImageUpload={::this.handleImageUpload}
        />
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="black" />
      )
    }
  }
  handleDisplayeSelectedUser() {
    const {
      user,
      mode
    } = this.props;

    if ( mode === 'edit' ) {
      const selectedUser = user.selected;

      this.setState({
        isLoading: false,
        username: selectedUser.username,
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        profilePicture: selectedUser.profilePicture
      });
    }
  }
  handleChange(event) {
    event.preventDefault();

    this.setState({[event.target.name]: event.target.value});
  }
  handleGeneratePassword(password) {
    this.setState({password: password});
  }
  handleImageUpload(image) {
    const { uploadImage } = this.props;

    if ( image.type.indexOf('image/') === -1 ) {
      Popup.alert('Please select an image file');
    } else if ( image.size > 1024 * 1024 * 2 ) {
      Popup.alert('Maximum upload file size is 2MB only');
    } else {
      uploadImage(image);
    }
  }
  handleSubmitUserForm(event) {
    event.preventDefault();

    const { mode } = this.props;

    switch(mode) {
      case 'create':
        ::this.handleCreateUser();
        break;
      case 'edit':
        ::this.handleEditUser();
        break;
      default:
        break;
    }
  }
  handleCreateUser() {
    const { createUser } = this.props;
    const {
      username,
      name,
      email,
      role,
      password,
      profilePicture
    } = this.state;

    createUser(
      username,
      name,
      email,
      role,
      password,
      profilePicture
    );
  }
  handleEditUser() {
    const {
      user,
      editUser
    } = this.props;
    const {
      username,
      name,
      email,
      role,
      profilePicture
    } = this.state;
    const selectedUser = user.selected;

    editUser(
      selectedUser._id,
      username,
      name,
      email,
      role,
      profilePicture
    );
  }
  render() {
    return (
      <div className="user-form">
        <Form onSubmit={::this.handleSubmitUserForm}>
          <Row>
            <Col md="8">
              <Panel>
                {::this.handleUserFormRender()}
              </Panel>
            </Col>
            <Col md="4">
              <Panel>
                {::this.handleAvatarUploadRender()}
              </Panel>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    upload: state.upload
  }
}

UserForm.propTypes = {
  mode: PropTypes.string
}

UserForm.defaultProps = {
  mode: 'create'
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
