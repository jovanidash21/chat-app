import axios from 'axios';
import { GET_USER_DATA } from '../constants/user';

export function getUserData(data) {
  return dispatch => {
    return dispatch({
      type: GET_USER_DATA,
      payload: axios.get('api/user')
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}