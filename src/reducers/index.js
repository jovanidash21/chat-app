import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import user from './user';

const reducers = combineReducers({
  router: routerReducer,
  loadingBar: loadingBarReducer,
  user
});

export default reducers;