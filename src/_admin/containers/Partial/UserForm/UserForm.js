import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Panel,
  Form,
  Select,
  Option,
  Button,
} from 'muicss/react';
import Popup from 'react-popup';
import mapDispatchToProps from '../../../actions';
import { isEmailValid } from '../../../../utils/form';
import { Alert } from '../../../../components/Alert';
import { Skeleton } from '../../../../components/Skeleton';
import {
  Input,
  AvatarUploader,
} from '../../../../components/Form';
import { PasswordInput } from '../../../components/Form';
import './styles.scss';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      disabled: false,
      username: '',
      name: '',
      email: '',
      role: 'ordinary',
      password: '',
      profilePicture: '',
      usernameValid: true,
      nameValid: true,
      emailValid: true,
      passwordValid: true,
      errorMessage: '',
    };
  }
  componentWillMount() {
    if (this.props.mode === 'create') {
      this.setState({loading: false});
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.upload.image.loading &&
      !this.props.upload.image.loading &&
      this.props.upload.image.success
    ) {
      this.setState({profilePicture: this.props.upload.imageLink});
    }

    if (this.props.mode === 'create') {
      if (
        prevProps.user.create.loading &&
        !this.props.user.create.loading &&
        this.props.user.create.success
      ) {
        this.setState({
          username: '',
          name: '',
          email: '',
          role: 'ordinary',
          password: '',
          profilePicture: '',
        });
      }

      if (
        !prevProps.user.create.loading &&
        this.props.user.create.loading
      ) {
        this.setState({disabled: true});
      }

      if (
        prevProps.user.create.loading &&
        !this.props.user.create.loading
      ) {
        this.setState({disabled: false});
      }
    }

    if ( this.props.mode === 'edit' ) {
      if (
        prevProps.user.fetchSelect.loading &&
        !this.props.user.fetchSelect.loading
      ) {
        ::this.handleDisplayeSelectedUser();
      }

      if (
        !prevProps.user.edit.loading &&
        this.props.user.edit.loading
      ) {
        this.setState({disabled: true});
      }

      if (
        prevProps.user.edit.loading &&
        !this.props.user.edit.loading
      ) {
        this.setState({disabled: false});
      }
    }
  }
  handleDisplayeSelectedUser() {
    const {
      user,
      mode,
    } = this.props;

    if (mode === 'edit') {
      const selectedUser = user.selected;

      this.setState({
        loading: false,
        username: selectedUser.username,
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        profilePicture: selectedUser.profilePicture,
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

    if (image.type.indexOf('image/') === -1) {
      Popup.alert('Please select an image file');
    } else if (image.size > 1024 * 1024 * 2) {
      Popup.alert('Maximum upload file size is 2MB only');
    } else {
      uploadImage(image);
    }
  }
  handleRemoveImage() {
    this.setState({profilePicture: ''});
  }
  handleUserFormValidation(event) {
    event.preventDefault();

    const { mode } = this.props;
    const {
      username,
      name,
      email,
      role,
      password,
    } = this.state;
    let usernameValid = true;
    let nameValid = true;
    let emailValid = true;
    let passwordValid = true;
    let errorMessage = '';

    if (username.trim().length === 0) {
      usernameValid = false;
    }

    if (name.trim().length === 0) {
      nameValid = false;
    }

    if (!isEmailValid(email)) {
      emailValid = false;
    }

    if (mode === 'create' && password.trim().length === 0) {
      passwordValid = false;
    }

    if (!usernameValid || !nameValid || !passwordValid) {
      errorMessage = 'All fields are required. Please check and try again.';
    } else if (!emailValid) {
      errorMessage = 'Please enter a valid email address';
    }

    this.setState({
      usernameValid: usernameValid,
      nameValid: nameValid,
      emailValid: emailValid,
      passwordValid: passwordValid,
      errorMessage: errorMessage,
    });

    if (usernameValid && nameValid && emailValid && passwordValid && errorMessage.length === 0) {
      ::this.handleSubmitUserForm();
    }
  }
  handleSubmitUserForm() {
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
      profilePicture,
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
      profilePicture,
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
    const {
      user,
      mode,
      successMessage,
    } = this.props;
    const {
      loading,
      disabled,
      username,
      name,
      email,
      role,
      password,
      profilePicture,
      usernameValid,
      nameValid,
      emailValid,
      passwordValid,
    } = this.state;
    const selectedUser = user.selected;
    let errorMessage = this.props.errorMessage;

    if (this.state.errorMessage.length > 0) {
      errorMessage = this.state.errorMessage;
    }

    return (
      <div className="user-form">
        <Container fluid>
          <Row>
            <Col xs="12">
              {
                errorMessage.length > 0 &&
                <Alert label={errorMessage} type="danger" />
              }
              {
                errorMessage.length === 0 && successMessage.length > 0 &&
                <Alert label={successMessage} type="success" />
              }
            </Col>
            <Col xs="12">
              <Form onSubmit={::this.handleUserFormValidation}>
                <Row>
                  <Col md="8">
                    <Panel>
                      {
                        loading
                          ?
                          <Fragment>
                            {
                              Array.from(Array(4).keys()).map((i) =>
                                <Skeleton
                                  key={i}
                                  className="mui-textfield"
                                  height="47px"
                                  width="100%"
                                />
                              )
                            }
                          </Fragment>
                          :
                          <Fragment>
                            <Input
                              value={username}
                              label="Username"
                              type="text"
                              name="username"
                              onChange={::this.handleChange}
                              disabled={disabled}
                              invalid={!usernameValid}
                            />
                            <Input
                              value={name}
                              label="Name"
                              type="text"
                              name="name"
                              onChange={::this.handleChange}
                              disabled={disabled}
                              invalid={!nameValid}
                            />
                            <Input
                              value={email}
                              label="Email"
                              type="text"
                              name="email"
                              onChange={::this.handleChange}
                              disabled={disabled}
                              invalid={!emailValid}
                            />
                            <Select
                              value={role}
                              label="Role"
                              name="role"
                              onChange={::this.handleChange}
                              disabled={disabled}
                            >
                              <Option value="ordinary" label="Ordinary" />
                              <Option value="admin" label="Admin" />
                            </Select>
                          </Fragment>
                      }
                      {
                        !loading &&
                        mode === 'create' &&
                        <PasswordInput
                          value={password}
                          handleChange={::this.handleChange}
                          handleGeneratePassword={::this.handleGeneratePassword}
                          disabled={disabled}
                          invalid={!passwordValid}
                        />
                      }
                      {
                        loading
                          ?
                          <Skeleton
                            className="mui-btn"
                            height="36px"
                            width="146px"
                          />
                          :
                          <Button
                            className="button button-primary"
                            type="submit"
                            disabled={disabled}
                          >
                            {
                              mode === 'create'
                                ? 'Create User'
                                : 'Update User'
                            }
                          </Button>
                      }
                    </Panel>
                  </Col>
                  <Col md="4">
                    <Panel>
                      <div className="avatar-wrapper">
                        {
                          loading
                            ?
                            <Skeleton
                              className="avatar"
                              height="120px"
                              width="120px"
                              circle
                            />
                            :
                            <AvatarUploader
                              imageLink={profilePicture}
                              name={name}
                              roleChatType={role}
                              accountType={selectedUser.accountType}
                              handleImageUpload={::this.handleImageUpload}
                              handleRemoveImage={::this.handleRemoveImage}
                              disabled={disabled}
                            />
                        }
                      </div>
                    </Panel>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    upload: state.upload,
  }
}

UserForm.propTypes = {
  mode: PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
}

UserForm.defaultProps = {
  mode: 'create',
  errorMessage: '',
  successMessage: '',
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserForm);
