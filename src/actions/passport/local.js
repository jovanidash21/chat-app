import axios from 'axios';
import { 
  LOCAL_LOGIN_PENDING,
  LOCAL_LOGIN_FULFILLED,
  LOCAL_LOGIN_REJECTED,
  LOCAL_REGISTER_PENDING,
  LOCAL_REGISTER_FULFILLED,
  LOCAL_REGISTER_REJECTED,
  LOCAL_LOGOUT_PENDING,
  LOCAL_LOGOUT_FULFILLED,
  LOCAL_LOGOUT_REJECTED,
} from '../../constants/index';

function localLoginPending() {
  return {
    type: LOCAL_LOGIN_PENDING
  }
}

function localLoginFulfilled(data) {
  return {
    type: LOCAL_LOGIN_FULFILLED,
    data
  }
}

function localLoginRejected() {
  return {
    type: LOCAL_LOGIN_REJECTED
  }
}

function localRegisterPending() {
  return {
    type: LOCAL_REGISTER_PENDING
  }
}

function localRegisterFulfilled() {
  return {
    type: LOCAL_REGISTER_FULFILLED
  }
}

function localRegisterRejected() {
  return {
    type: LOCAL_REGISTER_REJECTED
  }
}

function localLogoutPending() {
  return {
    type: LOCAL_LOGOUT_PENDING
  }
}

function localLogoutFulfilled() {
  return {
    type: LOCAL_LOGOUT_FULFILLED
  }
}

function localLogoutRejected() {
  return {
    type: LOCAL_LOGOUT_REJECTED
  }
}

function makeRequest(method, api, data) {
  return axios({
    method: method,
    url: api,
    data: data
  })
}

export function localLogin(data) { 
  return dispatch => {
    dispatch(localLoginPending());

    return makeRequest('POST', '/api/login/local', data)  
      .then(response => {
        if (response.status === 200) {
          dispatch(localLoginFulfilled(data));
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

export function localRegister(data) {  
  return dispatch => {
    dispatch(localRegisterPending());

    return makeRequest('POST', '/api/register', data)
      .then(response => {
        if (response.status === 200) {        
          dispatch(localRegisterFulfilled());
        } else {          
          dispatch(localRegisterRejected());
        }
      })
      .catch(error => {
        if (error instanceof Error) {
          dispatch(localRegisterRejected());
        }
      });
  }

}

export function localLogout() {
  return dispatch => {
    dispatch(localLogoutPending());

    return makeRequest('POST', '/api/logout') 
      .then(response => {
        if (response.data.success) {
          dispatch(localLogoutFulfilled());
        } else {
          dispatch(localLogoutRejected());
        }
      })
      .catch(error => {
        if (error instanceof Error) {
          dispatch(localLogoutRejected());
        }
      });
  }     
}