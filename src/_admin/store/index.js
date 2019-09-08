import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { routerMiddleware } from 'connected-react-router';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import createSocketIoMiddleware from 'redux-socket.io';
import socket from '../../socket';
import history from '../../history';
import reducers from '../reducers';

const optimisticExecute = (action, emit, next) => {
  if (action.type.indexOf('SOCKET_BROADCAST_') === -1 ) {
    emit('action', action);
  }
  next(action);
}

const reactRouterMiddleware = routerMiddleware(history);
let socketIoMiddleware = createSocketIoMiddleware(socket, 'SOCKET_', {execute: optimisticExecute});

const middlewares = [
  thunk,
  promiseMiddleware({
    promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'],
  }),
  reactRouterMiddleware,
  loadingBarMiddleware(),
  socketIoMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');

middlewares.push(logger);
}

const store = createStore(
  reducers,
  applyMiddleware(...middlewares),
);

export default store;
