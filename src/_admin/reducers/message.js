import { FETCH_MESSAGES_COUNT } from '../constants/message';

const initialState = {
  count: 0
};

const message = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_MESSAGES_COUNT}_SUCCESS`:
      return {
        ...state,
        count: action.payload.data.count
      };
    default:
      return state;
  }
}

export default message;
