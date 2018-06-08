import {
  FETCH_MESSAGES,
  SEND_MESSAGE,
  SOCKET_BROADCAST_SEND_MESSAGE
} from '../constants/message';
import { CHANGE_CHAT_ROOM } from '../constants/chat-room';

const initialState = {
  isLoading: false,
  activeChatRoom: {
    data: {}
  },
  all: []
};

const message = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_MESSAGES}_LOADING`:
      return {
        ...state,
        isLoading: true
      };
    case `${SEND_MESSAGE}_LOADING`:
      return {
        ...state
      };
    case `${FETCH_MESSAGES}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isFetchMessagesSuccess: true,
        all: action.payload.data
      };
    case `${SEND_MESSAGE}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isSendMessageSuccess: true,
        all: [
          ...state.all.filter((messageData) => messageData.newMessageID !== action.meta),
          action.payload.data.messageData
        ]
      };
    case `${FETCH_MESSAGES}_ERROR`:
    case `${SEND_MESSAGE}_ERROR`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case CHANGE_CHAT_ROOM:
      return {
        ...state,
        activeChatRoom: action.chatRoom
      };
    case SEND_MESSAGE:
    case SOCKET_BROADCAST_SEND_MESSAGE:
      var message = action.message;
      var activeChatRoom = {...state.activeChatRoom};
      var messages = [...state.all];

      if ( activeChatRoom.data._id === message.chatRoom ) {
        messages.push(message);
      }

      return {
        ...state,
        all: [...messages]
      };
    default:
      return state;
  }
}

export default message;
