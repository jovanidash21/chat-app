import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const RadioButton = (props) => {
  return (
    <div className="radio-button">
      <input
        id={props.id}
        type="radio"
        name={props.name}
        onChange={props.onChange}
        checked={props.checked}
        disabled={props.disabled}
      />
      <label htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
}

RadioButton.defaultProps = {
  label: '',
  name: '',
  onChange: () => {},
  checked: false,
  disabled: false,
}

export default RadioButton;
