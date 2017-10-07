import axios from 'axios';
import popupTools from 'popup-tools';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { push } from 'react-router-redux';
import {
  LOGIN,
  REGISTER,
  LOGOUT
} from '../constants/user';


export function localLogin(data) {
  return dispatch => {
    dispatch(showLoading());

    return dispatch({
      type: LOGIN,
      payload: axios.post('/api/login/local', data)
    })
    .then(() => {
      dispatch(hideLoading());
      dispatch(push('/chat'));
    })
    .catch((error) => {
      if (error instanceof Error) {
        dispatch(hideLoading());
      }
    });
  }
}

export function facebookLogin() {
  return dispatch => {
    dispatch(showLoading());
    dispatch({type: `${LOGIN}_LOADING`});

    return popupTools.popup('/api/login/facebook', 'Facebook Login', {}, function (err) {
      if (!err) {
        dispatch({type: `${LOGIN}_SUCCESS`});
        dispatch(hideLoading());
        dispatch(push('/chat'));
      } else {
        dispatch({type: `${LOGIN}_ERROR`});
        dispatch(hideLoading());
      }
    });
  }
}

export function googleLogin() { 
  return dispatch => {
    dispatch(showLoading());
    dispatch({type: `${LOGIN}_LOADING`});

    return popupTools.popup('/api/login/google', 'Google Login', {}, function (err) {      
      if (!err) {
        dispatch({type: `${LOGIN}_SUCCESS`});
        dispatch(hideLoading());
        dispatch(push('/chat'));
      } else {
        dispatch({type: `${LOGIN}_ERROR`});
        dispatch(hideLoading());
      }
    });
  }
}

export function twitterLogin() { 
  return dispatch => {
    dispatch(showLoading());
    dispatch({type: `${LOGIN}_LOADING`});

    return popupTools.popup('/api/login/twitter', 'Twitter Login', {}, function (err) {      
      if (!err) {
        dispatch({type: `${LOGIN}_SUCCESS`});
        dispatch(hideLoading());
        dispatch(push('/chat'));
      } else {
        dispatch({type: `${LOGIN}_ERROR`});
        dispatch(hideLoading());
      }
    });
  }
}

export function instagramLogin() {
  return dispatch => {
    dispatch(showLoading());
    dispatch({type: `${LOGIN}_LOADING`});

    return popupTools.popup('/api/login/instagram', 'Instagram Login', {}, function (err) {   
      if (!err) {
        dispatch({type: `${LOGIN}_SUCCESS`});
        dispatch(hideLoading());
        dispatch(push('/chat'));
      } else {
        dispatch({type: `${LOGIN}_ERROR`});
        dispatch(hideLoading());
      }
    });
  } 
}

export function linkedinLogin() {
  return dispatch => {
    dispatch(showLoading());
    dispatch({type: `${LOGIN}_LOADING`});

    return popupTools.popup('/api/login/linkedin', 'LinkedIn Login', {}, function (err) {      
      if (!err) {
        dispatch({type: `${LOGIN}_SUCCESS`});
        dispatch(hideLoading());
        dispatch(push('/chat'));
      } else {
        dispatch({type: `${LOGIN}_ERROR`});
        dispatch(hideLoading());
      }
    });
  }
}

export function githubLogin() {
  return dispatch => {
    dispatch(showLoading());
    dispatch({type: `${LOGIN}_LOADING`});

    return popupTools.popup('/api/login/github', 'GitHub Login', {}, function (err) {
      if (!err) {
        dispatch({type: `${LOGIN}_SUCCESS`});
        dispatch(hideLoading());
        dispatch(push('/chat'));
      } else {
        dispatch({type: `${LOGIN}_ERROR`});
        dispatch(hideLoading());
      }
    });
  }
}

export function register(data) {
  return dispatch => {
    dispatch(showLoading());

    return dispatch({
      type: REGISTER,
      payload: axios.post('/api/register', data)
    })
    .then(() => {
      dispatch(hideLoading());
      dispatch(push('/'));
    })
    .catch((error) => {
      if (error instanceof Error) {
        dispatch(hideLoading());
      }
    });
  }
}

export function logout() {
  return dispatch => {
    dispatch(showLoading());

    return dispatch({
      type: LOGOUT,
      payload: axios.post('/api/logout')
    })
    .then(() => {
      dispatch(hideLoading());
      dispatch(push('/'));
    })
    .catch((error) => {
      if (error instanceof Error) {
        dispatch(hideLoading());
      }
    });
  }
}