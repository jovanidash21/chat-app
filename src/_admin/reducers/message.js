import { FETCH_MESSAGES_COUNT } from '../constants/message';

const initialState = {
  count: 0,
  isFetchingCount: false,
  isFetchingCountSuccess: false
};

const message = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_MESSAGES_COUNT}_LOADING`:
      return {
        ...state,
        isFetchingCount: true
      };
    case `${FETCH_MESSAGES_COUNT}_SUCCESS`:
      return {
        ...state,
        count: action.payload.data.count,
        isFetchingCount: false,
        isFetchingCountSuccess: true
      };
    case `${FETCH_MESSAGES_COUNT}_ERROR`:
      return {
        ...state,
        isFetchingCount: false,
        isFetchingCountSuccess: false
      };
    default:
      return state;
  }
}

export default message;
