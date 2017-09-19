import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Login.scss');

class TwitterLogin extends Component {
  render() {
    return (
      <a href="/api/login/twitter">
        <Button
          className="button button-twitter"
          size="large"
          variant="raised"
        >
          <div className="icon">
            <FontAwesome
              name="twitter"
              size="2x"
            />
          </div>
          Login with Twitter
        </Button>
      </a>   
    ) 
  }
}

export default TwitterLogin;