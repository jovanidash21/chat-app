import {
  OPEN_POPUP_CHAT_ROOM,
  CLOSE_POPUP_CHAT_ROOM
} from '../constants/popup-chat-room';

const initialState = {
  all: []
};

const popUpChatRoom = (state=initialState, action) => {
  switch(action.type) {
    case OPEN_POPUP_CHAT_ROOM:
      var chatRoom = action.chatRoom;

      return {
        ...state,
        all: [
          ...state.all,
          {...chatRoom}
        ]
      };
    default:
      return state;
  }
}

export default popUpChatRoom;
