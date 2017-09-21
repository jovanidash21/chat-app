import React from 'react';
import { Route, Switch } from 'react-router';
import LoadingBar from 'react-redux-loading-bar';
import Login from '../containers/Login';
import Register from '../containers/Register';

const routes = (
  <div>
    <LoadingBar />
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  </div>
);

export default routes;