import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import localLogin from './login/localLogin';

const reducers = combineReducers({
  loadingBar: loadingBarReducer,
  localLogin
});

export default reducers;