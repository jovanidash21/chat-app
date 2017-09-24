import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Form.scss');

class GitHubLogin extends Component {
  constructor(props) {
    super(props);

    this.handleGitHubLogin = this.handleGitHubLogin.bind(this);
  }
  handleGitHubLogin(event) {
    event.preventDefault();

    const { 
      handleGitHubLogin
    } = this.props;

    handleGitHubLogin();
  }
  render() {
    const {
      handleGitHubLogin
    } = this;

    return (
      <Button
        className="button button-github"
        size="large"
        variant="raised"
        onClick={handleGitHubLogin}
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

GitHubLogin.propTypes={
  handleGitHubLogin: PropTypes.func.isRequired
}

export default GitHubLogin;