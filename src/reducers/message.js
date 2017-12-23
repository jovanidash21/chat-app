import {
  FETCH_MESSAGES,
  SEND_MESSAGE,
  RECEIVE_MESSAGE
} from '../constants/message';

const initialState = {
  isLoading: false,
  messageData: {},
  messages: []
};

const message = (state=initialState, action) => {
  switch(action.type) {
    case 'message':
      return {
        ...state
      };
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
        isSendMessageSuccess: true,
        messages: [
          ...state.messages,
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
    case RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.payload
        ]
      };
    default:
      return state;
  }
}

export default message;
