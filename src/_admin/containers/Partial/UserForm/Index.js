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
import PasswordInput from '../../../components/Form/PasswordInput';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      name: '',
      email: '',
      role: 'ordinary',
      password: '',
      isLoading: false
    };
  }
  handleChange(event) {
    event.preventDefault();

    this.setState({[event.target.name]: event.target.value});
  }
  handleCreateUser(event) {
    event.preventDefault();
  }
  render() {
    const { isLoading } = this.state;

    return (
      <div className="user-form">
        <Form onSubmit={::this.handleCreateUser}>
          <Input
            label="Username"
            type="text"
            name="username"
            autoComplete="off"
            floatingLabel={true}
            required={true}
            onChange={::this.handleChange}
            disabled={isLoading}
          />
          <Input
            label="Name"
            type="text"
            name="name"
            autoComplete="off"
            floatingLabel={true}
            required={true}
            onChange={::this.handleChange}
            disabled={isLoading}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            autoComplete="off"
            floatingLabel={true}
            required={true}
            onChange={::this.handleChange}
            disabled={isLoading}
          />
          <Select
            label="Role"
            name="role"
            onChange={::this.handleChange}
            disabled={isLoading}
          >
            <Option value="ordinary" label="Ordinary" />
            <Option value="admin" label="Admin" />
          </Select>
          <PasswordInput
            handleChange={::this.handleChange}
            isLoading={isLoading}
          />
          <Button className="button button-primary" type="submit">
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
