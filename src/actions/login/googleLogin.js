import popupTools from 'popup-tools';
import { 
  GOOGLE_LOGIN_PENDING,
  GOOGLE_LOGIN_FULFILLED,
  GOOGLE_LOGIN_REJECTED
} from '../../constants';
import { push } from 'react-router-redux';

function googleLoginPending() {
  return {
    type: GOOGLE_LOGIN_PENDING
  }
}

function googleLoginFulfilled() {
  return {
    type: GOOGLE_LOGIN_FULFILLED
  }
}

function googleLoginRejected() {
  return {
    type: GOOGLE_LOGIN_REJECTED
  }
}

export function googleLogin() { 
  return dispatch => {
    dispatch(googleLoginPending());

    return popupTools.popup(
      '/api/login/google', 'Google Login', {}, function (err, user) {
        if (!err) {
          dispatch(googleLoginFulfilled());
          dispatch(push('/chat'));
        } else {
          dispatch(googleLoginRejected());
        }
      }
    );
  }
}