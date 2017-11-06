import React from 'react';
import { Route, Switch } from 'react-router';
import LoadingBar from 'react-redux-loading-bar';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Chat from '../containers/Chat';

const routes = (
  <div>
    <LoadingBar className="loading-bar" />
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/chat" component={Chat} />
    </Switch>
  </div>
);

export default routes;