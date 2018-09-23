import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';

const EmailInput = (props) => {
  return (
    <Input
      value={props.value}
      label="Email"
      type="email"
      name="email"
      autoComplete="off"
      floatingLabel={true}
      required={true}
      onChange={props.handleChange}
      disabled={props.isDisabled}
    />
  );
}

EmailInput.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
}

EmailInput.defaultProps = {
  value: '',
  isDisabled: false
}

export default EmailInput;
