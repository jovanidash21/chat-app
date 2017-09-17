import { 
  LOCAL_LOGIN_PENDING,
  LOCAL_LOGIN_FULFILLED,
  LOCAL_LOGIN_REJECTED,
  LOCAL_REGISTER_PENDING,
  LOCAL_REGISTER_FULFILLED,
  LOCAL_REGISTER_REJECTED,
  LOCAL_LOGOUT_PENDING,
  LOCAL_LOGOUT_FULFILLED,
  LOCAL_LOGOUT_REJECTED,
} from '../../constants';

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const local = (state=initialState, action) => {
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
    case LOCAL_REGISTER_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOCAL_REGISTER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      }
    case LOCAL_REGISTER_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      }
    case LOCAL_LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOCAL_LOGOUT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    case LOCAL_LOGOUT_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    default:
      return state;
  }
}

export default local;