import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Form.scss');

class LinkedInLogin extends Component {
  render() {
    return (
      <a href="/api/login/linkedin">
        <Button
          className="button button-linkedin"
          size="large"
          variant="raised"
        >
          <div className="icon">
            <FontAwesome
              name="linkedin"
              size="2x"
            />
          </div> 
          Login with LinkedIn
        </Button> 
      </a>    
    ) 
  }
}

export default LinkedInLogin;
