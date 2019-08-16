import axios from 'axios';
import {
  FETCH_BLOCKED_USERS,
  BLOCK_USER,
  UNBLOCK_USER,
  UNBLOCK_ALL_USERS,
} from '../constants/blocked-user';

/**
 * Fetch blocked users
 *
 * @param {string} userID
 */
export function fetchBlockedUsers(userID) {
  const data = { userID };

  return dispatch => {
    return dispatch({
      type: FETCH_BLOCKED_USERS,
      payload: axios.post('/blocked-user', data),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
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
export function blockUser(userID, blockUserID) {
  const data = {
    userID,
    blockUserID,
  };

  return dispatch => {
    return dispatch({
      type: BLOCK_USER,
      payload: axios.post('/blocked-user/block', data),
      meta: blockUserID,
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
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
export function unblockUser(userID, unblockUserID) {
  const data = {
    userID,
    unblockUserID,
  };

  return dispatch => {
    return dispatch({
      type: UNBLOCK_USER,
      payload: axios.post('/blocked-user/unblock', data),
      meta: unblockUserID,
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Unblock all users
 *
 * @param {string} userID
 */
export function unblockAllUsers(userID) {
  const data = { userID };

  return dispatch => {
    return dispatch({
      type: UNBLOCK_ALL_USERS,
      payload: axios.post('/blocked-user/unblock-all', data),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
