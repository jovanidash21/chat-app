import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';

const EmailInput = (props) => {
  return (
    <Input
      label="Email"
      type="text"
      autoComplete="off"
      floatingLabel={true}
      required={true}
      onChange={props.onEmailChange}
      disabled={props.isDisabled}
    />
  );
}

EmailInput.propTypes = {
  onEmailChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
}

EmailInput.defaultProps = {
  isDisabled: false
}

export default EmailInput;
