import axios from 'axios';
import {
  FETCH_CHAT_ROOMS_COUNT,
  FETCH_SELECTED_CHAT_ROOM,
  FETCH_CHAT_ROOMS,
  CREATE_CHAT_ROOM,
  EDIT_CHAT_ROOM,
  DELETE_CHAT_ROOM,
} from '../constants/chat-room';

/**
 * Fetch chat rooms count
 */
export function fetchChatRoomsCount() {
  return dispatch => {
    return dispatch({
      type: FETCH_CHAT_ROOMS_COUNT,
      payload: axios.get('/chat-room/count'),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Fetch selected chat room
 *
 * @param {string} chatRoomID
 */
export function fetchSelectedChatRoom(chatRoomID) {
  const data = { chatRoomID };

  return dispatch => {
    return dispatch({
      type: FETCH_SELECTED_CHAT_ROOM,
      payload: axios.post('/chat-room/select', data),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Fetch chat rooms
 */
export function fetchChatRooms() {
  return dispatch => {
    return dispatch({
      type: FETCH_CHAT_ROOMS,
      payload: axios.get('/chat-room/all'),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Create chat room
 *
 * @param {string} chatType
 * @param {string} name
 * @param {string} members
 * @param {string} chatIcon
 */
export function createChatRoom(chatType, name, members, chatIcon) {
  let data = {
    chatType,
    name,
    members,
    chatIcon,
  };

  return dispatch => {
    return dispatch({
      type: CREATE_CHAT_ROOM,
      payload: axios.post('/chat-room/create', data),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Edit chat room
 *
 * @param {string} chatRoomID
 * @param {string} chatType
 * @param {string} name
 * @param {string} members
 * @param {string} chatIcon
 */
export function editChatRoom(chatRoomID, chatType, name, members, chatIcon) {
  let data = {
    chatRoomID,
    chatType,
    name,
    members,
    chatIcon,
  };

  return dispatch => {
    return dispatch({
      type: EDIT_CHAT_ROOM,
      payload: axios.post('/chat-room/edit', data),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Delete chat room
 *
 * @param {string} chatRoomID
 */
export function deleteChatRoom(chatRoomID) {
  const data = { chatRoomID };

  return dispatch => {
    return dispatch({
      type: DELETE_CHAT_ROOM,
      payload: axios.post('/chat-room/delete', data),
      meta: chatRoomID,
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
