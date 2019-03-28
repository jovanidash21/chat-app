import axios from 'axios';
import { FETCH_MEMBERS } from '../constants/member';

/**
 * Fetch members
 *
 * @param {string} chatRoomID
 * @param {string} userID
 */
export function fetchMembers( chatRoomID, userID ) {
  let data = {
    chatRoomID: chatRoomID,
    userID: userID,
  };

  return dispatch => {
    return dispatch({
      type: FETCH_MEMBERS,
      payload: axios.post( 'member', data ),
    })
    .catch(( error ) => {
      if ( error instanceof Error ) {
        console.log( error );
      }
    });
  }
}
