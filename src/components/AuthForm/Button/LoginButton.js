import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import './styles.scss';

class LoginButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      type,
      isDisabled
    } = this.props;

    return (
      <Button
        className='button button-login'
        size="large"
        type={type}
        variant="raised"
        disabled={isDisabled}
      >
        Login
      </Button>
    )
  }
}

LoginButton.propTypes = {
  type: PropTypes.string,
  isDisabled: PropTypes.bool
}

export default LoginButton;
