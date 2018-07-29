import React from 'react';
import { Switch } from 'react-router';
import LoadingBar from 'react-redux-loading-bar';
import Popup from 'react-popup';
import Layout from '../containers/Layout';
import Dashboard from '../containers/Dashboard';
import AllUsers from '../containers/AllUsers';
import 'react-popup/style.css';
import '../../styles/Common.scss';
import '../styles/Common.scss';

const routes = (
  <div>
    <LoadingBar className="loading-bar" />
    <Popup />
    <Switch>
      <Layout exact path="/admin" component={Dashboard} title="Dashboard" />
      <Layout exact path="/admin/all-users" component={AllUsers} title="All Users" />
    </Switch>
  </div>
);

export default routes;
