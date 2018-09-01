import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';

const NameInput = (props) => {
  return (
    <Input
      value={props.value}
      label="Name"
      type="text"
      name="name"
      autoComplete="off"
      floatingLabel={true}
      required={true}
      onChange={props.handleChange}
      disabled={props.isDisabled}
    />
  );
}

NameInput.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
}

NameInput.defaultProps = {
  value: '',  
  isDisabled: false
}

export default NameInput;
