import { FETCH_USER } from '../constants/user';

const initialState = {
  isLoading: false,
  userData: {}
};

const user = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_USER}_LOADING`:
      return {
        ...state,
        isLoading: true
      };
    case `${FETCH_USER}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        userData: action.payload.data
      };
    case `${FETCH_USER}_ERROR`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}

export default user;