import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
require('../styles/AuthForm.scss');

class AuthForm extends Component {
  constructor(props) {
    super(props);
  }
  handleComponent(matchProps) {
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
      <Route {...rest} render={::this.handleComponent} />
    )
  }
}

AuthForm.propTypes={
  component: PropTypes.func
}

export default AuthForm;
