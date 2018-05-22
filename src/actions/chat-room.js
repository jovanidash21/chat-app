import axios from 'axios';
import {
  FETCH_CHAT_ROOMS,
  CREATE_CHAT_ROOM,
  SOCKET_CREATE_CHAT_ROOM,
  SOCKET_JOIN_CHAT_ROOM,
  SOCKET_LEAVE_CHAT_ROOM
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

export function createGroupChatRoom(data) {
  return dispatch => {
    return dispatch({
      type: CREATE_CHAT_ROOM,
      payload: axios.post(`/api/chat-room/group/${data.userID}`, data)
    })
    .then((response) => {
      dispatch({
        type: SOCKET_CREATE_CHAT_ROOM,
        chatRoom: response.action.payload.data.chatRoomData,
        members: response.action.payload.data.chatRoomData.members
      });
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

export function createDirectChatRoom(data) {
  return dispatch => {
    return dispatch({
      type: CREATE_CHAT_ROOM,
      payload: axios.post(`/api/chat-room/direct/${data.userID}`, data)
    })
    .then((response) => {
      dispatch({
        type: SOCKET_CREATE_CHAT_ROOM,
        chatRoom: response.action.payload.data.chatRoomData,
        members: response.action.payload.data.chatRoomData.members
      });
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

export function socketJoinChatRoom(chatRoom) {
  return {
    type: SOCKET_JOIN_CHAT_ROOM,
    chatRoom: chatRoom
  };
}

export function socketLeaveChatRoom(chatRoom) {
  return {
    type: SOCKET_LEAVE_CHAT_ROOM,
    chatRoom: chatRoom
  };
}
