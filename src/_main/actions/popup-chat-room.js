import axios from 'axios';
import {
  OPEN_POPUP_CHAT_ROOM,
  CLOSE_POPUP_CHAT_ROOM
} from '../constants/popup-chat-room';
import {
  joinChatRoom,
  leaveChatRoom
} from './chat-room';

/**
 * Open popup chat room
 * @param {Object} chatRoom
 * @param {string} userID
 * @param {string} activeChatRoomID
 */
export function openPopUpChatRoom(chatRoom, userID, activeChatRoomID) {
  return dispatch => {
    dispatch({
      type: OPEN_POPUP_CHAT_ROOM,
      chatRoom: chatRoom
    });
    dispatch(joinChatRoom(chatRoom.data._id));
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
