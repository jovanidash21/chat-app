import axios from 'axios';
import popupTools from 'popup-tools';
import { push } from 'react-router-redux';
import {
  LOGIN,
  REGISTER,
  LOGOUT
} from '../constants/user';

export function localLogin(data) {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      payload: axios.post('/api/login/local', data)
    })
    .then(() => {
      dispatch(push('/chat'));
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

export function facebookLogin() {
  return dispatch => {
    return popupTools.popup('/api/login/facebook', 'Facebook Login', {}, function (err) {
      dispatch({type: `${LOGIN}_PENDING`});

      if (!err) {
        dispatch({type: `${LOGIN}_FULFILLED`});
        dispatch(push('/chat'));
      } else {
        dispatch({type: `${LOGIN}_REJECTED`});
      }
    });
  }
}

export function googleLogin() { 
  return dispatch => {
    return popupTools.popup('/api/login/google', 'Google Login', {}, function (err) {
      dispatch({type: `${LOGIN}_PENDING`});
      
      if (!err) {
        dispatch({type: `${LOGIN}_FULFILLED`});
        dispatch(push('/chat'));
      } else {
        dispatch({type: `${LOGIN}_REJECTED`});
      }
    });
  }
}

export function twitterLogin() { 
  return dispatch => {
    return popupTools.popup('/api/login/twitter', 'Twitter Login', {}, function (err) {
      dispatch({type: `${LOGIN}_PENDING`});
      
      if (!err) {
        dispatch({type: `${LOGIN}_FULFILLED`});
        dispatch(push('/chat'));
      } else {
        dispatch({type: `${LOGIN}_REJECTED`});
      }
    });
  }
}

export function instagramLogin() {
  return dispatch => {
    return popupTools.popup('/api/login/instagram', 'Instagram Login', {}, function (err) {
      dispatch({type: `${LOGIN}_PENDING`});
      
      if (!err) {
        dispatch({type: `${LOGIN}_FULFILLED`});
        dispatch(push('/chat'));
      } else {
        dispatch({type: `${LOGIN}_REJECTED`});
      }
    });
  } 
}

export function linkedinLogin() {
  return dispatch => {
    return popupTools.popup('/api/login/linkedin', 'LinkedIn Login', {}, function (err) {
      dispatch({type: `${LOGIN}_PENDING`});
      
      if (!err) {
        dispatch({type: `${LOGIN}_FULFILLED`});
        dispatch(push('/chat'));
      } else {
        dispatch({type: `${LOGIN}_REJECTED`});
      }
    });
  }
}

export function githubLogin() {
  return dispatch => {
    return popupTools.popup('/api/login/github', 'GitHub Login', {}, function (err) {
      dispatch({type: `${GITHUB_LOGIN}_PENDING`});
      
      if (!err) {
        dispatch({type: `${LOGIN}_FULFILLED`});
        dispatch(push('/chat'));
      } else {
        dispatch({type: `${LOGIN}_REJECTED`});
      }
    });
  }
}

export function register(data) {
  return dispatch => {
    return dispatch({
      type: REGISTER,
      payload: axios.post('/api/register', data)
    })
    .then(() => {
      dispatch(push('/'));
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

export function logout() {
  return dispatch => {
    return dispatch({
      type: LOGOUT,
      payload: axios.post('/api/logout')
    })
    .then(() => {
      dispatch(push('/'));
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}