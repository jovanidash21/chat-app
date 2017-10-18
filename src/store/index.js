import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { routerMiddleware } from 'react-router-redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import history from '../history';
import reducers from '../reducers';

const reactRouterMiddleware = routerMiddleware(history);

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    promiseMiddleware({
      promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
    }),
    reactRouterMiddleware,
    loadingBarMiddleware(),
    createLogger()
  ),
  autoRehydrate()
);

const saveAuthSubsetBlacklistFilter = createBlacklistFilter(
  'auth', ['isLoginError', 'isRegisterError']
)

persistStore(store, {
  transforms: [
    saveAuthSubsetBlacklistFilter
  ]
});

export default store;