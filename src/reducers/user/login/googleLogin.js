import { 
  GOOGLE_LOGIN_PENDING,
  GOOGLE_LOGIN_FULFILLED,
  GOOGLE_LOGIN_REJECTED
} from '../../../constants';

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const googleLogin = (state=initialState, action) => {
  switch(action.type) {
    case GOOGLE_LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GOOGLE_LOGIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case GOOGLE_LOGIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export default googleLogin;