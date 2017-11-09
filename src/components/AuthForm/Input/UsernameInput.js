import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';

class UsernameInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onUsernameChange } = this.props;

    return (
      <Input
        label="Username"
        type="text"
        autoComplete="off"
        floatingLabel={true}
        required={true}
        onChange={onUsernameChange}
      />
    )
  }
}

UsernameInput.propTypes = {
  onUsernameChange: PropTypes.func.isRequired
}

export default UsernameInput;
