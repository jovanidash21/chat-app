import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';

class NameInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onNameChange } = this.props;

    return (
      <Input
        label="Name"
        type="text"
        autoComplete="off"
        floatingLabel={true}
        required={true}
        onChange={onNameChange}
      />
    )
  }
}

NameInput.propTypes = {
  onNameChange: PropTypes.func.isRequired
}

export default NameInput;
