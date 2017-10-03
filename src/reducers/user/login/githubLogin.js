import { 
  GITHUB_LOGIN_PENDING,
  GITHUB_LOGIN_FULFILLED,
  GITHUB_LOGIN_REJECTED
} from '../../../constants';

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const githubLogin = (state=initialState, action) => {
  switch(action.type) {
    case GITHUB_LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GITHUB_LOGIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case GITHUB_LOGIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export default githubLogin;