import axios from 'axios';
import {
  FETCH_USER,
  FETCH_USERS
} from '../constants/user';
import { fetchChatRooms } from './chat-room';

/**
 * Fetch user
 */
export function fetchUser() {
  return dispatch => {
    return dispatch({
      type: FETCH_USER,
      payload: axios.get('api/user')
    })
    .then((response) => {
      dispatch(fetchChatRooms(response.value.data._id));
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
      payload: axios.get('api/user/all')
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
