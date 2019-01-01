import axios from 'axios';
import {
  FETCH_NEW_MESSAGES,
  FETCH_OLD_MESSAGES,
  SEND_MESSAGE,
  SOCKET_SEND_MESSAGE,
  DELETE_MESSAGE,
  SOCKET_DELETE_MESSAGE
} from '../constants/message';
import { getBaseURL } from '../../utils/url';

const baseURL = getBaseURL();

/**
 * Fetch new messages
 * @param {string} chatRoomID
 * @param {string} userID
 */
export function fetchNewMessages(chatRoomID, userID) {
  let data = {
    chatRoomID: chatRoomID,
    userID: userID,
    skipCount: 0
  };

  return dispatch => {
    return dispatch({
      type: FETCH_NEW_MESSAGES,
      payload: axios.post(baseURL + '/api/message', data),
      meta: chatRoomID
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Fetch old messages
 * @param {string} chatRoomID
 * @param {string} userID
 * @param {number} skipCount
 */
export function fetchOldMessages(chatRoomID, userID, skipCount) {
  let data = {
    chatRoomID: chatRoomID,
    userID: userID,
    skipCount: skipCount
  };

  return dispatch => {
    return dispatch({
      type: FETCH_OLD_MESSAGES,
      payload: axios.post(baseURL + '/api/message', data),
      meta: chatRoomID
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
        _id: newMessageID,
        createdAt: (new Date()).toString(),
        text: text,
        user: user,
        chatRoom: chatRoomID,
        messageType: 'text',
        isSending: true
      }
    });
    dispatch({
      type: SEND_MESSAGE,
      payload: axios.post(baseURL + '/api/message/text', data),
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
 * @param {Object} file
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
        _id: newMessageID,
        createdAt: (new Date()).toString(),
        text: text,
        user: user,
        chatRoom: chatRoomID,
        messageType: messageType,
        fileLink: '',
        isSending: true
      }
    });

    dispatch({
      type: SEND_MESSAGE,
      payload: axios.post(baseURL + '/api/message/file', data, config),
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
 * Send audio message
 * @param {string} newMessageID
 * @param {string} text
 * @param {Object} audioBlob
 * @param {Object} user
 * @param {string} chatRoomID
 */
export function sendAudioMessage(newMessageID, text, audioBlob, user, chatRoomID) {
  let audio = new Blob([audioBlob], {type: "audio/webm"});

  let data = new FormData();
  data.append('text', text);
  data.append('audio', audio);
  data.append('userID', user._id);
  data.append('chatRoomID', chatRoomID);

  let config = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  };

  return dispatch => {
    dispatch({
      type: SEND_MESSAGE,
      message: {
        _id: newMessageID,
        createdAt: (new Date()).toString(),
        text: text,
        user: user,
        chatRoom: chatRoomID,
        messageType: 'audio',
        fileLink: '',
        isSending: true
      }
    });

    dispatch({
      type: SEND_MESSAGE,
      payload: axios.post(baseURL + '/api/message/audio', data, config),
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
 * Delete message
 * @param {string} messageID
 * @param {string} chatRoomID
 */
export function deleteMessage(messageID, chatRoomID) {
  let data = {
    messageID,
    chatRoomID
  };

  return dispatch => {
    return dispatch({
      type: DELETE_MESSAGE,
      payload: axios.post(baseURL + '/api/message/delete', data),
      meta: {
        messageID: messageID,
        chatRoomID: chatRoomID
      }
    })
    .then((response) => {
      dispatch({
        type: SOCKET_DELETE_MESSAGE,
        messageID: messageID,
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
