import axios from 'axios';
import { FETCH_BLOCKED_USERS } from '../constants/blocked-user';

/**
 * Fetch blocked users
 *
 * @param {string} userID
 */
export function fetchBlockedUsers( userID ) {
  let data = {
    userID,
  };

  return dispatch => {
    return dispatch({
      type: FETCH_BLOCKED_USERS,
      payload: axios.post( 'blocked-user', data ),
    })
    .catch(( error ) => {
      if ( error instanceof Error ) {
        console.log( error );
      }
    });
  }
}
