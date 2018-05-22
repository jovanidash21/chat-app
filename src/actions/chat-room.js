import axios from 'axios';
import {
  FETCH_CHAT_ROOMS,
  CREATE_CHAT_ROOM,
  SOCKET_CREATE_CHAT_ROOM,
  SOCKET_JOIN_CHAT_ROOM,
  SOCKET_LEAVE_CHAT_ROOM
} from '../constants/chat-room';
import { changeChatRoom } from './active-chat-room';
import { fetchMessages } from './message';

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
      const chatRoomData = response.action.payload.data.chatRoomData;

      dispatch({
        type: SOCKET_CREATE_CHAT_ROOM,
        chatRoom: chatRoomData,
        members: chatRoomData.members
      });
      dispatch(socketJoinChatRoom(chatRoomData._id));
      dispatch(changeChatRoom(chatRoomData));
      dispatch(fetchMessages({
        userID: data.userID,
        chatRoomID: chatRoomData._id
      }));
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
      const chatRoomData = response.action.payload.data.chatRoomData;

      dispatch({
        type: SOCKET_CREATE_CHAT_ROOM,
        chatRoom: chatRoomData,
        members: chatRoomData.members
      });
      dispatch(socketJoinChatRoom(chatRoomData._id));
      dispatch(changeChatRoom(chatRoomData));
      dispatch(fetchMessages({
        userID: data.userID,
        chatRoomID: chatRoomData._id
      }));
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
