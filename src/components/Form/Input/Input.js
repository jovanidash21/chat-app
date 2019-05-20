import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';
import './styles.scss';

const InputComponent = (props) => {
  return (
    <Input
      className={"input " + (props.invalid ? 'invalid' : '')}
      value={props.value}
      label={props.label}
      type={props.type}
      name={props.name}
      autoComplete="off"
      floatingLabel
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
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
}

InputComponent.defaultProps = {
  value: '',
  label: '',
  type: 'text',
  name: '',
  onChange: () => {},
  disabled: false,
  invalid: false,
}

export default InputComponent;
