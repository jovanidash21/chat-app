import React, { Component } from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
require('../../styles/Login.scss');

class LocalLogin extends Component {
  render() {
    return (
      <Form>
        <Input 
          label="Username"
          name="username"
          type="text"
          floatingLabel={true}
          required={true}
          ref="username"
        />  
        <Input 
          label="Password"
          name="password"
          type="password"
          floatingLabel={true}
          ref="password"
        />
        <Button
          className="button button-login"
          color="primary" 
          size="large" 
          type="submit" 
          variant="raised"
        >
          Login
        </Button>
      </Form>  
    ) 
  }
}

export default LocalLogin;