import {
  FETCH_CHAT_ROOMS_COUNT,
  FETCH_SELECTED_CHAT_ROOM,
  FETCH_CHAT_ROOMS,
  CREATE_CHAT_ROOM,
  EDIT_CHAT_ROOM,
  DELETE_CHAT_ROOM
} from '../constants/chat-room';

const initialState = {
  count: 0,
  isFetchingSelected: false,
  isFetchingSelectedSuccess: false,
  isFetchingAll: false,
  isFetchingAllSuccess: false,
  isCreating: false,
  isCreatingSuccess: true,
  isEditing: false,
  isEditingSuccess: true,
  isDeleting: false,
  isDeletingSuccess: true,
  all: [],
  selected: {}
};

const chatRoom = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_SELECTED_CHAT_ROOM}_LOADING`:
      return {
        ...state,
        isFetchingSelected: true
      };
    case `${FETCH_CHAT_ROOMS}_LOADING`:
      return {
        ...state,
        isFetchingAll: true
      };
    case `${CREATE_CHAT_ROOM}_LOADING`:
      return {
        ...state,
        isCreating: true
      };
    case `${EDIT_CHAT_ROOM}_LOADING`:
      return {
        ...state,
        isEditing: true
      };
    case `${DELETE_CHAT_ROOM}_LOADING`:
      return {
        ...state,
        isDeleting: true
      };
    case `${FETCH_CHAT_ROOMS_COUNT}_SUCCESS`:
      return {
        ...state,
        count: action.payload.data.count
      };
    case `${FETCH_SELECTED_CHAT_ROOM}_SUCCESS`:
      return {
        ...state,
        isFetchingSelected: false,
        isFetchingSelectedSuccess: true,
        selected: action.payload.data
      };
    case `${FETCH_CHAT_ROOMS}_SUCCESS`:
      return {
        ...state,
        isFetchingAll: false,
        isFetchingAllSuccess: true,
        all: action.payload.data
      };
    case `${CREATE_CHAT_ROOM}_SUCCESS`:
      return {
        ...state,
        isCreating: false,
        isCreatingSuccess: true
      };
    case `${EDIT_CHAT_ROOM}_SUCCESS`:
      return {
        ...state,
        isEditing: false,
        isEditingSuccess: true
      };
    case `${DELETE_CHAT_ROOM}_SUCCESS`:
      var chatRooms = [...state.all];
      var chatRoomID = action.meta;

      chatRooms = chatRooms.filter((chatRoom) => chatRoom._id !== chatRoomID);

      return {
        ...state,
        isDeleting: false,
        isDeletingSuccess: true,
        all: [...chatRooms]
      };
    case `${FETCH_SELECTED_CHAT_ROOM}_ERROR`:
      return {
        ...state,
        isFetchingSelected: false,
        isFetchingSelectedSuccess: false
      };
    case `${FETCH_CHAT_ROOMS}_ERROR`:
      return {
        ...state,
        isFetchingAll: false,
        isFetchingAllSuccess: false
      };
    case `${CREATE_CHAT_ROOM}_ERROR`:
      return {
        ...state,
        isCreating: false,
        isCreatingSuccess: false
      };
    case `${EDIT_CHAT_ROOM}_ERROR`:
      return {
        ...state,
        isEditing: false,
        isEditingSuccess: false
      };
    case `${DELETE_CHAT_ROOM}_ERROR`:
      return {
        ...state,
        isDeleting: false,
        isDeletingSuccess: false
      };
    default:
      return state;
  }
}

export default chatRoom;
