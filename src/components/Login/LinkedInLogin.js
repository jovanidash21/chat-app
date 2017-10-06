import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'muicss/lib/react/button';
import FontAwesome from 'react-fontawesome';
require('../../styles/Form.scss');

class LinkedInLogin extends Component {
  constructor(props) {
    super(props);

    this.handleLinkedInLogin = this.handleLinkedInLogin.bind(this);
  }
  handleLinkedInLogin(event) {
    event.preventDefault();

    const { 
      handleLinkedInLogin
    } = this.props;

    handleLinkedInLogin();
  }
  render() {
    const { handleLinkedInLogin } = this;
    const { isLoading } = this.props;

    return (
      <Button
        className="button button-linkedin"
        size="large"
        variant="raised"
        onClick={handleLinkedInLogin}
        disabled={isLoading}
      >
        <div className="icon">
          <FontAwesome
            name="linkedin"
            size="2x"
          />
        </div> 
        Login with LinkedIn
      </Button> 
    ) 
  }
}

LinkedInLogin.propTypes={
  handleLinkedInLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

export default LinkedInLogin;
