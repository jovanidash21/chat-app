import axios from 'axios';
import { FECTH_USER } from '../constants/user';

export function getUserData(data) {
  return dispatch => {
    return dispatch({
      type: FECTH_USER,
      payload: axios.get('api/user')
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}