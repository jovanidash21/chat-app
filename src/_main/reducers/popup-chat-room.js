import {
  OPEN_POPUP_CHAT_ROOM,
  CLOSE_POPUP_CHAT_ROOM,
  FETCH_POPUP_CHAT_ROOM_NEW_MESSAGES
} from '../constants/popup-chat-room';

const commonStateFlags = {
  loading: false,
  success: false,
  error: false,
  message: ''
};

const popUpChatRoomState = {
  message: {
    fetchNew: {...commonStateFlags},
    all: []
  }
};

const initialState = {
  all: []
};

const popUpChatRoom = (state=initialState, action) => {
  switch(action.type) {
    case OPEN_POPUP_CHAT_ROOM:
      var chatRoom = action.chatRoom;
      var chatRooms = [...state.all];
      var chatRoomFound = false;

      for ( var i = 0; i < chatRoom.length; i++ ) {
        var singleChatRoom = chatRooms[i];

        if ( singleChatRoom.data._id === chatRoom.data._id ) {
          chatRoomFound = true;
          break;
        }
      }

      if ( ! chatRoomFound ) {
        chatRoom = {
          ...chatRoom,
          ...popUpChatRoomState
        };
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
    case `${FETCH_POPUP_CHAT_ROOM_NEW_MESSAGES}_LOADING`:
      var chatRoomID = action.meta;
      var chatRooms = [...state.all];

      for ( var i = 0; i < chatRooms.length; i++ ) {
        var singleChatRoom = chatRooms[i];

        if ( singleChatRoom.data._id === chatRoomID ) {
          const fetchNew = {...singleChatRoom.message.fetchNew};

          singleChatRoom.message.fetchNew = {
            ...fetchNew,
            loading: true,
          };
          break;
        }
      }

      return {
        ...state,
        all: [...chatRooms]
      };
    case `${FETCH_POPUP_CHAT_ROOM_NEW_MESSAGES}_SUCCESS`:
      var chatRoomID = action.meta;
      var chatRooms = [...state.all];

      for ( var i = 0; i < chatRooms.length; i++ ) {
        var singleChatRoom = chatRooms[i];

        if ( singleChatRoom.data._id === chatRoomID ) {
          const fetchNew = {...singleChatRoom.message.fetchNew};

          singleChatRoom.message.fetchNew = {
            loading: false,
            success: true,
            error: false,
            message: action.payload.data.message
          };
          break;
        }
      }

      return {
        ...state,
        all: [...chatRooms]
      };
    case `${FETCH_POPUP_CHAT_ROOM_NEW_MESSAGES}_ERROR`:
      var chatRoomID = action.meta;
      var chatRooms = [...state.all];

      for ( var i = 0; i < chatRooms.length; i++ ) {
        var singleChatRoom = chatRooms[i];

        if ( singleChatRoom.data._id === chatRoomID ) {
          const fetchNew = {...singleChatRoom.message.fetchNew};

          singleChatRoom.message.fetchNew = {
            ...fetchNew,
            loading: false,
            success: false,
            error: true,
            message: action.payload.response.data.message
          };
          break;
        }
      }

      return {
        ...state,
        all: [...chatRooms]
      };
    default:
      return state;
  }
}

export default popUpChatRoom;
