import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Panel,
  Form,
  Input,
  Select,
  Option,
  Button
} from 'muicss/react';
import mapDispatchToProps from '../../../actions';
import { PasswordInput } from '../../../components/Form';

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
    if ( prevProps.user.isCreating && !this.props.user.isCreating && this.props.user.isCreatingSuccess ) {
      this.setState({
        username: '',
        name: '',
        email: '',
        role: 'ordinary',
        password: ''
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
  handleCreateUser(event) {
    event.preventDefault();

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
  render() {
    const { user } = this.props;
    const {
      username,
      name,
      email,
      role,
      password
    } = this.state;

    return (
      <div className="user-form">
        <Form onSubmit={::this.handleCreateUser}>
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
          <PasswordInput
            value={password}
            handleChange={::this.handleChange}
            handleGeneratePassword={::this.handleGeneratePassword}
            isLoading={user.isCreating}
          />
          <Button
            className="button button-primary"
            type="submit"
            disabled={user.isCreating}
          >
            Create User
          </Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
