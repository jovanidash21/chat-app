import axios from 'axios';
import { FETCH_MEMBERS } from '../constants/member';

const localtionArr = window.location.href.split("/");
const baseURL = localtionArr[0] + "//" + localtionArr[2];

/**
 * Fetch members
 * @param {string} chatRoomID
 * @param {string} userID
 */
export function fetchMembers(chatRoomID, userID) {
  return dispatch => {
    return dispatch({
      type: FETCH_MEMBERS,
      payload: axios.get(baseURL + `/api/member/${chatRoomID}/${userID}`)
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
