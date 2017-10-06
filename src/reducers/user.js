import { 
  LOGIN,
  REGISTER,
  LOGOUT
} from '../constants/user';

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const user = (state=initialState, action) => {
  switch(action.type) {
    case `${LOGIN}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case `${LOGIN}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    case `${REGISTER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${REGISTER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case `${REGISTER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    case `${LOGOUT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${LOGOUT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case `${LOGOUT}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export default user;