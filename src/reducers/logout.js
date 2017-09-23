import { 
  LOGOUT_PENDING,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED
} from '../constants';

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const logout = (state=initialState, action) => {
  switch(action.type) {
    case LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOGOUT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case LOGOUT_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export default logout;