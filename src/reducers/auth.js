import { 
  LOGIN,
  REGISTER,
  LOGOUT
} from '../constants/auth';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isError: false
};

const auth = (state=initialState, action) => {
  switch(action.type) {
    case `${LOGIN}_LOADING`:
    case `${REGISTER}_LOADING`:
    case `${LOGOUT}_LOADING`:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        isError: false
      };
    case `${LOGIN}_SUCCESS`:
    case `${REGISTER}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        isError: false
      };
    
    case `${LOGOUT}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        isError: false
      };
    case `${LOGIN}_ERROR`:
    case `${REGISTER}_ERROR`:
    case `${LOGOUT}_ERROR`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}

export default auth;