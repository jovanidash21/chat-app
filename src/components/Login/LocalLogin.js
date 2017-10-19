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
    const { isLoading } = this.props;

    return (
      <Form onSubmit={::this.handleLocalLogin}>
        <Input 
          label="Username"
          name="username"
          type="text"
          floatingLabel={true}
          required={true}
          onChange={::this.onUsernameChange}
        />  
        <Input 
          label="Password"
          name="password"
          type="password"
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
  isLoading: PropTypes.bool
}

export default LocalLogin;