import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';

const InputComponent = (props) => {
  return (
    <Input
      value={props.value}
      label={props.label}
      type={props.type}
      name={props.name}
      autoComplete="off"
      floatingLabel={true}
      required={true}
      onChange={props.handleChange}
      disabled={props.isDisabled}
    />
  );
}

InputComponent.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
}

InputComponent.defaultProps = {
  value: '',
  label: '',
  type: 'text',
  name: '',
  isDisabled: false
}

export default InputComponent;
