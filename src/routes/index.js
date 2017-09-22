import React from 'react';
import { Route, Switch } from 'react-router';
import LoadingBar from 'react-redux-loading-bar';
import {
  Login,
  Register,
  Chat
} from '../containers';

const routes = (
  <div>
    <LoadingBar />
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/chat" component={Chat} />
    </Switch>
  </div>
);

export default routes;