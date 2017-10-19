import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import FontAwesome from 'react-fontawesome';
require('../../styles/Form.scss');

class LinkedInLogin extends Component {
  constructor(props) {
    super(props);
  }
  handleLinkedInLogin(event) {
    event.preventDefault();

    const { 
      handleLinkedInLogin
    } = this.props;

    handleLinkedInLogin();
  }
  render() {
    const { isLoading } = this.props;

    return (
      <Button
        className="button button-linkedin"
        size="large"
        variant="raised"
        onClick={::this.handleLinkedInLogin}
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
  isLoading: PropTypes.bool,
  isError: PropTypes.bool
}

export default LinkedInLogin;
