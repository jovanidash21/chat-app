import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import FontAwesome from 'react-fontawesome';
require('../../styles/Form.scss');

class GitHubLoginForm extends Component {
  constructor(props) {
    super(props);
  }
  handleGitHubLogin(event) {
    event.preventDefault();

    const { 
      handleGitHubLogin
    } = this.props;

    handleGitHubLogin();
  }
  render() {
    const { isLoading } = this.props;

    return (
      <Button
        className="button button-github"
        size="large"
        variant="raised"
        onClick={::this.handleGitHubLogin}
        disabled={isLoading}
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

GitHubLoginForm.propTypes={
  handleGitHubLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

export default GitHubLoginForm;