import {
  SOCKET_USER_LOGIN,
  SOCKET_BROADCAST_USER_LOGIN,
  SOCKET_BROADCAST_USER_LOGOUT
} from '../constants/auth';
import {
  FETCH_CHAT_ROOMS,
  CREATE_CHAT_ROOM,
  SOCKET_CREATE_CHAT_ROOM,
  SOCKET_BROADCAST_CREATE_CHAT_ROOM
} from '../constants/chat-room';

const initialState = {
  isLoading: false,
  chatRooms: []
};

const chatRoom = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_CHAT_ROOMS}_LOADING`:
      return {
        ...state,
        isLoading: true
      };
    case `${CREATE_CHAT_ROOM}_LOADING`:
      return {
        ...state
      };
    case `${FETCH_CHAT_ROOMS}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isFetchChatRoomsSuccess: true,
        chatRooms: action.payload.data.chatRooms
      };
    case `${CREATE_CHAT_ROOM}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isCreateChatRoomSuccess: true
      };
    case `${FETCH_CHAT_ROOMS}_ERROR`:
    case `${CREATE_CHAT_ROOM}_ERROR`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case SOCKET_USER_LOGIN:
    case SOCKET_BROADCAST_USER_LOGIN:
      var userID = action.user;
      var chatRooms = [...state.chatRooms];

      for (var i = 0; i < chatRooms.length; i++) {
        var chatRoom = chatRooms[i];

        for (var j = 0; j < chatRoom.members.length; j++) {
          var member = chatRoom.members[j];

          if ( member._id === userID ) {
            member.isOnline = true;
            break;
          } else {
            continue
          }
        }
      }

      return {
        ...state,
        chatRooms: [...chatRooms]
      }
    case SOCKET_BROADCAST_USER_LOGOUT:
      var userID = action.user;
      var chatRooms = [...state.chatRooms];

      for (var i = 0; i < chatRooms.length; i++) {
        var chatRoom = chatRooms[i];

        for (var j = 0; j < chatRoom.members.length; j++) {
          var member = chatRoom.members[j];

          if ( member._id === userID ) {
            member.isOnline = false;
            break;
          } else {
            continue
          }
        }
      }

      return {
        ...state,
        chatRooms: [...chatRooms]
      }
    case SOCKET_CREATE_CHAT_ROOM:
    case SOCKET_BROADCAST_CREATE_CHAT_ROOM:
      return {
        ...state,
        chatRooms: [
          ...state.chatRooms,
          action.chatRoom
        ]
      };
    default:
      return state;
  }
}

export default chatRoom;
