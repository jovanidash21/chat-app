import axios from 'axios';
import { FETCH_USER } from '../constants/user';

export function fetchUser(data) {
  return dispatch => {
    return dispatch({
      type: FETCH_USER,
      payload: axios.get('api/user')
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}