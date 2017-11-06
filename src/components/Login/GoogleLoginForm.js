import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import FontAwesome from 'react-fontawesome';
require('../../styles/Form.scss');

class GoogleLoginForm extends Component {
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

GoogleLoginForm.propTypes={
  handleGoogleLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

export default GoogleLoginForm;