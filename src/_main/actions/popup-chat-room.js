import axios from 'axios';
import {
  OPEN_POPUP_CHAT_ROOM,
  CLOSE_POPUP_CHAT_ROOM,
  FETCH_POPUP_CHAT_ROOM_NEW_MESSAGES
} from '../constants/popup-chat-room';
import {
  joinChatRoom,
  leaveChatRoom
} from './chat-room';
import { getBaseURL } from '../../utils/url';

const baseURL = getBaseURL();

/**
 * Open popup chat room
 * @param {Object} chatRoom
 * @param {string} userID
 * @param {string} activeChatRoomID
 */
export function openPopUpChatRoom(chatRoom, userID, activeChatRoomID) {
  const commonStateFlags = {
    loading: false,
    success: false,
    error: false,
    message: ''
  };

  const extraChatRoomData = {
    message: {
      fetchNew: {...commonStateFlags},
      fetchOld: {...commonStateFlags},
      send: {...commonStateFlags},
      delete: {...commonStateFlags},
      all: []
    }
  };

  return dispatch => {
    dispatch({
      type: OPEN_POPUP_CHAT_ROOM,
      chatRoom: {
        ...chatRoom,
        ...extraChatRoomData
      }
    });
    dispatch(joinChatRoom(chatRoom.data._id));
    dispatch(fetchPopUpChatRoomNewMessages(chatRoom.data._id, userID));
  }
}

/**
 * Close popup chat room
 * @param {string} chatRoomID
 */
export function closePopUpChatRoom(chatRoomID) {
  return dispatch => {
    dispatch({
      type: CLOSE_POPUP_CHAT_ROOM,
      chatRoomID: chatRoomID
    });
    dispatch(leaveChatRoom(chatRoomID));
  }
}

/**
 * Fetch popup chat room new messages
 * @param {string} chatRoomID
 * @param {string} userID
 */
export function fetchPopUpChatRoomNewMessages(chatRoomID, userID) {
  let data = {
    chatRoomID: chatRoomID,
    userID: userID,
    skipCount: 0
  };

  return dispatch => {
    return dispatch({
      type: FETCH_POPUP_CHAT_ROOM_NEW_MESSAGES,
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
