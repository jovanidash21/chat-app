import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';

const NameInput = (props) => {
  return (
    <Input
      label="Name"
      type="text"
      autoComplete="off"
      floatingLabel={true}
      required={true}
      onChange={props.onNameChange}
      disabled={props.isDisabled}
    />
  );
}

NameInput.propTypes = {
  onNameChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
}

NameInput.defaultProps = {
  isDisabled: false
}

export default NameInput;
