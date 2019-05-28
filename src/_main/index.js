import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import store from './store';
import history from '../history';
import routes from './routes';

const localtionArr = window.location.href.split( '/' );
const baseURL = `${localtionArr[0]}//${localtionArr[2]}/api`;

axios.defaults.baseURL = baseURL;

library.add(
  fab,
  far,
  fas,
);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
