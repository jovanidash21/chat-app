import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: ''
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  onEmailChange(event) {
    event.preventDefault();

    this.setState({email: event.target.value});
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
      username,
      password
    } = this.state;
    let data = {email, username, password};

    handleRegister(data);
  }
  render() {
    const {
      onEmailChange,
      onUsernameChange,
      onPasswordChange,
      handleRegister
    } = this;

    return (
      <Form onSubmit={handleRegister}>
        <Input 
          label="Email"
          name="email"
          type="email"
          floatingLabel={true}
          required={true}
          onChange={onEmailChange}
        /> 
        <Input 
          label="Username"
          name="username"
          type="text"
          floatingLabel={true}
          required={true}
          onChange={onUsernameChange}
        />  
        <Input 
          label="Password"
          name="password"
          type="password"
          floatingLabel={true}
          onChange={onPasswordChange}
        />
        <Button
          className="button button-register"
          color="primary" 
          size="large" 
          type="submit" 
          variant="raised"
        >
          Register
        </Button>
      </Form>  
    ) 
  }
}

Register.propTypes={
  handleRegister: PropTypes.func.isRequired
}

export default Register;