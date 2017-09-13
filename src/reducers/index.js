import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import local from './passport/local';

const reducers = combineReducers({
  loadingBar: loadingBarReducer,
  local
});

export default reducers;