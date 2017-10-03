import axios from 'axios';
import { 
  LOGOUT_PENDING,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED
} from '../../constants';
import { push } from 'react-router-redux';

function logoutPending() {
  return {
    type: LOGOUT_PENDING
  }
}

function logoutFulfilled() {
  return {
    type: LOGOUT_FULFILLED
  }
}

function logoutRejected() {
  return {
    type: LOGOUT_REJECTED
  }
}

export function logout() { 
  return dispatch => {
    dispatch(logoutPending());

    return axios({
      method: 'POST',
      url: 'api/logout'
    }) 
    .then(response => {
      dispatch(logoutFulfilled());
      dispatch(push('/'));
    })
    .catch(function (error) {
      if (error instanceof Error) {
        dispatch(logoutRejected());
      }
    });
  }
}