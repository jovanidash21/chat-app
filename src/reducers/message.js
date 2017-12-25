import {
  FETCH_MESSAGES,
  SEND_MESSAGE,
  SOCKET_SEND_MESSAGE,
  SOCKET_BROADCAST_SEND_MESSAGE
} from '../constants/message';

const initialState = {
  isLoading: false,
  messageData: {},
  messages: []
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
        messages: action.payload.data
      };
    case `${SEND_MESSAGE}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isSendMessageSuccess: true
      };
    case `${FETCH_MESSAGES}_ERROR`:
    case `${SEND_MESSAGE}_ERROR`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case SOCKET_SEND_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages.filter((messageData) => messageData.newMessageID !== action.newMessageID),
          action.message
        ]
      };
    case SEND_MESSAGE:
    case SOCKET_BROADCAST_SEND_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.message
        ]
      };
    default:
      return state;
  }
}

export default message;
