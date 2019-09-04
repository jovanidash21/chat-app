import { FETCH_MESSAGES_COUNT } from '../constants/message';

const commonStateFlags = {
  loading: false,
  success: false,
  error: false,
  message: '',
};

const initialState = {
  fetchCount: {...commonStateFlags},
  count: 0,
};

const message = (state = initialState, action) => {
  switch(action.type) {
    case `${FETCH_MESSAGES_COUNT}_LOADING`: {
      return {
        ...state,
        fetchCount: {
          ...state.fetchCount,
          loading: true,
        },
      };
    }
    case `${FETCH_MESSAGES_COUNT}_SUCCESS`: {
      return {
        ...state,
        fetchCount: {
          ...state.fetchCount,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        count: action.payload.data.count,
      };
    }
    case `${FETCH_MESSAGES_COUNT}_ERROR`: {
      return {
        ...state,
        fetchCount: {
          ...state.fetchCount,
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

export default message;
