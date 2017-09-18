import { 
  LOCAL_LOGIN_PENDING,
  LOCAL_LOGIN_FULFILLED,
  LOCAL_LOGIN_REJECTED
} from '../../constants';

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const localLogin = (state=initialState, action) => {
  switch(action.type) {
    case LOCAL_LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOCAL_LOGIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case LOCAL_LOGIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export default localLogin;