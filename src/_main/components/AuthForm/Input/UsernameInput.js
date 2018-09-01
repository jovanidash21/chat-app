import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';

const UsernameInput = (props) => {
  return (
    <Input
      value={props.value}
      label="Username"
      type="text"
      name="username"
      autoComplete="off"
      floatingLabel={true}
      required={true}
      onChange={props.handleChange}
      disabled={props.isDisabled}
    />
  );
}

UsernameInput.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
}

UsernameInput.defaultProps = {
  value: '',
  isDisabled: false
}

export default UsernameInput;
