import axios from 'axios';
import { 
  REGISTER_PENDING,
  REGISTER_FULFILLED,
  REGISTER_REJECTED
} from '../constants';

function registerPending() {
  return {
    type: REGISTER_PENDING
  }
}

function registerFulfilled(data) {
  return {
    type: REGISTER_FULFILLED,
    data
  }
}

function registerRejected() {
  return {
    type: REGISTER_REJECTED
  }
}

export function register(data) { 
  return dispatch => {
    dispatch(registerPending());

    return axios({
        method: 'POST',
        url: 'api/register',
        data: data
      }) 
      .then(response => {
        if (response.status === 200) {
          dispatch(registerFulfilled(data));
        } else {
          dispatch(registerRejected());
        }
      })
      .catch(function (error) {
        if (error instanceof Error) {
          dispatch(registerRejected());
        }
      });
  }
}