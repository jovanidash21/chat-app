import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Button
} from 'muicss/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

class PasswordInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false
    };
  }
  handleShowPassword(event) {
    event.preventDefault();

    this.setState({showPassword: !this.state.showPassword});
  }
  render() {
    const {
      handleChange,
      isLoading
    } = this.props;
    const { showPassword } = this.state;

    return (
      <div className="password-input-wrapper">
        <div className="password-input">
          <Input
            label="Password"
            type={(!showPassword ? "password" : "text")}
            name="password"
            autoComplete="off"
            floatingLabel={true}
            required={true}
            onChange={handleChange}
            disabled={isLoading}
          />
          <div
            className="show-password-icon"
            title={(!showPassword ? "Show Password" : "Hide Password")}
            onClick={::this.handleShowPassword}
          >
            <FontAwesomeIcon icon={(!showPassword ? ["far", "eye"] : ["far", "eye-slash"])} />
          </div>
        </div>
      </div>
    )
  }
}

PasswordInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

PasswordInput.defaultProps = {
  isLoading: false
}

export default PasswordInput;
