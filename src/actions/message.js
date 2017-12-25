import axios from 'axios';
import {
  FETCH_MESSAGES,
  SEND_MESSAGE,
  SOCKET_SEND_MESSAGE
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

export function sendMessage(message) {
  return dispatch => {
    dispatch({
      type: SEND_MESSAGE,
      message: message
    });
    dispatch({
      type: SEND_MESSAGE,
      payload: axios.post(`/api/message/${message.chatRoom._id}/${message.user._id}`, message)
    })
    .then((response) => {
      dispatch({
        type: SOCKET_SEND_MESSAGE,
        message: response.action.payload.data.messageData,
        newMessageID: message.newMessageID,
        chatRoom: message.chatRoom._id
      });
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
