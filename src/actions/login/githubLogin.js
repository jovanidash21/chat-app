import popupTools from 'popup-tools';
import { 
  GITHUB_LOGIN_PENDING,
  GITHUB_LOGIN_FULFILLED,
  GITHUB_LOGIN_REJECTED
} from '../../constants';
import { push } from 'react-router-redux';

function githubLoginPending() {
  return {
    type: GITHUB_LOGIN_PENDING
  }
}

function githubLoginFulfilled() {
  return {
    type: GITHUB_LOGIN_FULFILLED
  }
}

function githubLoginRejected() {
  return {
    type: GITHUB_LOGIN_REJECTED
  }
}

export function githubLogin() { 
  return dispatch => {
    dispatch(githubLoginPending());

    return popupTools.popup(
      '/api/login/github', 'GitHub Login', {}, function (err, user) {
        if (!err) {
          dispatch(githubLoginFulfilled());
          dispatch(push('/chat'));
        } else {
          dispatch(githubLoginRejected());
        }
      }
    );
  }
}