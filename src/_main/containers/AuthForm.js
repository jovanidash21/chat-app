import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import Head from '../../components/Head';
import '../styles/AuthForm.scss';

class AuthForm extends Component {
  constructor(props) {
    super(props);
  }
  handleComponentRender(matchProps) {
    const {
      component: Content,
      title,
    } = this.props;

    return (
      <div className="auth-form">
        <Head title={"Chat App " + (title.length > 0 ? '| ' + title : '')} />
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
  component: PropTypes.func.isRequired,
  title: PropTypes.string,
}

AuthForm.defaultProps = {
  title: '',
}

export default AuthForm;
