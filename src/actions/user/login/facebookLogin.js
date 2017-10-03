import popupTools from 'popup-tools';
import { 
  FACEBOOK_LOGIN_PENDING,
  FACEBOOK_LOGIN_FULFILLED,
  FACEBOOK_LOGIN_REJECTED
} from '../../../constants';
import { push } from 'react-router-redux';

function facebookLoginPending() {
  return {
    type: FACEBOOK_LOGIN_PENDING
  }
}

function facebookLoginFulfilled() {
  return {
    type: FACEBOOK_LOGIN_FULFILLED
  }
}

function facebookLoginRejected() {
  return {
    type: FACEBOOK_LOGIN_REJECTED
  }
}

export function facebookLogin() { 
  return dispatch => {
    dispatch(facebookLoginPending());

    return popupTools.popup(
      '/api/login/facebook', 'Facebook Login', {}, function (err, user) {
        if (!err) {
          dispatch(facebookLoginFulfilled());
          dispatch(push('/chat'));
        } else {
          dispatch(facebookLoginRejected());
        }
      }
    );
  }
}