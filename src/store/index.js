import { createStore, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import reducers from '../reducers/index';

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    promise(),
    loadingBarMiddleware(),
    createLogger()
  )
);

export default store;