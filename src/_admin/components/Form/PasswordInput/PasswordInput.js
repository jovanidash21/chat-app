import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import generatePassword from 'password-generator';
import { Input } from '../../../../components/Form';
import './styles.scss';

class PasswordInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
    };
  }
  handleShowPassword(event) {
    event.preventDefault();

    this.setState({showPassword: !this.state.showPassword});
  }
  handleGeneratePassword(event) {
    event.preventDefault();

    const { handleGeneratePassword } = this.props;
    const generatedPassword = generatePassword(12, false);

    handleGeneratePassword(generatedPassword);
  }
  render() {
    const {
      value,
      handleChange,
      disabled,
      invalid,
    } = this.props;
    const { showPassword } = this.state;

    return (
      <div className="password-input-wrapper">
        <div className="password-input">
          <Input
            value={value}
            label="Password"
            type={(!showPassword ? "password" : "text")}
            name="password"
            onChange={handleChange}
            disabled={disabled}
            invalid={invalid}
          />
          <div
            className="show-password-icon"
            title={(!showPassword ? "Show Password" : "Hide Password")}
            onClick={::this.handleShowPassword}
          >
            <FontAwesomeIcon icon={(!showPassword ? ["far", "eye-slash"] : ["far", "eye"])} />
          </div>
        </div>
        <Button
          className="button button-default generate-password-button"
          size="small"
          title="Generate Password"
          onClick={::this.handleGeneratePassword}
          disabled={disabled}
        >
          Generate
        </Button>
      </div>
    )
  }
}

PasswordInput.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleGeneratePassword: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
}

PasswordInput.defaultProps = {
  value: '',
  disabled: false,
  invalid: false,
}

export default PasswordInput;
