import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import auth from './auth';
import email from './email';
import { LOGOUT } from '../constants/auth';

const appReducer = combineReducers({
  router: routerReducer,
  loadingBar: loadingBarReducer,
  auth,
  email
});

const rootReducer = (state, action) => {
  if (action.type === `${LOGOUT}_SUCCESS`) {
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;