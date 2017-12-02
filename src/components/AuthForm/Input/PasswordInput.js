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
    />
  );
}

PasswordInput.propTypes = {
  onPasswordChange: PropTypes.func.isRequired
}

export default PasswordInput;
