import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { loadingBarReducer } from 'react-redux-loading-bar';
import history from '../../history';
import user from './user';
import chatRoom from './chat-room';
import message from './message';
import upload from './upload';

const appReducer = combineReducers({
  router: connectRouter( history ),
  loadingBar: loadingBarReducer,
  user,
  chatRoom,
  message,
  upload,
});

const rootReducer = ( state, action ) => {
  return appReducer( state, action );
}

export default rootReducer;
