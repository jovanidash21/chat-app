import axios from 'axios';
import {
  FETCH_ACTIVE_USER,
  EDIT_ACTIVE_USER,
  SEARCH_USER,
  BLOCK_USER,
  UNBLOCK_USER,
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
 * Search user
 *
 * @param {string} query
 * @param {string} chatRoomID
 */
export function searchUser( query, chatRoomID = '' ) {
  let data = {
    query,
    chatRoomID,
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

/**
 * Block user
 *
 * @param {string} userID
 * @param {string} blockUserID
 */
export function blockUser( userID, blockUserID ) {
  let data = {
    userID,
    blockUserID,
  };

  return dispatch => {
    return dispatch({
      type: BLOCK_USER,
      payload: axios.post( 'user/block', data ),
      meta: blockUserID,
    })
    .catch(( error ) => {
      if ( error instanceof Error ) {
        console.log( error );
      }
    });
  }
}

/**
 * Unblock user
 *
 * @param {string} userID
 * @param {string} unblockUserID
 */
export function unblockUser( userID, unblockUserID ) {
  let data = {
    userID,
    unblockUserID,
  };

  return dispatch => {
    return dispatch({
      type: UNBLOCK_USER,
      payload: axios.post( 'user/unblock', data ),
      meta: unblockUserID,
    })
    .catch(( error ) => {
      if ( error instanceof Error ) {
        console.log( error );
      }
    });
  }
}
