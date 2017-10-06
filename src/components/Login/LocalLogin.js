import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
require('../../styles/Form.scss');

class LocalLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleLocalLogin = this.handleLocalLogin.bind(this);
  }
  onUsernameChange(event) {
    event.preventDefault();

    this.setState({username: event.target.value});
  }
  onPasswordChange(event) {
    event.preventDefault();

    this.setState({password: event.target.value});
  }
  handleLocalLogin(event) {
    event.preventDefault();

    const { 
      handleLocalLogin
    } = this.props;
    const { 
      username,
      password
    } = this.state;
    let data = {username, password};

    handleLocalLogin(data);
  }
  render() {
    const {
      onUsernameChange,
      onPasswordChange,
      handleLocalLogin
    } = this;
    const { isLoading } = this.props;

    return (
      <Form onSubmit={handleLocalLogin}>
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
          className="button button-login"
          size="large"
          type="submit"
          variant="raised"
          disabled={isLoading}
        >
          Login
        </Button>
      </Form>  
    ) 
  }
}

LocalLogin.propTypes={
  handleLocalLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

export default LocalLogin;