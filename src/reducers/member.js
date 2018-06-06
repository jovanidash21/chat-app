import { FETCH_MEMBERS } from '../constants/member';
import { CHANGE_CHAT_ROOM } from '../constants/chat-room';
import {
  SOCKET_BROADCAST_USER_LOGIN,
  SOCKET_BROADCAST_USER_LOGOUT
} from '../constants/auth';

const initialState = {
  isLoading: false,
  activeChatRoom: {
    data: {}
  },
  all: []
};

const member = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_MEMBERS}_LOADING`:
      return {
        ...state,
        isLoading: true
      };
    case `${FETCH_MEMBERS}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isFetchMembersSuccess: true,
        all: action.payload.data
      };
    case `${FETCH_MEMBERS}_ERROR`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case CHANGE_CHAT_ROOM:
      return {
        ...state,
        activeChatRoom: action.chatRoom
      };
    case SOCKET_BROADCAST_USER_LOGIN:
      var user = action.user;
      var userID = user._id;
      var activeChatRoom = {...state.activeChatRoom};
      var members = [...state.all];
      var isUserExist = false;

      for (var i = 0; i < members.length; i++) {
        var member = members[i];

        if ( member._id === userID ) {
          member.isOnline = true;
          isUserExist = true;
          break;
        } else {
          continue
        }
      }

      if ( activeChatRoom.data.chatType === 'public' && !isUserExist ) {
        user.isOnline = true;
        members.push(user);
      }

      return {
        ...state,
        all: [...members]
      }
    case SOCKET_BROADCAST_USER_LOGOUT:
      var userID = action.userID;
      var members = [...state.all]

      for (var i = 0; i < members.length; i++) {
        var member = members[i];

        if ( member._id === userID ) {
          member.isOnline = false;
          break;
        } else {
          continue
        }
      }

      return {
        ...state,
        all: [...members]
      }
    default:
      return state;
  }
}

export default member;
