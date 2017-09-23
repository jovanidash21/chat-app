import { 
  FACEBOOK_LOGIN_PENDING,
  FACEBOOK_LOGIN_FULFILLED,
  FACEBOOK_LOGIN_REJECTED
} from '../../constants';

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const facebookLogin = (state=initialState, action) => {
  switch(action.type) {
    case FACEBOOK_LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case FACEBOOK_LOGIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case FACEBOOK_LOGIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export default facebookLogin;