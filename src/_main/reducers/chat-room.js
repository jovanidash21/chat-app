import {
  FETCH_CHAT_ROOMS,
  CHANGE_CHAT_ROOM,
  CREATE_CHAT_ROOM,
  SOCKET_CREATE_CHAT_ROOM,
  SOCKET_BROADCAST_CREATE_CHAT_ROOM,
  CLEAR_CHAT_ROOM_UNREAD_MESSAGES,
  MUTE_CHAT_ROOM,
  UNMUTE_CHAT_ROOM
} from '../constants/chat-room';
import { SOCKET_BROADCAST_USER_LOGIN } from '../constants/auth';
import {
  FETCH_NEW_MESSAGES,
  SOCKET_BROADCAST_NOTIFY_MESSAGE
} from '../constants/message';

const chatRoomPriority = (chatRoom) => {
  var priority = -1;

  switch (chatRoom.chatType) {
    case 'public':
      priority = 1;
      break;
    case 'private':
      priority = 2;
      break;
    default:
      priority = 3;
      break;
  }

  return priority;
}

const commonStateFlags = {
  loading: false,
  success: false,
  error: false,
  message: ''
};

const initialState = {
  fetch: {...commonStateFlags},
  create: {...commonStateFlags},
  clear: {...commonStateFlags},
  mute: {...commonStateFlags},
  unmute: {...commonStateFlags},
  active: {
    data: {}
  },
  all: []
};

const chatRoom = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_CHAT_ROOMS}_LOADING`:
      return {
        ...state,
        fetch: {
          ...state.fetch,
          loading: true
        }
      };
    case `${CREATE_CHAT_ROOM}_LOADING`:
      return {
        ...state,
        create: {
          ...state.create,
          loading: true
        }
      };
    case `${CLEAR_CHAT_ROOM_UNREAD_MESSAGES}_LOADING`:
      return {
        ...state,
        clear: {
          ...state.clear,
          loading: true
        }
      };
    case `${MUTE_CHAT_ROOM}_LOADING`:
      return {
        ...state,
        mute: {
          ...state.mute,
          loading: true
        }
      };
    case `${UNMUTE_CHAT_ROOM}_LOADING`:
      return {
        ...state,
        unmute: {
          ...state.unmute,
          loading: true
        }
      };
    case `${FETCH_CHAT_ROOMS}_SUCCESS`:
      var chatRooms = [...action.payload.data.chatRooms];

      for (var i = 0; i < chatRooms.length; i++) {
        var chatRoom = chatRooms[i];

        chatRoom.priority = chatRoomPriority(chatRoom.data);
      }

      return {
        ...state,
        fetch: {
          ...state.fetch,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message
        },
        all: [...chatRooms]
      };
    case `${CREATE_CHAT_ROOM}_SUCCESS`:
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message
        }
      };
    case `${CLEAR_CHAT_ROOM_UNREAD_MESSAGES}_SUCCESS`:
      var chatRoomID = action.payload.data.chatRoomID;
      var chatRooms = [...state.all];

      for (var i = 0; i < chatRooms.length; i++) {
        var chatRoom = chatRooms[i];

        if ( 
          chatRoom.data.chatType !== 'public' &&
          chatRoom.data.chatType !== 'private' &&
          !chatRoom.mute.data &&
          chatRoom.unReadMessages > 0
        ) {
          if ( chatRoomID === 'all' ) {
            chatRoom.unReadMessages = 0;
          } else if ( chatRoom.data._id === chatRoomID ) {
            chatRoom.unReadMessages = 0;
            break;
          }
        }
      }

      return {
        ...state,
        clear: {
          ...state.clear,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message
        },
        all: [...chatRooms]
      };
    case `${MUTE_CHAT_ROOM}_SUCCESS`:
      var chatRoomID = action.payload.data.chatRoomID;
      var activeChatRoom = {...state.active};
      var chatRooms = [...state.all];

      if ( activeChatRoom.data._id === chatRoomID ) {
        activeChatRoom.mute.data = true;
      }

      for (var i = 0; i < chatRooms.length; i++) {
        var chatRoom = chatRooms[i];

        if ( chatRoom.data._id === chatRoomID ) {
          chatRoom.mute.data = true;
          break;
        } else {
          continue;
        }
      }

      return {
        ...state,
        mute: {
          ...state.mute,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message
        },
        active: {...activeChatRoom},
        all: [...chatRooms]
      };
    case `${UNMUTE_CHAT_ROOM}_SUCCESS`:
      var chatRoomID = action.payload.data.chatRoomID;
      var activeChatRoom = {...state.active};
      var chatRooms = [...state.all];

      if ( activeChatRoom.data._id === chatRoomID ) {
        activeChatRoom.mute.data = false;
      }

      for (var i = 0; i < chatRooms.length; i++) {
        var chatRoom = chatRooms[i];

        if ( chatRoom.data._id === chatRoomID ) {
          chatRoom.mute.data = false;
          break;
        } else {
          continue;
        }
      }

      return {
        ...state,
        unmute: {
          ...state.unmute,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message
        },
        active: {...activeChatRoom},
        all: [...chatRooms]
      };
    case `${FETCH_CHAT_ROOMS}_ERROR`:
      return {
        ...state,
        fetch: {
          ...state.fetch,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message
        }
      };
    case `${CREATE_CHAT_ROOM}_ERROR`:
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message
        }
      };
    case `${MUTE_CHAT_ROOM}_ERROR`:
      return {
        ...state,
        mute: {
          ...state.mute,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message
        }
      };
    case `${CLEAR_CHAT_ROOM_UNREAD_MESSAGES}_ERROR`:
      return {
        ...state,
        clear: {
          ...state.clear,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message
        }
      };
    case `${UNMUTE_CHAT_ROOM}_ERROR`:
      return {
        ...state,
        unmute: {
          ...state.unmute,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message
        }
      };
    case CHANGE_CHAT_ROOM:
      return {
        ...state,
        active: action.chatRoom
      };
    case SOCKET_CREATE_CHAT_ROOM:
    case SOCKET_BROADCAST_CREATE_CHAT_ROOM:
      var chatRoom = {...action.chatRoom};

      chatRoom.priority = chatRoomPriority(chatRoom.data);

      return {
        ...state,
        all: [
          ...state.all,
          {...chatRoom}
        ]
      };
    case SOCKET_BROADCAST_USER_LOGIN:
      var user = action.user;
      var userID = user._id;
      var activeChatRoom = {...state.active};
      var members = activeChatRoom.data.members;

      if (
        activeChatRoom.data.chatType === 'public' &&
        members.indexOf(userID) == -1
      ) {
        members.push(userID);
      }

      return {
        ...state,
        active: {...activeChatRoom}
      }
    case `${FETCH_NEW_MESSAGES}_SUCCESS`:
      var activeChatRoom = {...state.active};
      var chatRooms = [...state.all];

      for (var i = 0; i < chatRooms.length; i++) {
        var chatRoom = chatRooms[i];

        if ( chatRoom.data._id === activeChatRoom.data._id ) {
          chatRoom.unReadMessages = 0;
          activeChatRoom.unReadMessages = 0;
          break;
        } else {
          continue;
        }
      }

      return {
        ...state,
        all: [...chatRooms]
      }
    case SOCKET_BROADCAST_NOTIFY_MESSAGE:
      var chatRooms = [...state.all];
      var chatRoomID = action.chatRoomID;

      for (var i = 0; i < chatRooms.length; i++) {
        var chatRoom = chatRooms[i];

        if ( chatRoom.data._id === chatRoomID ) {
          chatRoom.unReadMessages++;
          break;
        } else {
          continue;
        }
      }

      return {
        ...state,
        all: [...chatRooms]
      }
    default:
      return state;
  }
}

export default chatRoom;
