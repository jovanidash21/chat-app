import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import localLogin from './login/localLogin';
import register from './register';
import logout from './logout';

const reducers = combineReducers({
  router: routerReducer,
  loadingBar: loadingBarReducer,
  localLogin,
  register,
  logout
});

export default reducers;