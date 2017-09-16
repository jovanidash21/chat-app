import { 
  LOCAL_LOGIN_USER,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGIN_ERROR,
  LOCAL_REGISTER_USER,
  LOCAL_REGISTER_SUCCESS,
  LOCAL_REGISTER_ERROR,
  LOCAL_LOGOUT_USER,
  LOCAL_LOGOUT_SUCCESS,
  LOCAL_LOGOUT_ERROR,
} from '../../constants/index';

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const local = (state=initialState, action) => {
  switch(action.type) {
    case LOCAL_LOGIN_USER:
      return {
        ...state,
        isLoading: true
      };
    case LOCAL_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case LOCAL_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    case LOCAL_REGISTER_USER:
      return {
        ...state,
        isLoading: true
      };
    case LOCAL_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      }
    case LOCAL_REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      }
    case LOCAL_LOGOUT_USER:
      return {
        ...state,
        isLoading: true
      };
    case LOCAL_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    case LOCAL_LOGOUT_ERROR:
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