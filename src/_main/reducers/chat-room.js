import {
  FETCH_CHAT_ROOMS,
  CHANGE_CHAT_ROOM,
  CREATE_CHAT_ROOM,
  SOCKET_CREATE_CHAT_ROOM,
  SOCKET_BROADCAST_CREATE_CHAT_ROOM,
  CLEAR_CHAT_ROOM_UNREAD_MESSAGES,
  MUTE_CHAT_ROOM,
  UNMUTE_CHAT_ROOM,
} from '../constants/chat-room';
import {
  SOCKET_BROADCAST_USER_LOGIN,
  SOCKET_BROADCAST_USER_LOGOUT,
} from '../constants/auth';
import {
  FETCH_NEW_MESSAGES,
  SOCKET_BROADCAST_NOTIFY_MESSAGE,
  SOCKET_BROADCAST_NOTIFY_MESSAGE_MENTION
} from '../constants/message';

const chatRoomPriority = (chatRoom) => {
  let priority = -1;

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
  message: '',
};

const initialState = {
  fetch: {...commonStateFlags},
  create: {...commonStateFlags},
  clear: {...commonStateFlags},
  mute: {...commonStateFlags},
  unmute: {...commonStateFlags},
  active: {
    data: {},
  },
  all: [],
};

const chatRoom = (state = initialState, action) => {
  switch(action.type) {
    case `${FETCH_CHAT_ROOMS}_LOADING`: {
      return {
        ...state,
        fetch: {
          ...state.fetch,
          loading: true,
        },
      };
    }
    case `${CREATE_CHAT_ROOM}_LOADING`: {
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
        },
      };
    }
    case `${CLEAR_CHAT_ROOM_UNREAD_MESSAGES}_LOADING`: {
      return {
        ...state,
        clear: {
          ...state.clear,
          loading: true,
        },
      };
    }
    case `${MUTE_CHAT_ROOM}_LOADING`: {
      return {
        ...state,
        mute: {
          ...state.mute,
          loading: true,
        },
      };
    }
    case `${UNMUTE_CHAT_ROOM}_LOADING`: {
      return {
        ...state,
        unmute: {
          ...state.unmute,
          loading: true,
        },
      };
    }
    case `${FETCH_CHAT_ROOMS}_SUCCESS`: {
      const chatRooms = [...action.payload.data.chatRooms];

      for (let i = 0; i < chatRooms.length; i += 1) {
        const chatRoom = chatRooms[i];

        chatRoom.priority = chatRoomPriority(chatRoom.data);
      }

      return {
        ...state,
        fetch: {
          ...state.fetch,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        all: [ ...chatRooms ],
      };
    }
    case `${CREATE_CHAT_ROOM}_SUCCESS`: {
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
      };
    }
    case `${CLEAR_CHAT_ROOM_UNREAD_MESSAGES}_SUCCESS`: {
      const chatRoomIDs = action.payload.data.chatRoomIDs;
      const chatRooms = [...state.all];

      for (let i = 0; i < chatRooms.length; i += 1) {
        const chatRoom = chatRooms[i];

        if (chatRoomIDs.indexOf(chatRoom.data._id) > -1) {
          chatRoom.unReadMessages = 0;
        }
      }

      return {
        ...state,
        clear: {
          ...state.clear,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        all: [...chatRooms],
      };
    }
    case `${MUTE_CHAT_ROOM}_SUCCESS`: {
      const chatRoomID = action.payload.data.chatRoomID;
      const activeChatRoom = {...state.active};
      const chatRooms = [...state.all];

      if (activeChatRoom.data._id === chatRoomID) {
        activeChatRoom.mute.data = true;
      }

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoomID;
      });

      if (chatRoomIndex > -1) {
        chatRooms[chatRoomIndex].mute.data = true;
      }

      return {
        ...state,
        mute: {
          ...state.mute,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        active: {...activeChatRoom},
        all: [...chatRooms],
      };
    }
    case `${UNMUTE_CHAT_ROOM}_SUCCESS`: {
      const chatRoomID = action.payload.data.chatRoomID;
      const activeChatRoom = {...state.active};
      const chatRooms = [...state.all];

      if (activeChatRoom.data._id === chatRoomID) {
        activeChatRoom.mute.data = false;
      }

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoomID;
      });

      if (chatRoomIndex > -1) {
        chatRooms[chatRoomIndex].mute.data = false;
      }

      return {
        ...state,
        unmute: {
          ...state.unmute,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        active: {...activeChatRoom},
        all: [...chatRooms],
      };
    }
    case `${FETCH_CHAT_ROOMS}_ERROR`: {
      return {
        ...state,
        fetch: {
          ...state.fetch,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${CREATE_CHAT_ROOM}_ERROR`: {
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${MUTE_CHAT_ROOM}_ERROR`: {
      return {
        ...state,
        mute: {
          ...state.mute,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${CLEAR_CHAT_ROOM_UNREAD_MESSAGES}_ERROR`: {
      return {
        ...state,
        clear: {
          ...state.clear,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${UNMUTE_CHAT_ROOM}_ERROR`: {
      return {
        ...state,
        unmute: {
          ...state.unmute,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case CHANGE_CHAT_ROOM: {
      return {
        ...state,
        active: action.chatRoom,
      };
    }
    case SOCKET_CREATE_CHAT_ROOM:
    case SOCKET_BROADCAST_CREATE_CHAT_ROOM: {
      const chatRoom = { ...action.chatRoom };

      chatRoom.priority = chatRoomPriority(chatRoom.data);

      return {
        ...state,
        all: [
          ...state.all,
          {...chatRoom},
        ],
      };
    }
    case SOCKET_BROADCAST_USER_LOGIN: {
      const user = action.user;
      const userID = user._id;
      const activeChatRoom = {...state.active};
      const chatRooms = [...state.all];
      const members = activeChatRoom.data.members;

      if (chatRooms.length > 0) {
        if (
          activeChatRoom.data.chatType === 'public' &&
          members.indexOf(userID) == -1
        ) {
          members.push(userID);
        }

        if (activeChatRoom.data.chatType === 'direct') {
          const members = activeChatRoom.data.members;

          if (members.length > 0 ) {
            const memberIndex = members.findIndex((singleMember) => {
              return singleMember._id === userID;
            });

            if (memberIndex > -1) {
              members[memberIndex].isOnline = true;
            }
          }
        }

        for (let i = 0; i < chatRooms.length; i += 1) {
          const chatRoom = chatRooms[i];
          const members = chatRoom.data.members;

          if ((chatRoom.data.chatType === 'direct' ) && ( members.length > 0)) {
            const memberIndex = members.findIndex((singleMember) => {
              return singleMember._id === userID;
            });

            if (memberIndex > -1) {
              members[memberIndex].isOnline = true;
            }
          }
        }
      }

      return {
        ...state,
        active: {...activeChatRoom},
        all: [...chatRooms],
      }
    }
    case SOCKET_BROADCAST_USER_LOGOUT: {
      const userID = action.userID;
      const chatRooms = [...state.all];
      const activeChatRoom = {...state.active};

      if (chatRooms.length > 0) {
        if (activeChatRoom.data.chatType === 'direct') {
          const members = activeChatRoom.data.members;

          if (members.length > 0) {
            const memberIndex = members.findIndex((singleMember) => {
              return singleMember._id === userID;
            });

            if (memberIndex > -1) {
              members[memberIndex].isOnline = false;
            }
          }
        }

        for (let i = 0; i < chatRooms.length; i += 1) {
          const chatRoom = chatRooms[i];
          const members = chatRoom.data.members;

          if ((chatRoom.data.chatType === 'direct' ) && ( members.length > 0)) {
            const memberIndex = members.findIndex((singleMember) => {
              return singleMember._id === userID;
            });

            if (memberIndex > -1) {
              members[memberIndex].isOnline = false;
            }
          }
        }
      }

      return {
        ...state,
        active: {...activeChatRoom},
        all: [...chatRooms],
      }
    }
    case `${FETCH_NEW_MESSAGES}_SUCCESS`: {
      const chatRoomID = action.meta;
      const activeChatRoom = {...state.active};
      const chatRooms = [...state.all];

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoomID;
      });

      if (chatRoomIndex > -1) {
        chatRooms[chatRoomIndex].unReadMessages = 0;

        if (chatRoomID === activeChatRoom.data._id) {
          activeChatRoom.unReadMessages = 0;
        }
      }

      return {
        ...state,
        all: [...chatRooms],
      }
    }
    case SOCKET_BROADCAST_NOTIFY_MESSAGE:
    case SOCKET_BROADCAST_NOTIFY_MESSAGE_MENTION: {
      const chatRooms = [...state.all];
      const chatRoomID = action.chatRoomID;

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoomID;
      });

      if (chatRoomIndex > -1) {
        chatRooms[chatRoomIndex].unReadMessages++;
        chatRooms[chatRoomIndex].data.latestMessageDate = new Date();
      }

      return {
        ...state,
        all: [...chatRooms],
      }
    }
    default:
      return state;
  }
}

export default chatRoom;
