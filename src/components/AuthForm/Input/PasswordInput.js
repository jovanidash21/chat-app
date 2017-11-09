import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';

class PasswordInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onPasswordChange } = this.props;

    return (
      <Input
        label="Password"
        type="password"
        autoComplete="off"
        floatingLabel={true}
        required={true}
        onChange={onPasswordChange}
      />
    )
  }
}

PasswordInput.propTypes = {
  onPasswordChange: PropTypes.func.isRequired
}

export default PasswordInput;
