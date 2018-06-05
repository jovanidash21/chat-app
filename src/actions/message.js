import axios from 'axios';
import {
  FETCH_MESSAGES,
  SEND_MESSAGE,
  SOCKET_SEND_MESSAGE
} from '../constants/message';

/**
 * Fetch messages
 * @param {string} chatRoomID
 * @param {string} userID
 */
export function fetchMessages(chatRoomID, userID) {
  return dispatch => {
    return dispatch({
      type: FETCH_MESSAGES,
      payload: axios.get(`/api/message/${chatRoomID}/${userID}`)
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Send message
 * @param {string} newMessageID
 * @param {string} text
 * @param {Object} user
 * @param {Object} chatRoom
 */
export function sendMessage(newMessageID, text, user, chatRoom) {
  let data = {
    newMessageID,
    text,
    user,
    chatRoom,
  };

  return dispatch => {
    dispatch({
      type: SEND_MESSAGE,
      message: data
    });
    dispatch({
      type: SEND_MESSAGE,
      payload: axios.post(`/api/message/${chatRoom.data._id}/${user._id}`, data),
      meta: newMessageID
    })
    .then((response) => {
      dispatch({
        type: SOCKET_SEND_MESSAGE,
        message: response.action.payload.data.messageData,
        chatRoomID: chatRoom.data._id
      });
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
