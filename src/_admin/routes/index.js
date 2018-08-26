import React from 'react';
import { Switch } from 'react-router';
import LoadingBar from 'react-redux-loading-bar';
import Popup from 'react-popup';
import Layout from '../containers/Layout';
import { Dashboard } from '../containers/Dashboard';
import { AllUsers } from '../containers/AllUsers';
import { CreateUser } from '../containers/CreateUser';
import { EditUser } from '../containers/EditUser';
import { AllChatRooms } from '../containers/AllChatRooms';
import { CreateChatRoom } from '../containers/CreateChatRoom';
import 'react-popup/style.css';
import '../../styles/Common.scss';
import '../styles/Common.scss';

const routes = (
  <div>
    <LoadingBar className="loading-bar" />
    <Popup />
    <Switch>
      <Layout exact path="/dashboard" component={Dashboard} title="Dashboard" />
      <Layout exact path="/all-users" component={AllUsers} title="All Users" />
      <Layout exact path="/create-user" component={CreateUser} title="Create User" />
      <Layout exact path="/edit-user/:userID" component={EditUser} title="Edit User" />
      <Layout exact path="/all-chat-rooms" component={AllChatRooms} title="All Chat Rooms" />
      <Layout exact path="/create-chat-room" component={CreateChatRoom} title="Create Chat Room" />
    </Switch>
  </div>
);

export default routes;
