import {
  SOCKET_BROADCAST_USER_LOGIN,
  SOCKET_BROADCAST_USER_LOGOUT
} from '../constants/auth';
import {
  FETCH_CHAT_ROOMS,
  CHANGE_CHAT_ROOM,
  CREATE_CHAT_ROOM,
  SOCKET_CREATE_CHAT_ROOM,
  SOCKET_BROADCAST_CREATE_CHAT_ROOM
} from '../constants/chat-room';

const initialState = {
  isLoading: false,
  active: {},
  all: []
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
        all: action.payload.data.chatRooms
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
    case CHANGE_CHAT_ROOM:
      return {
        ...state,
        active: action.chatRoom
      };
    case SOCKET_BROADCAST_USER_LOGIN:
      var user = action.user;
      var userID = action.user._id;
      var chatRooms = [...state.all];
      var isUserExist = false;

      for (var i = 0; i < 1; i++) {
        var chatRoom = chatRooms[i];

        for (var j = 0; j < chatRoom.members.length; j++) {
          var member = chatRoom.members[j];

          if ( member._id === userID ) {
            isUserExist = true;
            break;
          } else {
            continue
          }
        }
      }

      if ( ! isUserExist ) {
        user.isOnline = true;
        chatRooms[0].members.push(user);
      } else {
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
      }

      return {
        ...state,
        all: [...chatRooms]
      }
    case SOCKET_BROADCAST_USER_LOGOUT:
      var userID = action.user;
      var chatRooms = [...state.all];

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
        all: [...chatRooms]
      }
    case SOCKET_CREATE_CHAT_ROOM:
    case SOCKET_BROADCAST_CREATE_CHAT_ROOM:
      return {
        ...state,
        all: [
          ...state.all,
          action.chatRoom
        ]
      };
    default:
      return state;
  }
}

export default chatRoom;
