import {
  LOGIN,
  REGISTER
} from '../constants/auth';

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const auth = (state=initialState, action) => {
  switch(action.type) {
    case `${LOGIN}_LOADING`:
    case `${REGISTER}_LOADING`:
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
    default:
      return state;
  }
}

export default auth;
