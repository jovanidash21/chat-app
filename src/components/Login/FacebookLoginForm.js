import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import FontAwesome from 'react-fontawesome';
require('../../styles/Form.scss');

class FacebookLoginForm extends Component {
  constructor(props) {
    super(props);
  }
  handleFacebookLogin(event) {
    event.preventDefault();

    const { 
      handleFacebookLogin
    } = this.props;

    handleFacebookLogin();
  }
  render() {
    const { isLoading } = this.props;

    return (
      <Button
        className="button button-facebook"
        size="large"
        variant="raised"
        onClick={::this.handleFacebookLogin}
        disabled={isLoading}
      >
        <div className="icon">
          <FontAwesome
            name="facebook"
            size="2x"
          />
        </div>  
        Login with Facebook
      </Button>
    ) 
  }
}

FacebookLoginForm.propTypes={
  handleFacebookLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

export default FacebookLoginForm;