import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import localLogin from './user/login/localLogin';
import facebookLogin from './user/login/facebookLogin';
import googleLogin from './user/login/googleLogin';
import twitterLogin from './user/login/twitterLogin';
import instagramLogin from './user/login/instagramLogin';
import linkedinLogin from './user/login/linkedinLogin';
import githubLogin from './user/login/githubLogin';
import register from './user/register';
import logout from './user/logout';

const reducers = combineReducers({
  router: routerReducer,
  loadingBar: loadingBarReducer,
  localLogin,
  facebookLogin,
  googleLogin,
  twitterLogin,
  instagramLogin,
  linkedinLogin,
  githubLogin,
  register,
  logout
});

export default reducers;