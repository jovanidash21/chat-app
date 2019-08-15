import axios from 'axios';
import popupTools from 'popup-tools';
import {
  showLoading,
  hideLoading,
} from 'react-redux-loading-bar';
import { push } from 'connected-react-router';
import { sendEmail } from './email';
import {
  LOGIN,
  REGISTER,
  SOCKET_USER_LOGIN,
} from '../constants/auth';

const localtionArr = window.location.href.split( '/' );
const baseURL = `${localtionArr[0]}//${localtionArr[2]}`;

/**
 * Socket user login
 *
 * @param {string} userID
 */
export function socketUserLogin(userID) {
  return {
    type: SOCKET_USER_LOGIN,
    userID,
  }
}

/**
 * Local login
 *
 * @param {string} username
 * @param {string} password
 */
export function localLogin(username, password) {
  const data = {
    username,
    password,
  };

  return dispatch => {
    dispatch(showLoading());

    return dispatch({
      type: LOGIN,
      payload: axios.post('/login/local', data),
    })
    .then(() => {
      dispatch(hideLoading());
      dispatch(push('/chat'));
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Facebook login
 */
export function facebookLogin() {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      payload: new Promise((resolve, reject) => {
        popupTools.popup(`${baseURL}/api/login/facebook`, 'Facebook Login', {}, (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      }),
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

/**
 * Google login
 */
export function googleLogin() {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      payload: new Promise((resolve, reject) => {
        popupTools.popup(`${baseURL}/api/login/google`, 'Google Login', {}, (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      }),
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

/**
 * Twitter login
 */
export function twitterLogin() {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      payload: new Promise((resolve, reject) => {
        popupTools.popup( `${baseURL}/api/login/twitter`, 'Twitter Login', {}, (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      }),
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

/**
 * Instagram login
 */
export function instagramLogin() {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      payload: new Promise((resolve, reject) => {
        popupTools.popup( `${baseURL}/api/login/instagram`, 'Instagram Login', {}, (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      }),
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

/**
 * LinkedIn login
 */
export function linkedinLogin() {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      payload: new Promise((resolve, reject) => {
        popupTools.popup( `${baseURL}/api/login/linkedin`, 'LinkedIn Login', {}, (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      }),
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

/**
 * GitHub login
 */
export function githubLogin() {
  return dispatch => {
    return dispatch({
      type: LOGIN,
      payload: new Promise((resolve, reject) => {
        popupTools.popup(`${baseURL}/api/login/github]`, 'GitHub Login', {}, (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      }),
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

/**
 * Register
 *
 * @param {string} email
 * @param {string} name
 * @param {string} username
 * @param {string} password
 */
export function register(email, name, username, password) {
  const data = {
    email,
    name,
    username,
    password,
  };

  return dispatch => {
    dispatch(showLoading());

    return dispatch({
      type: REGISTER,
      payload: axios.post('/register', data),
    })
    .then(() => {
      dispatch(hideLoading());
      dispatch(sendEmail(email, name));
      dispatch(push('/chat'));
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
