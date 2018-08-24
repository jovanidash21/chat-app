import axios from 'axios';
import { FETCH_CHAT_ROOMS } from '../constants/chat-room';

const localtionArr = window.location.href.split("/");
const baseURL = localtionArr[0] + "//" + localtionArr[2];

/**
 * Fetch chat rooms
 */
export function fetchChatRooms() {
  return dispatch => {
    return dispatch({
      type: FETCH_CHAT_ROOMS,
      payload: axios.get(baseURL + '/api/chat-room/all')
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
