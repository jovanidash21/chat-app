import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Login.scss');

class GitHubLogin extends Component {
  render() {
    return (
      <Button
        className="button button-github"
        size="large"
        variant="raised"
      >
        <div className="icon">
          <FontAwesome
            name="github"
            size="2x"
          />
        </div>
        Login with Github
      </Button>  
    ) 
  }
}

export default GitHubLogin;