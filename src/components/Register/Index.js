import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button
} from 'muicss/react';
require('../../styles/Form.scss');

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      username: '',
      password: ''
    };
  }
  onEmailChange(event) {
    event.preventDefault();

    this.setState({email: event.target.value});
  }
  onNameChange(event) {
    event.preventDefault();

    this.setState({name: event.target.value});
  }
  onUsernameChange(event) {
    event.preventDefault();

    this.setState({username: event.target.value});
  }
  onPasswordChange(event) {
    event.preventDefault();

    this.setState({password: event.target.value});
  }
  handleRegister(event) {
    event.preventDefault();

    const { 
      handleRegister
    } = this.props;
    const { 
      email,
      name,
      username,
      password
    } = this.state;
    let data = {email, name, username, password};

    handleRegister(data);
  }
  render() {
    const { 
      isLoading,
      isError
    } = this.props;

    return (
      <Form onSubmit={::this.handleRegister}>
        <Input 
          label="Email"
          type="email"
          autoComplete="off"
          floatingLabel={true}
          required={true}
          onChange={::this.onEmailChange}
        /> 
        <Input 
          label="Name"
          type="text"
          autoComplete="off"
          floatingLabel={true}
          required={true}
          onChange={::this.onNameChange}
        />  
        <Input
          className={isError ? 'error' : ''}
          label="Username"
          type="text"
          autoComplete="off"
          floatingLabel={true}
          required={true}
          onChange={::this.onUsernameChange}
        />  
        <Input 
          label="Password"
          type="password"
          autoComplete="off"
          floatingLabel={true}
          onChange={::this.onPasswordChange}
        />
        <Button
          className="button button-register"
          size="large"
          type="submit"
          variant="raised"
          disabled={isLoading}
        >
          Register
        </Button>
      </Form>  
    ) 
  }
}

Register.propTypes={
  handleRegister: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool
}

export default Register;