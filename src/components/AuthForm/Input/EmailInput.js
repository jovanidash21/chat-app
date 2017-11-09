import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';

class EmailInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onEmailChange } = this.props;

    return (
      <Input
        label="Email"
        type="text"
        autoComplete="off"
        floatingLabel={true}
        required={true}
        onChange={onEmailChange}
      />
    )
  }
}

EmailInput.propTypes = {
  onEmailChange: PropTypes.func.isRequired
}

export default EmailInput;
