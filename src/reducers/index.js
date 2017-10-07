import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import auth from './auth';

const reducers = combineReducers({
  router: routerReducer,
  loadingBar: loadingBarReducer,
  auth
});

export default reducers;