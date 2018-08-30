import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import '../styles/AuthForm.scss';

class AuthForm extends Component {
  constructor(props) {
    super(props);
  }
  handleComponentRender(matchProps) {
    const { component: Content } = this.props;

    return (
      <div className="auth-form">
        <Content {...matchProps} />
      </div>
    )
  }
  render() {
    const { component, ...rest } = this.props;

    return (
      <Route {...rest} render={::this.handleComponentRender} />
    )
  }
}

AuthForm.propTypes = {
  component: PropTypes.func.isRequired
}

export default AuthForm;
