import { 
  TWITTER_LOGIN_PENDING,
  TWITTER_LOGIN_FULFILLED,
  TWITTER_LOGIN_REJECTED
} from '../../../constants';

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const twitterLogin = (state=initialState, action) => {
  switch(action.type) {
    case TWITTER_LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case TWITTER_LOGIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case TWITTER_LOGIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export default twitterLogin;