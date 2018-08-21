import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import user from './user';
import upload from './upload';

const appReducer = combineReducers({
  router: routerReducer,
  loadingBar: loadingBarReducer,
  user,
  upload
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;
