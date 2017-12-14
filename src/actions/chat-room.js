import axios from 'axios';
import {
  FETCH_CHAT_ROOMS,
  CREATE_CHAT_ROOM,
  RECEIVE_CHAT_ROOM
} from '../constants/chat-room';

export function fetchChatRooms(userID) {
  return dispatch => {
    return dispatch({
      type: FETCH_CHAT_ROOMS,
      payload: axios.get(`/api/chat-room/${userID}`)
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

export function createChatRoom(data) {
  return dispatch => {
    return dispatch({
      type: CREATE_CHAT_ROOM,
      payload: axios.post(`/api/chat-room/${data.userID}`, data)
    })
    .then(() => {
      dispatch(fetchChatRooms(data.userID));
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

export function receiveChatRoom(chatRoom) {
  return {
    type: RECEIVE_CHAT_ROOM,
    payload: chatRoom
  };
}
