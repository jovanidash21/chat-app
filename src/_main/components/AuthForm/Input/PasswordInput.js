import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';

const PasswordInput = (props) => {
  return (
    <Input
      value={props.value}
      label="Password"
      type="password"
      name="password"
      autoComplete="off"
      floatingLabel={true}
      required={true}
      onChange={props.handleChange}
      disabled={props.isDisabled}
    />
  );
}

PasswordInput.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
}

PasswordInput.defaultProps = {
  value: '',
  isDisabled: false
}

export default PasswordInput;
