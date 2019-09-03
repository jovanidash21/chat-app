import {
  FETCH_CHAT_ROOMS_COUNT,
  FETCH_SELECTED_CHAT_ROOM,
  FETCH_CHAT_ROOMS,
  CREATE_CHAT_ROOM,
  EDIT_CHAT_ROOM,
  DELETE_CHAT_ROOM,
} from '../constants/chat-room';

const commonStateFlags = {
  loading: false,
  success: false,
  error: false,
  message: '',
};

const initialState = {
  fetchCount: {...commonStateFlags},
  fetchSelect: {...commonStateFlags},
  fetchAll: {...commonStateFlags},
  create: {...commonStateFlags},
  edit: {...commonStateFlags},
  delete: {...commonStateFlags},
  count: 0,
  all: [],
  selected: {},
};

const chatRoom = (state = initialState, action) => {
  switch(action.type) {
    case `${FETCH_CHAT_ROOMS_COUNT}_LOADING`: {
      return {
        ...state,
        fetchCount: {
          ...state.fetchCount,
          loading: true,
        },
      };
    }
    case `${FETCH_SELECTED_CHAT_ROOM}_LOADING`: {
      return {
        ...state,
        fetchSelect: {
          ...state.fetchSelect,
          loading: true,
        },
      };
    }
    case `${FETCH_CHAT_ROOMS}_LOADING`: {
      return {
        ...state,
        fetchAll: {
          ...state.fetchAll,
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
    case `${EDIT_CHAT_ROOM}_LOADING`: {
      return {
        ...state,
        edit: {
          ...state.edit,
          loading: true,
        },
      };
    }
    case `${DELETE_CHAT_ROOM}_LOADING`: {
      return {
        ...state,
        delete: {
          ...state.delete,
          loading: true,
        },
      };
    }
    case `${FETCH_CHAT_ROOMS_COUNT}_SUCCESS`: {
      return {
        ...state,
        fetchCount: {
          ...state.fetchCount,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        count: action.payload.data.count,
      };
    }
    case `${FETCH_SELECTED_CHAT_ROOM}_SUCCESS`: {
      return {
        ...state,
        fetchSelect: {
          ...state.fetchSelect,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        selected: action.payload.data.chatRoom,
      };
    }
    case `${FETCH_CHAT_ROOMS}_SUCCESS`: {
      return {
        ...state,
        fetchAll: {
          ...state.fetchAll,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        all: action.payload.data.chatRooms,
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
    case `${EDIT_CHAT_ROOM}_SUCCESS`: {
      return {
        ...state,
        edit: {
          ...state.edit,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
      };
    }
    case `${DELETE_CHAT_ROOM}_SUCCESS`: {
      let chatRooms = [...state.all];
      const chatRoomID = action.meta;

      chatRooms = chatRooms.filter(( chatRoom ) => {
        return chatRoom._id !== chatRoomID;
      });

      return {
        ...state,
        delete: {
          ...state.delete,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        all: [ ...chatRooms ],
      };
    }
    case `${FETCH_CHAT_ROOMS_COUNT}_ERROR`: {
      return {
        ...state,
        fetchCount: {
          ...state.fetchCount,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${FETCH_SELECTED_CHAT_ROOM}_ERROR`: {
      return {
        ...state,
        fetchSelect: {
          ...state.fetchSelect,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${FETCH_CHAT_ROOMS}_ERROR`: {
      return {
        ...state,
        fetchAll: {
          ...state.fetchAll,
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
    case `${EDIT_CHAT_ROOM}_ERROR`: {
      return {
        ...state,
        edit: {
          ...state.edit,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${DELETE_CHAT_ROOM}_ERROR`: {
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
    default:
      return state;
  }
}

export default chatRoom;
