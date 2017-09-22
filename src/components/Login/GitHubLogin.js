import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Form.scss');

class GitHubLogin extends Component {
  render() {
    return (
      <a href="/api/login/github">
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
      </a>  
    ) 
  }
}

export default GitHubLogin;