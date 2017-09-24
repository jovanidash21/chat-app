import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Form.scss');

class InstagramLogin extends Component {
  constructor(props) {
    super(props);

    this.handleInstagramLogin = this.handleInstagramLogin.bind(this);
  }
  handleInstagramLogin(event) {
    event.preventDefault();

    const { 
      handleInstagramLogin
    } = this.props;

    handleInstagramLogin();
  }
  render() {
    const {
      handleInstagramLogin
    } = this;

    return (
      <Button
        className="button button-instagram"
        size="large"
        variant="raised"
        onClick={handleInstagramLogin}
      >
        <div className="icon">
          <FontAwesome
            name="instagram"
            size="2x"
          />
        </div>
        Login with Instagram
      </Button>
    ) 
  }
}

export default InstagramLogin;