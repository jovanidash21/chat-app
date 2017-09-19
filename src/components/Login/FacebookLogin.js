import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Login.scss');

class FacebookLogin extends Component {
  render() {
    return (
      <a href="/api/login/facebook">
        <Button
          className="button button-facebook"
          size="large"
          variant="raised"
        >
          <div className="icon">
            <FontAwesome
              name="facebook"
              size="2x"
            />
          </div>  
          Login with Facebook
        </Button>
      </a>  
    ) 
  }
}

export default FacebookLogin;