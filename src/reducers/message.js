import {
  FETCH_MESSAGES,
  SEND_MESSAGE
} from '../constants/message';

const initialState = {
  isLoading: false,
  messageData: {}
};

const message = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_MESSAGES}_LOADING`:
    case `${SEND_MESSAGE}_LOADING`:
      return {
        ...state,
        isLoading: true
      };
    case `${FETCH_MESSAGES}_SUCCESS`:
    case `${SEND_MESSAGE}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        messageData: action.payload.data
      };
    case `${FETCH_MESSAGES}_ERROR`:
    case `${SEND_MESSAGE}_ERROR`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}

export default message;