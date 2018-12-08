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
      var chatRooms = [...state.all];
      var chatRoomFound = false;

      for ( var i = 0; i < chatRooms.length; i++ ) {
        var singleChatRoom = chatRooms[i];

        if ( singleChatRoom.data._id === chatRoom.data._id ) {
          chatRoomFound = true;
          break;
        }
      }

      if ( ! chatRoomFound ) {
        chatRooms.push(chatRoom);
      }

      return {
        ...state,
        all: [...chatRooms]
      };
    case CLOSE_POPUP_CHAT_ROOM:
      var chatRoomID = action.chatRoomID;
      var chatRooms = [...state.all];

      chatRooms = chatRooms.filter(singlChatRoom =>
        singlChatRoom.data._id !== chatRoomID
      );

      return {
        ...state,
        all: [...chatRooms]
      };
    default:
      return state;
  }
}

export default popUpChatRoom;