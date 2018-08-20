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
import mapDispatchToProps from '../../../actions';
import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import { PasswordInput } from '../../../components/Form';
import './styles.scss';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      name: '',
      email: '',
      role: 'ordinary',
      password: ''
    };
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.mode === 'create' &&
      prevProps.user.isCreating &&
      !this.props.user.isCreating &&
      this.props.user.isCreatingSuccess
    ) {
      this.setState({
        username: '',
        name: '',
        email: '',
        role: 'ordinary',
        password: ''
      });
    } else if (
      this.props.mode === 'edit' &&
      prevProps.isLoading &&
      !this.props.isLoading
    ) {
      ::this.handleDisplayeSelectedUser();
    }
  }
  handleUserFormRender() {
    const {
      user,
      mode,
      isLoading
    } = this.props;
    const {
      username,
      name,
      email,
      role,
      password
    } = this.state;

    if ( !isLoading ) {
      return (
        <Form onSubmit={::this.handleSubmitUserForm}>
          <Input
            value={username}
            label="Username"
            type="text"
            name="username"
            autoComplete="off"
            floatingLabel={true}
            required={true}
            onChange={::this.handleChange}
            disabled={user.isCreating}
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
            disabled={user.isCreating}
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
            disabled={user.isCreating}
          />
          <Select
            value={role}
            label="Role"
            name="role"
            onChange={::this.handleChange}
            disabled={user.isCreating}
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
              isDisabled={user.isCreating}
            />
          }
          <Button
            className="button button-primary"
            type="submit"
            disabled={mode === 'create' ? user.isCreating : user.isEditing}
          >
            {
              mode === 'create'
                ? 'Create User'
                : 'Update User'
            }
          </Button>
        </Form>
      )
    } else {
      <LoadingAnimation name="ball-clip-rotate" color="black" />
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
        username: selectedUser.username,
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role
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
      password
    } = this.state;

    createUser(
      username,
      name,
      email,
      role,
      password
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
      role
    } = this.state;
    const selectedUser = user.selected;

    editUser(
      selectedUser._id,
      username,
      name,
      email,
      role
    );
  }
  render() {
    return (
      <div className="user-form">
        <Row>
          <Col md="8">
            <Panel>
              {::this.handleUserFormRender()}
            </Panel>
          </Col>
          <Col md="4">
            <Panel>

            </Panel>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

UserForm.propTypes = {
  mode: PropTypes.string,
  isLoading: PropTypes.bool
}

UserForm.defaultProps = {
  mode: 'create',
  isLoading: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
