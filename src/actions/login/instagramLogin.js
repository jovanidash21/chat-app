import popupTools from 'popup-tools';
import { 
  INSTAGRAM_LOGIN_PENDING,
  INSTAGRAM_LOGIN_FULFILLED,
  INSTAGRAM_LOGIN_REJECTED
} from '../../constants';
import { push } from 'react-router-redux';

function instagramLoginPending() {
  return {
    type: INSTAGRAM_LOGIN_PENDING
  }
}

function instagramLoginFulfilled() {
  return {
    type: INSTAGRAM_LOGIN_FULFILLED
  }
}

function instagramLoginRejected() {
  return {
    type: INSTAGRAM_LOGIN_REJECTED
  }
}

export function instagramLogin() { 
  return dispatch => {
    dispatch(instagramLoginPending());

    return popupTools.popup(
      '/api/login/instagram', 'Instagram Login', {}, function (err, user) {
        if (!err) {
          dispatch(instagramLoginFulfilled());
          dispatch(push('/chat'));
        } else {
          dispatch(instagramLoginRejected());
        }
      }
    );
  }
}