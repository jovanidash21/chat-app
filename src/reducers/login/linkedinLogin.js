import { 
  LINKEDIN_LOGIN_PENDING,
  LINKEDIN_LOGIN_FULFILLED,
  LINKEDIN_LOGIN_REJECTED
} from '../../constants';

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const linkedinLogin = (state=initialState, action) => {
  switch(action.type) {
    case LINKEDIN_LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LINKEDIN_LOGIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case LINKEDIN_LOGIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export default linkedinLogin;