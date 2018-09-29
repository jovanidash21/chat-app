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
      onChange={props.onChange}
      disabled={props.disabled}
    />
  );
}

InputComponent.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

InputComponent.defaultProps = {
  value: '',
  label: '',
  type: 'text',
  name: '',
  onChange: () => {},
  disabled: false
}

export default InputComponent;
