import { 
  LOGIN,
  REGISTER,
  LOGOUT
} from '../constants/auth';

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const auth = (state=initialState, action) => {
  switch(action.type) {
    case `${LOGIN}_LOADING`:
    case `${REGISTER}_LOADING`:
    case `${LOGOUT}_LOADING`:
      return {
        ...state,
        isLoading: true
      };
    case `${LOGIN}_SUCCESS`:
    case `${REGISTER}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case `${LOGIN}_ERROR`:
    case `${REGISTER}_ERROR`:
    case `${LOGOUT}_ERROR`:
      return {
        ...state,
        isLoading: false
      };
    case `${LOGOUT}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export default auth;