import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { routerMiddleware } from 'react-router-redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { createLogger } from 'redux-logger';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import history from '../history';
import reducers from '../reducers';

const reactRouterMiddleware = routerMiddleware(history);
let socket = io();
let socketIoMiddleware = createSocketIoMiddleware(socket, 'SOCKET/');

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    promiseMiddleware({
      promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
    }),
    reactRouterMiddleware,
    loadingBarMiddleware(),
    createLogger(),
    socketIoMiddleware
  )
);

export default store;
