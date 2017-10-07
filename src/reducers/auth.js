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
      return {
        ...state,
        isLoading: true
      };
    case `${LOGIN}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case `${LOGIN}_ERROR`:
      return {
        ...state,
        isLoading: false
      };
    case `${REGISTER}_LOADING`:
      return {
        ...state,
        isLoading: true
      };
    case `${REGISTER}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case `${REGISTER}_ERROR`:
      return {
        ...state,
        isLoading: false
      };
    case `${LOGOUT}_LOADING`:
      return {
        ...state,
        isLoading: true
      };
    case `${LOGOUT}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    case `${LOGOUT}_ERROR`:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

export default auth;