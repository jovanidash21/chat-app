import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

class Layout extends Component {
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

Layout.propTypes={
  component: PropTypes.func
}

export default Layout;