import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Form.scss');

class GoogleLogin extends Component {
  constructor(props) {
    super(props);

    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }
  handleGoogleLogin(event) {
    event.preventDefault();

    const { 
      handleGoogleLogin
    } = this.props;

    handleGoogleLogin();
  }
  render() {
    const {
      handleGoogleLogin
    } = this;

    return (
      <a href="/api/login/google">
        <Button
          className="button button-google"
          size="large"
          variant="raised"
          onClick={handleGoogleLogin}
        >
          <div className="icon">
            <FontAwesome
              name="google"
              size="2x"
            />
          </div>
          Login with Google
        </Button>
      </a>  
    ) 
  }
}

GoogleLogin.propTypes={
  handleGoogleLogin: PropTypes.func.isRequired
}

export default GoogleLogin;