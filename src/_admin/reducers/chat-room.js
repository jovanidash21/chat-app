import {
  FETCH_SELECTED_CHAT_ROOM,
  FETCH_CHAT_ROOMS
} from '../constants/chat-room';

const initialState = {
  isFetchingSelected: false,
  isFetchingSelectedSuccess: false,
  isFetchingAll: false,
  isFetchingAllSuccess: false,
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
    default:
      return state;
  }
}

export default chatRoom;
