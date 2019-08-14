import axios from 'axios';
import { FETCH_MESSAGES_COUNT } from '../constants/message';

/**
 * Fetch messages count
 */
export function fetchMessagesCount() {
  return dispatch => {
    return dispatch({
      type: FETCH_MESSAGES_COUNT,
      payload: axios.get('/message/count'),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
