import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import localLogin from './login/localLogin';
import register from './register';

const reducers = combineReducers({
  router: routerReducer,
  loadingBar: loadingBarReducer,
  localLogin,
  register
});

export default reducers;