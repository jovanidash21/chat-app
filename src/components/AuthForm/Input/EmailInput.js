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
    />
  );
}

EmailInput.propTypes = {
  onEmailChange: PropTypes.func.isRequired
}

export default EmailInput;
