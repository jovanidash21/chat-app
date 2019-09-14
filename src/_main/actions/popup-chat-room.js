import {
  OPEN_POPUP_CHAT_ROOM,
  CLOSE_POPUP_CHAT_ROOM,
} from '../constants/popup-chat-room';
import {
  joinChatRoom,
  leaveChatRoom,
} from './chat-room';
import { fetchNewMessages } from './message';

/**
 * Open popup chat room
 *
 * @param {Object} chatRoom
 * @param {string} userID
 * @param {string} activeChatRoomID
 */
export function openPopUpChatRoom(chatRoom, userID, activeChatRoomID) {
  const commonStateFlags = {
    loading: false,
    success: false,
    error: false,
    message: '',
  };

  const extraChatRoomData = {
    message: {
      fetchNew: {...commonStateFlags},
      fetchOld: {...commonStateFlags},
      send: {...commonStateFlags},
      delete: {...commonStateFlags},
      all: [],
    },
    typer: {
      all: [],
    },
  };

  return dispatch => {
    dispatch({
      type: OPEN_POPUP_CHAT_ROOM,
      chatRoom: {
        ...chatRoom,
        ...extraChatRoomData,
      },
    });
    dispatch(joinChatRoom(chatRoom.data._id));
    dispatch(fetchNewMessages(chatRoom.data._id, userID));
  }
}

/**
 * Close popup chat room
 *
 * @param {string} chatRoomID
 */
export function closePopUpChatRoom(chatRoomID) {
  return dispatch => {
    dispatch({
      type: CLOSE_POPUP_CHAT_ROOM,
      chatRoomID,
    });
    dispatch(leaveChatRoom(chatRoomID));
  }
}
