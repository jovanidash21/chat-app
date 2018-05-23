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

function createChatRoom(userID, chatRoom) {
  return dispatch => {
    var chatRoomBroadcast = {...chatRoom};
    var membersBroadcast = chatRoomBroadcast.members.slice();
    var index = -1;

    for (var i = 0; i < membersBroadcast.length; i++) {
      var member = membersBroadcast[i];

      if (member._id == userID) {
        index = i;
        break;
      } else {
        continue;
      }
    }

    if ( index != -1 ) {
    	membersBroadcast.splice(index, 1);
    }

    if (chatRoom.chatType === 'direct') {
      for (var j = 0; j < chatRoom.members.length; j++) {
        var member = chatRoom.members[j];

        if (member._id != userID) {
          chatRoom.name = member.name;
          chatRoom.chatIcon = member.profilePicture;
        } else {
          chatRoomBroadcast.name = member.name;
          chatRoomBroadcast.chatIcon = member.profilePicture;
        }
      }
    }

    dispatch({
      type: SOCKET_CREATE_CHAT_ROOM,
      chatRoom: chatRoom,
      chatRoomBroadcast: chatRoomBroadcast,
      members: membersBroadcast
    });
    dispatch(socketJoinChatRoom(chatRoom._id));
    dispatch(changeChatRoom(chatRoom));
    dispatch(fetchMessages({
      userID: userID,
      chatRoomID: chatRoom._id
    }));
  }
}

export function createGroupChatRoom(data) {
  return dispatch => {
    return dispatch({
      type: CREATE_CHAT_ROOM,
      payload: axios.post(`/api/chat-room/group/${data.userID}`, data)
    })
    .then((response) => {
      dispatch(createChatRoom(data.userID, response.action.payload.data.chatRoomData));
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
      dispatch(createChatRoom(data.userID, response.action.payload.data.chatRoomData));
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
