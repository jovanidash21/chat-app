import axios from 'axios';
import {
  FETCH_ACTIVE_USER,
  SEARCH_USER
} from '../constants/user';
import { fetchChatRooms } from './chat-room';

const localtionArr = window.location.href.split("/");
const baseURL = localtionArr[0] + "//" + localtionArr[2];

/**
 * Fetch active user
 */
export function fetchActiveUser() {
  return dispatch => {
    return dispatch({
      type: FETCH_ACTIVE_USER,
      payload: axios.get(baseURL + '/api/user')
    })
    .then((response) => {
      dispatch(fetchChatRooms(response.value.data.user._id));
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Search user
 */
export function searchUser(query) {
  let data = { query };

  return dispatch => {
    return dispatch({
      type: SEARCH_USER,
      payload: axios.post(baseURL + '/api/user/search', data)
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
