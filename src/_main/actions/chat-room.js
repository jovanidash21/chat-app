import axios from 'axios';
import {
  FETCH_CHAT_ROOMS,
  CHANGE_CHAT_ROOM,
  CREATE_CHAT_ROOM,
  SOCKET_CREATE_CHAT_ROOM,
  SOCKET_JOIN_CHAT_ROOM,
  SOCKET_LEAVE_CHAT_ROOM,
  CLEAR_CHAT_ROOM_UNREAD_MESSAGES,
  MUTE_CHAT_ROOM,
  UNMUTE_CHAT_ROOM,
} from '../constants/chat-room';
import { fetchNewMessages } from './message';
import { fetchMembers } from './member';

/**
 * Fetch chat rooms
 *
 * @param {string} userID
 */
export function fetchChatRooms(userID) {
  const data = { userID };

  return dispatch => {
    return dispatch({
      type: FETCH_CHAT_ROOMS,
      payload: axios.post('/chat-room', data),
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
 *
 * @param {Object} chatRoom
 * @param {string} userID
 * @param {string} activeChatRoomID
 */
export function changeChatRoom(chatRoom, userID, activeChatRoomID) {
  return dispatch => {
    dispatch({
      type: CHANGE_CHAT_ROOM,
      chatRoom,
    });
    dispatch(leaveChatRoom(activeChatRoomID));
    dispatch(joinChatRoom(chatRoom.data._id));
    dispatch(fetchNewMessages(chatRoom.data._id, userID));
    dispatch(fetchMembers(chatRoom.data._id, userID));
  }
}

/**
 * Create chat room
 *
 * @param {string} userID
 * @param {Object} chatRoom
 * @param {string} activeChatRoomID
 * @param {boolean} noChangeChatRoom
 */
function createChatRoom(userID, chatRoom, activeChatRoomID, noChangeChatRoom = false) {
  return dispatch => {
    let chatRoomBroadcast = { ...chatRoom };
    let membersBroadcast = chatRoomBroadcast.data.members.slice();

    const userIndex = membersBroadcast.findIndex(singleMember => {
      return singleMember._id === userID;
    });

    if ( userIndex > -1 ) {
    	membersBroadcast.splice( userIndex, 1 );
    }

    const chatRoomData = { ...chatRoom.data };

    if (chatRoom.data.chatType === 'direct') {
      for (let j = 0; j < chatRoom.data.members.length; j++) {
        const member = chatRoom.data.members[j];

        if ( member._id != userID ) {
          chatRoomData.name = member.name;
          chatRoomData.chatIcon = member.profilePicture;
        } else {
          chatRoomBroadcast.data.name = member.name;
          chatRoomBroadcast.data.chatIcon = member.profilePicture;
        }
      }
    }

    chatRoom.data = chatRoomData;

    dispatch({
      type: SOCKET_CREATE_CHAT_ROOM,
      chatRoom: chatRoom,
      chatRoomBroadcast: chatRoomBroadcast,
      members: membersBroadcast,
    });

    if (!noChangeChatRoom) {
      dispatch(changeChatRoom(chatRoom, userID, activeChatRoomID));
    }
  }
}

/**
 * Create group chat room
 *
 * @param {string} name
 * @param {Array} members
 * @param {string} userID
 * @param {string} activeChatRoomID
 */
export function createGroupChatRoom(name, members, userID, activeChatRoomID) {
  const data = {
    chatType: 'group',
    name,
    members,
  };

  return dispatch => {
    return dispatch({
      type: CREATE_CHAT_ROOM,
      payload: axios.post('/chat-room/create', data),
    })
    .then((response) => {
      dispatch( createChatRoom(userID, response.action.payload.data.chatRoom, activeChatRoomID));
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
 *
 * @param {string} userID
 * @param {string} memberID
 * @param {string} activeChatRoomID
 * @param {boolean} noChangeChatRoom
 */
export function createDirectChatRoom(userID, memberID, activeChatRoomID, noChangeChatRoom = false) {
  const data = {
    chatType: 'direct',
    name: '',
    members: [userID, memberID],
  };

  return dispatch => {
    return dispatch({
      type: CREATE_CHAT_ROOM,
      payload: axios.post('/chat-room/create', data),
    })
    .then((response) => {
      const chatRoom = response.action.payload.data.chatRoom;

      dispatch(createChatRoom(userID, chatRoom, activeChatRoomID, noChangeChatRoom));

      return chatRoom;
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
 *
 * @param {string} chatRoomID
 */
export function joinChatRoom(chatRoomID) {
  return {
    type: SOCKET_JOIN_CHAT_ROOM,
    chatRoomID,
  };
}

/**
 * Socket leave chat room
 *
 * @param {string} chatRoomID
 */
export function leaveChatRoom(chatRoomID) {
  return {
    type: SOCKET_LEAVE_CHAT_ROOM,
    chatRoomID,
  };
}

/**
 * Clear chat room unread messages
 *
 * @param {string} userID
 * @param {Array} chatRoomIDs
 */
export function clearChatRoomUnreadMessages(userID, chatRoomIDs) {
  const data = {
    userID,
    chatRoomIDs,
  };

  return dispatch => {
    return dispatch({
      type: CLEAR_CHAT_ROOM_UNREAD_MESSAGES,
      payload: axios.post('/chat-room/clear-unread', data),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Mute chat room
 *
 * @param {string} userID
 * @param {string} chatRoomID
 */
export function muteChatRoom(userID, chatRoomID) {
  const data = {
    userID,
    chatRoomID,
  };

  return dispatch => {
    return dispatch({
      type: MUTE_CHAT_ROOM,
      payload: axios.post('/chat-room/mute', data),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Unmute chat room
 *
 * @param {string} userID
 * @param {string} chatRoomID
 */
export function unmuteChatRoom(userID, chatRoomID) {
  const data = {
    userID,
    chatRoomID,
  };

  return dispatch => {
    return dispatch({
      type: UNMUTE_CHAT_ROOM,
      payload: axios.post('/chat-room/unmute', data),
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}
