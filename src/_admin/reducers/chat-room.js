import { FETCH_CHAT_ROOMS } from '../constants/chat-room';

const initialState = {
  isFetchingAll: false,
  isFetchingAllSuccess: false,
  all: [],
  selected: {}
};

const chatRoom = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_CHAT_ROOMS}_LOADING`:
      return {
        ...state,
        isFetchingAll: true
      };
    case `${FETCH_CHAT_ROOMS}_SUCCESS`:
      return {
        ...state,
        isFetchingAll: false,
        isFetchingAllSuccess: true,
        all: action.payload.data
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
