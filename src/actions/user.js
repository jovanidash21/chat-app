import axios from 'axios';
import { GET_USER_DATA } from '../constants/user';

export function getUserData(data) {
  return dispatch => {
    dispatch({type: `${GET_USER_DATA}_LOADING`});

    return axios
    .get('api/user')
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: `${GET_USER_DATA}_SUCCESS`,
          userData: response.data
        });
      }
    })
    .catch(function (error) {
      if (error instanceof Error) {
        dispatch({type: `${GET_USER_DATA}_ERROR`});
      }
    });
  }
}