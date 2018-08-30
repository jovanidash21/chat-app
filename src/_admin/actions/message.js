import axios from 'axios';
import { FETCH_MESSAGES_COUNT } from '../constants/message';

const localtionArr = window.location.href.split("/");
const baseURL = localtionArr[0] + "//" + localtionArr[2];

/**
 * Fetch messages count
 */
export function fetchMessagesCount() {
  return dispatch => {
    return dispatch({
      type: FETCH_MESSAGES_COUNT,
      payload: axios.get(baseURL + '/api/message/count')
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
