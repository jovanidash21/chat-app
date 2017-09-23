import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Form.scss');

class FacebookLogin extends Component {
  constructor(props) {
    super(props);

    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
  }
  handleFacebookLogin() {
    const { 
      handleFacebookLogin
    } = this.props;

    handleFacebookLogin();
  }
  render() {
    const {
      handleFacebookLogin
    } = this;

    return (
      <Button
        className="button button-facebook"
        size="large"
        variant="raised"
        onClick={handleFacebookLogin}
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

FacebookLogin.propTypes={
  handleFacebookLogin: PropTypes.func.isRequired
}

export default FacebookLogin;