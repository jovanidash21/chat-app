import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Form.scss');

class TwitterLogin extends Component {
  constructor(props) {
    super(props);

    this.handleTwitterLogin = this.handleTwitterLogin.bind(this);
  }
  handleTwitterLogin(event) {
    event.preventDefault();

    const { 
      handleTwitterLogin
    } = this.props;

    handleTwitterLogin();
  }
  render() {
    const { handleTwitterLogin } = this;
    const { isLoading } = this.props;

    return (
      <Button
        className="button button-twitter"
        size="large"
        variant="raised"
        onClick={handleTwitterLogin}
        disabled={isLoading}
      >
        <div className="icon">
          <FontAwesome
            name="twitter"
            size="2x"
          />
        </div>
        Login with Twitter
      </Button>
    ) 
  }
}

TwitterLogin.propTypes={
  handleTwitterLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

export default TwitterLogin;