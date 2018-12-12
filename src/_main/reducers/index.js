import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { loadingBarReducer } from 'react-redux-loading-bar';
import history from '../../history';
import auth from './auth';
import user from './user';
import email from './email';
import typer from './typer';
import chatRoom from './chat-room';
import popUpChatRoom from './popup-chat-room';
import message from './message';
import member from './member';

const appReducer = combineReducers({
  router: connectRouter(history),
  loadingBar: loadingBarReducer,
  auth,
  user,
  email,
  typer,
  chatRoom,
  popUpChatRoom,
  message,
  member
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;
