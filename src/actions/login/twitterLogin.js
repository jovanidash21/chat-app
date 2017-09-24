import popupTools from 'popup-tools';
import { 
  TWITTER_LOGIN_PENDING,
  TWITTER_LOGIN_FULFILLED,
  TWITTER_LOGIN_REJECTED
} from '../../constants';
import { push } from 'react-router-redux';

function twitterLoginPending() {
  return {
    type: TWITTER_LOGIN_PENDING
  }
}

function twitterLoginFulfilled() {
  return {
    type: TWITTER_LOGIN_FULFILLED
  }
}

function twitterLoginRejected() {
  return {
    type: TWITTER_LOGIN_REJECTED
  }
}

export function twitterLogin() { 
  return dispatch => {
    dispatch(twitterLoginPending());

    return popupTools.popup(
      '/api/login/twitter', 'Twitter Login', {}, function (err, user) {
        if (!err) {
          dispatch(twitterLoginFulfilled());
          dispatch(push('/chat'));
        } else {
          dispatch(twitterLoginRejected());
        }
      }
    );
  }
}