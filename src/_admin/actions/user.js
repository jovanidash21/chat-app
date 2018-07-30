import axios from 'axios';
import {
  FETCH_USER,
  FETCH_USERS,
  SELECT_USER,
  DESELECT_USER,
} from '../constants/user';

const localtionArr = window.location.href.split("/");
const baseURL = localtionArr[0] + "//" + localtionArr[2];

/**
 * Fetch user
 */
export function fetchUser() {
  return dispatch => {
    return dispatch({
      type: FETCH_USER,
      payload: axios.get(baseURL + '/api/user')
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Fetch users
 */
export function fetchUsers() {
  return dispatch => {
    return dispatch({
      type: FETCH_USERS,
      payload: axios.get(baseURL + '/api/user/all')
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Select user
 * @param {Object} user
 */
export function selectUser(user) {
  return dispatch => {
    dispatch({
      type: SELECT_USER,
      user: user
    });
  }
}

/**
 * Deselect user
 */
export function deselectUser() {
  return dispatch => {
    dispatch({
      type: DESELECT_USER
    });
  }
}
