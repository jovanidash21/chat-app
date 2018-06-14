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
 * @param {string} chatRoomID
 */
export function sendTextMessage(newMessageID, text, user, chatRoomID) {
  let data = {
    text: text,
    userID: user._id,
    chatRoomID: chatRoomID,
  };

  return dispatch => {
    dispatch({
      type: SEND_MESSAGE,
      message: {
        newMessageID: newMessageID,
        text: text,
        user: user,
        chatRoom: chatRoomID,
        messageType: 'text'
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

/**
 * Send file message
 * @param {string} newMessageID
 * @param {string} text
 * @param {string} file
 * @param {Object} user
 * @param {string} chatRoomID
 */
export function sendFileMessage(newMessageID, text, file, user, chatRoomID) {
  let data = new FormData();
  data.append('text', text);
  data.append('file', file);
  data.append('userID', user._id);
  data.append('chatRoomID', chatRoomID);

  let config = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  };

  var messageType = 'file';

  if ( file.type.indexOf('image/') > -1 ) {
    messageType = 'image';
  }

  return dispatch => {
    dispatch({
      type: SEND_MESSAGE,
      message: {
        newMessageID: newMessageID,
        text: text,
        user: user,
        chatRoom: chatRoomID,
        messageType: messageType,
        fileLink: ''
      }
    });

    dispatch({
      type: SEND_MESSAGE,
      payload: axios.post('/api/message/file', data, config),
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
