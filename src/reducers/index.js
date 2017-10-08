import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import auth from './auth';
import email from './email';

const reducers = combineReducers({
  router: routerReducer,
  loadingBar: loadingBarReducer,
  auth,
  email
});

export default reducers;