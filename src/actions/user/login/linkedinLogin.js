import popupTools from 'popup-tools';
import { 
  LINKEDIN_LOGIN_PENDING,
  LINKEDIN_LOGIN_FULFILLED,
  LINKEDIN_LOGIN_REJECTED
} from '../../../constants';
import { push } from 'react-router-redux';

function linkedinLoginPending() {
  return {
    type: LINKEDIN_LOGIN_PENDING
  }
}

function linkedinLoginFulfilled() {
  return {
    type: LINKEDIN_LOGIN_FULFILLED
  }
}

function linkedinLoginRejected() {
  return {
    type: LINKEDIN_LOGIN_REJECTED
  }
}

export function linkedinLogin() { 
  return dispatch => {
    dispatch(linkedinLoginPending());

    return popupTools.popup(
      '/api/login/linkedin', 'LinkedIn Login', {}, function (err, user) {
        if (!err) {
          dispatch(linkedinLoginFulfilled());
          dispatch(push('/chat'));
        } else {
          dispatch(linkedinLoginRejected());
        }
      }
    );
  }
}