import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { loadingBarReducer } from 'react-redux-loading-bar';
import history from '../../history';
import user from './user';
import chatRoom from './chat-room';
import message from './message';
import blockedUser from './blocked-user';
import upload from './upload';

const appReducer = combineReducers({
  router: connectRouter(history),
  loadingBar: loadingBarReducer,
  user,
  chatRoom,
  message,
  blockedUser,
  upload,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;
