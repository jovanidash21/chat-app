import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import auth from './auth';
import user from './user';
import email from './email';
import typer from './typer';
import chatRoom from './chat-room';
import message from './message';
import { LOGOUT } from '../constants/auth';

const appReducer = combineReducers({
  router: routerReducer,
  loadingBar: loadingBarReducer,
  auth,
  user,
  email,
  typer,
  chatRoom,
  message
});

const rootReducer = (state, action) => {
  if (action.type === `${LOGOUT}_SUCCESS`) {
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;
