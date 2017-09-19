import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Login.scss');

class InstagramLogin extends Component {
  render() {
    return (
      <a href="/api/login/instagram">
        <Button
          className="button button-instagram"
          size="large"
          variant="raised"
        >
          <div className="icon">
            <FontAwesome
              name="instagram"
              size="2x"
            />
          </div>
          Login with Instagram
        </Button> 
      </a>  
    ) 
  }
}

export default InstagramLogin;