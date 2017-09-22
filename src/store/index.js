import { createStore, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import history from '../history';
import { routerMiddleware } from 'react-router-redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import reducers from '../reducers';

const reactRouterMiddleware = routerMiddleware(history);

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    promise(),
    reactRouterMiddleware,
    loadingBarMiddleware(),
    createLogger()
  )
);

export default store;