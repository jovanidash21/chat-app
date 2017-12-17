import { CHANGE_CHAT_ROOM } from '../constants/active-chat-room';

const initialState = {
  chatRoomData: {}
};

const activeChatRoom = (state=initialState, action) => {
  switch(action.type) {
    case CHANGE_CHAT_ROOM:
      return {
        chatRoomData: action.payload
      };
    default:
      return state;
  }
}

export default activeChatRoom;
