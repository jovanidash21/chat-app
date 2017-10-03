import axios from 'axios';
import { 
  LOCAL_LOGIN_PENDING,
  LOCAL_LOGIN_FULFILLED,
  LOCAL_LOGIN_REJECTED
} from '../../../constants';
import { push } from 'react-router-redux';

function localLoginPending() {
  return {
    type: LOCAL_LOGIN_PENDING
  }
}

function localLoginFulfilled() {
  return {
    type: LOCAL_LOGIN_FULFILLED
  }
}

function localLoginRejected() {
  return {
    type: LOCAL_LOGIN_REJECTED
  }
}

export function localLogin(data) { 
  return dispatch => {
    dispatch(localLoginPending());

    return axios({
      method: 'POST',
      url: 'api/login/local',
      data: data
    }) 
    .then(response => {
      if (response.status === 200) {
        dispatch(localLoginFulfilled());
        dispatch(push('/chat'));
      } else {
        dispatch(localLoginRejected());
      }
    })
    .catch(function (error) {
      if (error instanceof Error) {
        dispatch(localLoginRejected());
      }
    });
  }
}