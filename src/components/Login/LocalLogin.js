import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button
} from 'muicss/react';
require('../../styles/Form.scss');

class LocalLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
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
      isLoading,
      isError
    } = this.props;

    return (
      <Form onSubmit={::this.handleLocalLogin}>
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
          className={isError ? 'error' : ''}
          label="Password"
          type="password"
          autoComplete="off"
          floatingLabel={true}
          onChange={::this.onPasswordChange}
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
  isLoading: PropTypes.bool,
  isError: PropTypes.bool
}

export default LocalLogin;