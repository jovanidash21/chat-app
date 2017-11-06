import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import FontAwesome from 'react-fontawesome';
require('../../styles/Form.scss');

class TwitterLoginForm extends Component {
  constructor(props) {
    super(props);
  }
  handleTwitterLogin(event) {
    event.preventDefault();

    const { 
      handleTwitterLogin
    } = this.props;

    handleTwitterLogin();
  }
  render() {
    const { isLoading } = this.props;

    return (
      <Button
        className="button button-twitter"
        size="large"
        variant="raised"
        onClick={::this.handleTwitterLogin}
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

TwitterLoginForm.propTypes={
  handleTwitterLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

export default TwitterLoginForm;