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
 * Send text message
 * @param {string} newMessageID
 * @param {string} text
 * @param {Object} user
 * @param {Object} chatRoom
 */
export function sendTextMessage(newMessageID, text, user, chatRoom) {
  let data = {
    text: text,
    userID: user._id,
    chatRoomID: chatRoom.data._id,
  };

  return dispatch => {
    dispatch({
      type: SEND_MESSAGE,
      message: {
        newMessageID,
        text,
        user,
        chatRoom: chatRoom.data._id
      }
    });
    dispatch({
      type: SEND_MESSAGE,
      payload: axios.post('/api/message/text', data),
      meta: newMessageID
    })
    .then((response) => {
      dispatch({
        type: SOCKET_SEND_MESSAGE,
        message: response.action.payload.data.messageData,
        chatRoomID: chatRoomID
      });
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
