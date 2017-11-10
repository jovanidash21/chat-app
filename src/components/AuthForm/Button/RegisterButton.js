import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import './styles.scss';

class RegisterButton extends Component {
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
        className='button button-register'
        size="large"
        type={type}
        variant="raised"
        disabled={isDisabled}
      >
        Register
      </Button>
    )
  }
}

RegisterButton.propTypes = {
  type: PropTypes.string,
  isDisabled: PropTypes.bool
}

export default RegisterButton;
