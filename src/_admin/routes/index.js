import React, { Fragment } from 'react';
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
import { EditChatRoom } from '../containers/EditChatRoom';
import { NotFound } from '../../components/NotFound';
import 'react-popup/style.css';
import '../../styles/Common.scss';
import '../styles/Common.scss';

const routes = (
  <Fragment>
    <LoadingBar className="loading-bar" />
    <Popup />
    <Switch>
      <Layout exact path="/dashboard" component={Dashboard} title="Dashboard" />
      <Layout exact path="/all-users" component={AllUsers} title="All Users" />
      <Layout exact path="/create-user" component={CreateUser} title="Create User" />
      <Layout exact path="/edit-user/:userID" component={EditUser} title="Edit User" />
      <Layout exact path="/all-chat-rooms" component={AllChatRooms} title="All Chat Rooms" />
      <Layout exact path="/create-chat-room" component={CreateChatRoom} title="Create Chat Room" />
      <Layout exact path="/edit-chat-room/:chatRoomID" component={EditChatRoom} title="Edit Chat Room" />
      <Layout path="*" component={NotFound} title="Chat App | Page not found" />
    </Switch>
  </Fragment>
);

export default routes;
