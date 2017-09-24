import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import localLogin from './login/localLogin';
import facebookLogin from './login/facebookLogin';
import googleLogin from './login/googleLogin';
import twitterLogin from './login/twitterLogin';
import instagramLogin from './login/instagramLogin';
import register from './register';
import logout from './logout';

const reducers = combineReducers({
  router: routerReducer,
  loadingBar: loadingBarReducer,
  localLogin,
  facebookLogin,
  googleLogin,
  twitterLogin,
  instagramLogin,
  register,
  logout
});

export default reducers;