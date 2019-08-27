import { SEND_EMAIL } from '../constants/email';

const commonStateFlags = {
  loading: false,
  success: false,
  error: false,
  message: '',
};

const initialState = {
  send: {...commonStateFlags},
};

const email = (state = initialState, action) => {
  switch(action.type) {
    case `${SEND_EMAIL}_LOADING`: {
      return {
        ...state,
        send: {
          ...state.send,
          loading: true,
        },
      };
    }
    case `${SEND_EMAIL}_SUCCESS`: {
      return {
        ...state,
        send: {
          ...state.send,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
      };
    }
    case `${SEND_EMAIL}_ERROR`: {
      return {
        ...state,
        send: {
          ...state.send,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    default:
      return state;
  }
}

export default email;
