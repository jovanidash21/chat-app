import axios from 'axios';
import {
  FETCH_CHAT_ROOMS,
  CHANGE_CHAT_ROOM,
  CREATE_CHAT_ROOM,
  SOCKET_CREATE_CHAT_ROOM,
  SOCKET_JOIN_CHAT_ROOM,
  SOCKET_LEAVE_CHAT_ROOM
} from '../constants/chat-room';
import { fetchMessages } from './message';

/**
 * Fetch chat rooms
 * @param {string} userID
 */
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

/**
 * Change chat room
 * @param {Object} chatRoom
 */
export function changeChatRoom(chatRoom) {
  return {
    type: CHANGE_CHAT_ROOM,
    payload: chatRoom
  };
}

/**
 * Create chat room
 * @param {string} userID
 * @param {Object} chatRoom
 */
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

/**
 * Create group chat room
 * @param {string} name
 * @param {Array} members
 * @param {string} userID
 */
export function createGroupChatRoom(name, members, userID) {
  let data = {
    name,
    members,
    userID,
  };

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

/**
 * Create direct chat room
 * @param {string} userID
 * @param {string} memberID
 */
export function createDirectChatRoom(userID, memberID) {
  let data = {
    name: '',
    members: [userID, memberID],
    userID: userID,
  };

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

/**
 * Socket join chat room
 * @param {string} chatRoomID
 */
export function socketJoinChatRoom(chatRoomID) {
  return {
    type: SOCKET_JOIN_CHAT_ROOM,
    chatRoom: chatRoomID
  };
}

/**
 * Socket leave chat room
 * @param {string} chatRoomID
 */
export function socketLeaveChatRoom(chatRoomID) {
  return {
    type: SOCKET_LEAVE_CHAT_ROOM,
    chatRoom: chatRoomID
  };
}
