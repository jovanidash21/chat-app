import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Checkbox = (props) => {
  return (
    <div className="checkbox">
      <input
        id={props.id}
        type="checkbox"
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

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
}

Checkbox.defaultProps = {
  label: '',
  name: '',
  onChange: () => {},
  checked: false,
  disabled: false,
}

export default Checkbox;
