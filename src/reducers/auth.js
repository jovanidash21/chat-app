import { 
  LOGIN,
  REGISTER,
  LOGOUT
} from '../constants/auth';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isLoginError: false,
  isRegisterError: false
};

const auth = (state=initialState, action) => {
  switch(action.type) {
    case `${LOGIN}_LOADING`:
    case `${REGISTER}_LOADING`:
    case `${LOGOUT}_LOADING`:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false
      };
    case `${LOGIN}_SUCCESS`:
    case `${REGISTER}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case `${LOGOUT}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
      };
    case `${LOGIN}_ERROR`:
      return {
        ...state,
        isLoading: false,
        isLoginError: true
      };
    case `${REGISTER}_ERROR`:
      return {
        ...state,
        isLoading: false,
        isRegisterError: true
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