import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import history from '../history';
import { routerMiddleware } from 'react-router-redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import reducers from '../reducers';

const reactRouterMiddleware = routerMiddleware(history);

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    promiseMiddleware(),
    reactRouterMiddleware,
    loadingBarMiddleware(),
    createLogger()
  )
);

export default store;