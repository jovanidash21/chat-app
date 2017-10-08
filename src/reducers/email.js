import { SEND_EMAIL} from '../constants/email';

const initialState = {
  isLoading: false,
  isError: false
};

const email = (state=initialState, action) => {
  switch(action.type) {
    case `${SEND_EMAIL}_LOADING`:
      return {
        ...state,
        isLoading: true
      };
    case `${SEND_EMAIL}_SUCCESS`:
      return {
        ...state,
        isLoading: false
      };
    case `${SEND_EMAIL}_ERROR`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}

export default email;