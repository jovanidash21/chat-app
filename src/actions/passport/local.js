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

function localLoginUser() {
  return {
    type: LOCAL_LOGIN_USER
  }
}

function localLoginSuccess(data) {
  return {
    type: LOCAL_LOGIN_SUCCESS,
    data
  }
}

function localLoginError() {
  return {
    type: LOCAL_LOGIN_ERROR
  }
}

function localRegisterUser() {
  return {
    type: LOCAL_REGISTER_USER
  }
}

function localRegisterSuccess() {
  return {
    type: LOCAL_REGISTER_SUCCESS
  }
}

function localRegisterError() {
  return {
    type: LOCAL_REGISTER_ERROR
  }
}

function localLogoutUser() {
  return {
    type: LOCAL_LOGOUT_USER
  }
}

function localLogoutSuccess() {
  return {
    type: LOCAL_LOGOUT_SUCCESS
  }
}

function localLogoutError() {
  return {
    type: LOCAL_LOGOUT_ERROR
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
    dispatch(localLoginUser());

    return makeRequest('POST', '/api/login/local', data)  
      .then(response => {
        if (response.status === 200) {
          dispatch(localLoginSuccess(data));
        } else {
          dispatch(localLoginError());
        }
      })
      .catch(function (error) {
        if (error instanceof Error) {
          dispatch(localLoginError());
        }
      });
  }
}

export function localRegister(data) {  
  return dispatch => {
    dispatch(localRegisterUser());

    return makeRequest('POST', '/api/register', data)
      .then(response => {
        if (response.status === 200) {        
          dispatch(localRegisterSuccess());
        } else {          
          dispatch(localRegisterError());
        }
      })
      .catch(error => {
        if (error instanceof Error) {
          dispatch(localRegisterError());
        }
      });
  }

}

export function localLogout() {
  return dispatch => {
    dispatch(localLogoutUser());

    return makeRequest('POST', '/api/logout') 
      .then(response => {
        if (response.data.success) {
          dispatch(localLogoutSuccess());
        } else {
          dispatch(localLogoutError());
        }
      })
      .catch(error => {
        if (error instanceof Error) {
          dispatch(localLogoutError());
        }
      });
  }     
}