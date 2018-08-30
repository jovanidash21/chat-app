import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ConnectedRouter } from 'react-router-redux';
import history from '../history';
import routes from './routes';
import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import regular from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(
  brands,
  regular,
  solid
);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
