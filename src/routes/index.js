import React from 'react';
import { Switch } from 'react-router';
import LoadingBar from 'react-redux-loading-bar';
import AuthForm from '../containers/AuthForm';
import Layout from '../containers/Layout';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Chat from '../containers/Chat';

const routes = (
  <div>
    <LoadingBar className="loading-bar" />
    <Switch>
      <AuthForm exact path="/" component={Login} />
      <AuthForm exact path="/register" component={Register} />
      <Layout exact path="/chat" component={Chat} />
    </Switch>
  </div>
);

export default routes;
