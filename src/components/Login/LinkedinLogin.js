import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Login.scss');

class LinkedInLogin extends Component {
  render() {
    return (
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
    ) 
  }
}

export default LinkedInLogin;