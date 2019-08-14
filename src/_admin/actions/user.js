import axios from 'axios';
import {
  FETCH_ACTIVE_USER,
  FETCH_USERS_COUNT,
  FETCH_USERS_GRAPH,
  FETCH_SELECTED_USER,
  FETCH_USERS,
  EDIT_ACTIVE_USER,
  SEARCH_USER,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
} from '../constants/user';

/**
 * Fetch active user
 */
export function fetchActiveUser() {
  return dispatch => {
    return dispatch({
      type: FETCH_ACTIVE_USER,
      payload: axios.get('/user'),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Fetch users count
 */
export function fetchUsersCount() {
  return dispatch => {
    return dispatch({
      type: FETCH_USERS_COUNT,
      payload: axios.get('/user/count'),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Fetch users graph
 */
export function fetchUsersGraph() {
  return dispatch => {
    return dispatch({
      type: FETCH_USERS_GRAPH,
      payload: axios.get('/user/graph'),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Fetch selected user
 *
 * @param {string} userID
 */
export function fetchSelectedUser(userID) {
  const data = { userID };

  return dispatch => {
    return dispatch({
      type: FETCH_SELECTED_USER,
      payload: axios.post('/user/select', data),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Fetch users
 */
export function fetchUsers() {
  return dispatch => {
    return dispatch({
      type: FETCH_USERS,
      payload: axios.get('/user/all'),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
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
export function editActiveUser(userID, username, name, email, profilePicture) {
  const data = {
    userID,
    username,
    name,
    email,
    profilePicture,
  };

  return dispatch => {
    return dispatch({
      type: EDIT_ACTIVE_USER,
      payload: axios.post('/user/edit-profile', data),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
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
export function searchUser(query, chatRoomID = '') {
  const data = {
    query,
    chatRoomID,
  };

  return dispatch => {
    return dispatch({
      type: SEARCH_USER,
      payload: axios.post('/user/search', data),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Create user
 *
 * @param {string} username
 * @param {string} name
 * @param {string} email
 * @param {string} role
 * @param {string} password
 * @param {string} profilePicture
 */
export function createUser(username, name, email, role, password, profilePicture) {
  const data = {
    username,
    name,
    email,
    role,
    password,
    profilePicture,
  };

  return dispatch => {
    return dispatch({
      type: CREATE_USER,
      payload: axios.post('/user/create', data),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Edit user
 *
 * @param {string} userID
 * @param {string} username
 * @param {string} name
 * @param {string} email
 * @param {string} role
 * @param {string} profilePicture
 */
export function editUser(userID, username, name, email, role, profilePicture) {
  const data = {
    userID,
    username,
    name,
    email,
    role,
    profilePicture,
  };

  return dispatch => {
    return dispatch({
      type: EDIT_USER,
      payload: axios.post('/user/edit', data),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Delete user
 *
 * @param {string} userID
 */
export function deleteUser(userID) {
  const data = { userID };

  return dispatch => {
    return dispatch({
      type: DELETE_USER,
      payload: axios.post('/user/delete', data),
      meta: userID,
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
