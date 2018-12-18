import {
  OPEN_POPUP_CHAT_ROOM,
  CLOSE_POPUP_CHAT_ROOM,
  FETCH_POPUP_CHAT_ROOM_NEW_MESSAGES
} from '../constants/popup-chat-room';
import {
  SEND_MESSAGE,
  SOCKET_BROADCAST_SEND_MESSAGE,
  DELETE_MESSAGE,
  SOCKET_BROADCAST_DELETE_MESSAGE
} from '../constants/message';

const initialState = {
  all: []
};

const popUpChatRoom = (state=initialState, action) => {
  switch(action.type) {
    case OPEN_POPUP_CHAT_ROOM:
      var chatRoom = action.chatRoom;
      var chatRooms = [...state.all];

      var chatRoomIndex = chatRooms.findIndex(singleChatRoom => singleChatRoom.data._id === chatRoom.data._id);

      if ( chatRoomIndex === -1  ) {
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

      var chatRoomIndex = chatRooms.findIndex(singleChatRoom => singleChatRoom.data._id === chatRoomID);

      if ( chatRoomIndex > -1 ) {
        chatRooms[chatRoomIndex].message.fetchNew = {
          ...chatRooms[chatRoomIndex].message.fetchNew,
          loading: true
        };
      }

      return {
        ...state,
        all: [...chatRooms]
      };
    case `${FETCH_POPUP_CHAT_ROOM_NEW_MESSAGES}_SUCCESS`:
      var chatRoomID = action.meta;
      var chatRooms = [...state.all];

      var chatRoomIndex = chatRooms.findIndex(singleChatRoom => singleChatRoom.data._id === chatRoomID);

      if ( chatRoomIndex > -1 ) {
        chatRooms[chatRoomIndex].message.fetchNew = {
          ...chatRooms[chatRoomIndex].message.fetchNew,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message
        };
        chatRooms[chatRoomIndex].message.all = action.payload.data.messages;
      }

      return {
        ...state,
        all: [...chatRooms]
      };
    case `${FETCH_POPUP_CHAT_ROOM_NEW_MESSAGES}_ERROR`:
      var chatRoomID = action.meta;
      var chatRooms = [...state.all];

      var chatRoomIndex = chatRooms.findIndex(singleChatRoom => singleChatRoom.data._id === chatRoomID);

      if ( chatRoomIndex > -1 ) {
        chatRooms[chatRoomIndex].message.fetchNew = {
          ...chatRooms[chatRoomIndex].message.fetchNew,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message
        };
      }

      return {
        ...state,
        all: [...chatRooms]
      };
    case `${SEND_MESSAGE}_SUCCESS`:
      var messageID = action.meta;
      var newMessage = action.payload.data.messageData;
      var chatRooms = [...state.all];

      var chatRoomIndex = chatRooms.findIndex(singleChatRoom => singleChatRoom.data._id === newMessage.chatRoom);

      if ( chatRoomIndex > -1 ) {
        chatRooms[chatRoomIndex].message.all = chatRooms[chatRoomIndex].message.all.filter((message) => message._id !== messageID);
        newMessage.isSending = false;
        chatRooms[chatRoomIndex].message.all.push(newMessage);
      }

      return {
        ...state,
        all: [...chatRooms]
      };
    case SEND_MESSAGE:
    case SOCKET_BROADCAST_SEND_MESSAGE:
      var message = action.message;
      var chatRooms = [...state.all];

      var chatRoomIndex = chatRooms.findIndex(singleChatRoom => singleChatRoom.data._id === message.chatRoom);

      if ( chatRoomIndex > -1 ) {
        chatRooms[chatRoomIndex].message.all.push(message);
      }

      return {
        ...state,
        all: [...chatRooms]
      };
    case `${DELETE_MESSAGE}_SUCCESS`:
      var messageID = action.meta.messageID;
      var chatRoomID = action.meta.chatRoomID;
      var chatRooms = [...state.all];

      var chatRoomIndex = chatRooms.findIndex(singleChatRoom => singleChatRoom.data._id === chatRoomID);

      if ( chatRoomIndex > -1 ) {
        chatRooms[chatRoomIndex].message.all = chatRooms[chatRoomIndex].message.all.filter((message) => message._id !== messageID);
      }

      return {
        ...state,
        all: [...chatRooms]
      };
    case SOCKET_BROADCAST_DELETE_MESSAGE:
      var messageID = action.messageID;
      var chatRoomID = action.chatRoomID;
      var chatRooms = [...state.all];

      var chatRoomIndex = chatRooms.findIndex(singleChatRoom => singleChatRoom.data._id === chatRoomID);

      if ( chatRoomIndex > -1 ) {
        chatRooms[chatRoomIndex].message.all = chatRooms[chatRoomIndex].message.all.filter((message) => message._id !== messageID);
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
