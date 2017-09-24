import { 
  INSTAGRAM_LOGIN_PENDING,
  INSTAGRAM_LOGIN_FULFILLED,
  INSTAGRAM_LOGIN_REJECTED
} from '../../constants';

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const instagramLogin = (state=initialState, action) => {
  switch(action.type) {
    case INSTAGRAM_LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case INSTAGRAM_LOGIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case INSTAGRAM_LOGIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export default instagramLogin;