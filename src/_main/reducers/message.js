import {
  FETCH_NEW_MESSAGES,
  FETCH_OLD_MESSAGES,
  SEND_MESSAGE,
  SOCKET_BROADCAST_SEND_MESSAGE,
  DELETE_MESSAGE,
  SOCKET_BROADCAST_DELETE_MESSAGE,
} from '../constants/message';
import { CHANGE_CHAT_ROOM } from '../constants/chat-room';

const commonStateFlags = {
  loading: false,
  success: false,
  error: false,
  message: '',
};

const initialState = {
  fetchNew: {...commonStateFlags},
  fetchOld: {...commonStateFlags},
  delete: {...commonStateFlags},
  activeChatRoom: {
    data: {},
  },
  all: [],
};

const message = (state = initialState, action) => {
  switch(action.type) {
    case `${FETCH_NEW_MESSAGES}_LOADING`: {
      const activeChatRoom = {...state.activeChatRoom};
      const chatRoomID = action.meta;

      if (chatRoomID === activeChatRoom.data._id) {
        return {
          ...state,
          fetchNew: {
            ...state.fetchNew,
            loading: true,
          },
        };
      }

      return {
        ...state,
      };
    }
    case `${FETCH_OLD_MESSAGES}_LOADING`: {
      const activeChatRoom = {...state.activeChatRoom};
      const chatRoomID = action.meta;

      if (chatRoomID === activeChatRoom.data._id) {
        return {
          ...state,
          fetchOld: {
            ...state.fetchOld,
            loading: true,
          },
        };
      }

      return {
        ...state,
      };
    }
    case `${DELETE_MESSAGE}_LOADING`: {
      return {
        ...state,
        delete: {
          ...state.delete,
          loading: true,
        },
      };
    }
    case `${FETCH_NEW_MESSAGES}_SUCCESS`: {
      const activeChatRoom = {...state.activeChatRoom};
      const chatRoomID = action.meta;

      if (chatRoomID === activeChatRoom.data._id) {
        return {
          ...state,
          fetchNew: {
            ...state.fetchNew,
            loading: false,
            success: true,
            error: false,
            message: action.payload.data.message,
          },
          all: action.payload.data.messages,
        };
      }

      return {
        ...state,
      };
    }
    case `${FETCH_OLD_MESSAGES}_SUCCESS`: {
      const activeChatRoom = {...state.activeChatRoom};
      const chatRoomID = action.meta;

      if (chatRoomID === activeChatRoom.data._id) {
        return {
          ...state,
          fetchOld: {
            ...state.fetchOld,
            loading: false,
            success: true,
            error: false,
            message: action.payload.data.message,
          },
          all: [
            ...action.payload.data.messages,
            ...state.all,
          ],
        };
      }

      return {
        ...state,
      };
    }
    case `${SEND_MESSAGE}_SUCCESS`: {
      const messages = [...state.all];
      const activeChatRoom = {...state.activeChatRoom};
      const messageID = action.meta;
      const newMessage = action.payload.data.messageData;

      if (newMessage.chatRoom === activeChatRoom.data._id) {
        const messageIndex = messages.findIndex(( singleMessage ) => {
          return singleMessage._id === messageID;
        });

        if (messageIndex > -1) {
          newMessage.isSending = false;
          messages[messageIndex] = newMessage;
        }
      }

      return {
        ...state,
        all: [...messages],
      };
    }
    case `${DELETE_MESSAGE}_SUCCESS`: {
      let messages = [...state.all];
      const activeChatRoom = {...state.activeChatRoom};
      const messageID = action.meta.messageID;
      const chatRoomID = action.meta.chatRoomID;

      if (chatRoomID === activeChatRoom.data._id) {
        messages = messages.filter((message) => {
          return message._id !== messageID;
        });
      }

      return {
        ...state,
        delete: {
          ...state.delete,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        all: [...messages],
      };
    }
    case `${FETCH_NEW_MESSAGES}_ERROR`: {
      const activeChatRoom = {...state.activeChatRoom};
      const chatRoomID = action.meta;

      if (chatRoomID === activeChatRoom.data._id) {
        return {
          ...state,
          fetchNew: {
            ...state.fetchNew,
            loading: false,
            success: false,
            error: true,
            message: action.payload.response.data.message,
          },
        };
      }

      return {
        ...state,
      };
    }
    case `${FETCH_OLD_MESSAGES}_ERROR`: {
      const activeChatRoom = {...state.activeChatRoom};
      const chatRoomID = action.meta;

      if (chatRoomID === activeChatRoom.data._id) {
        return {
          ...state,
          fetchOld: {
            ...state.fetchOld,
            loading: false,
            success: false,
            error: true,
            message: action.payload.response.data.message,
          },
        };
      }

      return {
        ...state,
      };
    }
    case `${DELETE_MESSAGE}_ERROR`: {
      return {
        ...state,
        delete: {
          ...state.delete,
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
        activeChatRoom: action.chatRoom,
      };
    }
    case SEND_MESSAGE:
    case SOCKET_BROADCAST_SEND_MESSAGE: {
      const message = action.message;
      const activeChatRoom = {...state.activeChatRoom};
      const messages = [...state.all];

      if (message.chatRoom === activeChatRoom.data._id) {
        messages.push(message);
      }

      return {
        ...state,
        all: [...messages],
      };
    }
    case SOCKET_BROADCAST_DELETE_MESSAGE: {
      const messageID = action.messageID;
      const chatRoomID = action.chatRoomID;
      const activeChatRoom = {...state.activeChatRoom};
      let messages = [...state.all];

      if (activeChatRoom.data._id === chatRoomID) {
        messages = messages.filter((message) => {
          return message._id !== messageID;
        });
      }

      return {
        ...state,
        all: [...messages],
      };
    }
    default:
      return state;
  }
}

export default message;
