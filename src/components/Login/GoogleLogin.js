import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Login.scss');

class GoogleLogin extends Component {
  render() {
    return (
      <Button
        className="button button-google"
        size="large"
        variant="raised"
      >
        <div className="icon">
          <FontAwesome
            name="google"
            size="2x"
          />
        </div>
        Login with Google
      </Button>
    ) 
  }
}

export default GoogleLogin;