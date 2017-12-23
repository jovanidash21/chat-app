import axios from 'axios';
import {
  FETCH_MESSAGES,
  SEND_MESSAGE,
  RECEIVE_MESSAGE
} from '../constants/message';

export function fetchMessages(data) {
  return dispatch => {
    return dispatch({
      type: FETCH_MESSAGES,
      payload: axios.get(`/api/message/${data.chatRoomID}/${data.userID}`)
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

export function sendMessage(data) {
  return dispatch => {
    return dispatch({
      type: SEND_MESSAGE,
      payload: axios.post(`/api/message/${data.chatRoomID}/${data.userID}`, data)
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

export function receiveMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    payload: message
  };
}
