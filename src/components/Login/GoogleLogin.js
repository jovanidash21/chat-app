import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Form.scss');

class GoogleLogin extends Component {
  constructor(props) {
    super(props);
  }
  handleGoogleLogin(event) {
    event.preventDefault();

    const { 
      handleGoogleLogin
    } = this.props;

    handleGoogleLogin();
  }
  render() {
    const { isLoading } = this.props;

    return (
      <Button
        className="button button-google"
        size="large"
        variant="raised"
        onClick={::this.handleGoogleLogin}
        disabled={isLoading}
      >
        <div className="icon">
          <FontAwesome
            name="google"
            size="2x"
          />
        </div>
        Login with Google
      </Button>
    ) 
  }
}

GoogleLogin.propTypes={
  handleGoogleLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool
}

export default GoogleLogin;