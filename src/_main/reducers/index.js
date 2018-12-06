import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import auth from './auth';
import user from './user';
import email from './email';
import typer from './typer';
import chatRoom from './chat-room';
import popUpChatRoom from './popup-chat-room';
import message from './message';
import member from './member';

const appReducer = combineReducers({
  router: routerReducer,
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
