import axios from 'axios';
import popupTools from 'popup-tools';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { push } from 'react-router-redux';
import { sendEmail } from './email';
import {
  LOGIN,
  REGISTER,
  LOGOUT,
  SOCKET_USER_LOGIN,
  SOCKET_USER_REGISTER,
  SOCKET_USER_LOGOUT
} from '../constants/auth';

export function socketUserLogin(user) {
  return {
    type: SOCKET_USER_LOGIN,
    user: user,
  }
}

export function localLogin(data) {
  return dispatch => {
    dispatch(showLoading());

    return dispatch({
      type: LOGIN,
      payload: axios.post('/api/login/local', data)
    })
    .then((response) => {
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
    return dispatch({
      type: LOGIN,
      payload: new Promise((resolve, reject) => {
        popupTools.popup('/api/login/facebook', 'Facebook Login', {}, function (err, res) {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      })
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

export function googleLogin() {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      payload: new Promise((resolve, reject) => {
        popupTools.popup('/api/login/google', 'Google Login', {}, function (err, res) {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      })
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

export function twitterLogin() {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      payload: new Promise((resolve, reject) => {
        popupTools.popup('/api/login/twitter', 'Twitter Login', {}, function (err, res) {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      })
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

export function instagramLogin() {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      payload: new Promise((resolve, reject) => {
        popupTools.popup('/api/login/instagram', 'Instagram Login', {}, function (err, res) {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      })
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

export function linkedinLogin() {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      payload: new Promise((resolve, reject) => {
        popupTools.popup('/api/login/linkedin', 'LinkedIn Login', {}, function (err, res) {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      })
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

export function githubLogin() {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      payload: new Promise((resolve, reject) => {
        popupTools.popup('/api/login/github', 'GitHub Login', {}, function (err, res) {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      })
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

export function register(data) {
  return dispatch => {
    dispatch(showLoading());

    return dispatch({
      type: REGISTER,
      payload: axios.post('/api/register', data)
    })
    .then((response) => {
      dispatch({
        type: SOCKET_USER_REGISTER,
        user: response.action.payload.data.userData,
      });
      dispatch(hideLoading());
      dispatch(sendEmail(data));
      dispatch(push('/chat'));
    })
    .catch((error) => {
      if (error instanceof Error) {
        dispatch(hideLoading());
      }
    });
  }
}

export function logout(user) {
  return dispatch => {
    dispatch(showLoading());

    return dispatch({
      type: LOGOUT,
      payload: axios.post('/api/logout')
    })
    .then(() => {
      dispatch({
        type: SOCKET_USER_LOGOUT,
        user: user,
      });
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
