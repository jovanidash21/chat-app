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
    />
  );
}

NameInput.propTypes = {
  onNameChange: PropTypes.func.isRequired
}

export default NameInput;
