import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Login from './containers/Login/';
import store from './store/index';

render(
  <Provider store={store}>
    <Login />
  </Provider>
  , document.getElementById('root'));
