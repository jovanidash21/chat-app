import axios from 'axios';
import { 
  LOCAL_LOGIN_USER,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGIN_ERROR,
  LOCAL_REGISTER_USER,
  LOCAL_REGISTER_SUCCESS,
  LOCAL_REGISTER_ERROR,
  LOCAL_LOGOUT_USER,
  LOCAL_LOGOUT_SUCCESS,
  LOCAL_LOGOUT_ERROR,
} from '../../constants/index';

function loginUser() {
  return {
    type: LOCAL_LOGIN_USER
  }
}

function loginSuccess(data) {
  return {
    type: LOCAL_LOGIN_SUCCESS,
    data
  }
}

function loginError() {
  return {
    type: LOCAL_LOGIN_ERROR
  }
}

function registerUser() {
  return {
    type: LOCAL_REGISTER_USER
  }
}

function registerSuccess() {
  return {
    type: LOCAL_REGISTER_SUCCESS
  }
}

function registerError() {
  return {
    type: LOCAL_REGISTER_ERROR
  }
}

function logoutUser() {
  return {
    type: LOCAL_LOGOUT_USER
  }
}

function logoutSuccess() {
  return {
    type: LOCAL_LOGOUT_SUCCESS
  }
}

function logoutError() {
  return {
    type: LOCAL_LOGOUT_ERROR
  }
}

function makeRequest(method, data, api) {
  return axios({
    method: method,
    url: api,
    data: data
  })
}

export function localLogin(data) { 
  return dispatch => {
    dispatch(loginUser());

    return makeRequest('POST', data, '/api/login/local')  
      .then(response => {
        if (response.data.success) {          
          dispatch(loginSuccess(data));
        } else {          
          dispatch(loginError());        }
      })
      .catch(function (response) {
        if (response instanceof Error) {
          console.log('Error', response.message);
        }
      });
  }
}

export function localRegister(data) {  
  return dispatch => {
    dispatch(registerUser());

    return makeRequest('POST', data, '/api/register') 
      .then(response => {
        if (response.data.success) {          
          dispatch(registerSuccess());
        } else {          
          dispatch(registerError());
        }
      })
      .catch(response => {
        if (response instanceof Error) {
          console.log('Error', response.message);
        }
      });
  }

}

export function localLogout() {
  return dispatch => {
    dispatch(logoutUser());

    return makeRequest('POST', data, '/api/logout') 
      .then(response => {
        if (response.data.success) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      })
      .catch(response => {
        if (response instanceof Error) {
          console.log('Error', response.message);
        }
      })
  }     
}