import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';

const PasswordInput = (props) => {
  return (
    <Input
      label="Password"
      type="password"
      autoComplete="off"
      floatingLabel={true}
      required={true}
      onChange={props.onPasswordChange}
      disabled={props.isDisabled}
    />
  );
}

PasswordInput.propTypes = {
  onPasswordChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
}

PasswordInput.defaultProps = {
  isDisabled: false
}

export default PasswordInput;
