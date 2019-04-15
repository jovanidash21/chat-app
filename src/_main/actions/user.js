import axios from 'axios';
import {
  FETCH_ACTIVE_USER,
  EDIT_ACTIVE_USER,
  FETCH_USER,
  SEARCH_USER,
} from '../constants/user';
import { fetchChatRooms } from './chat-room';

/**
 * Fetch active user
 */
export function fetchActiveUser() {
  return dispatch => {
    return dispatch({
      type: FETCH_ACTIVE_USER,
      payload: axios.get( 'user' ),
    })
    .then((response) => {
      dispatch( fetchChatRooms( response.value.data.user._id ) );
    })
    .catch(( error ) => {
      if ( error instanceof Error ) {
        console.log( error );
      }
    });
  }
}

/**
 * Edit active user
 *
 * @param {string} userID
 * @param {string} username
 * @param {string} name
 * @param {string} email
 * @param {string} profilePicture
 */
export function editActiveUser( userID, username, name, email, profilePicture ) {
  let data = {
    userID,
    username,
    name,
    email,
    profilePicture,
  };

  return dispatch => {
    return dispatch({
      type: EDIT_ACTIVE_USER,
      payload: axios.post( 'user/edit-profile', data ),
    })
    .catch(( error ) => {
      if ( error instanceof Error ) {
        console.log( error );
      }
    });
  }
}

/**
 * Fetch user
 *
 * @param {string} username
 */
export function fetchUser( username ) {
  let data = {
    username,
  };

  return dispatch => {
    return dispatch({
      type: FETCH_USER,
      payload: axios.post( 'user/fetch', data ),
    })
    .catch(( error ) => {
      if ( error instanceof Error ) {
        console.log( error );
      }
    });
  }
}

/**
 * Search user
 *
 * @param {string} query
 */
export function searchUser( query ) {
  let data = {
    query,
  };

  return dispatch => {
    return dispatch({
      type: SEARCH_USER,
      payload: axios.post( 'user/search', data ),
    })
    .catch(( error ) => {
      if ( error instanceof Error ) {
        console.log( error );
      }
    });
  }
}
