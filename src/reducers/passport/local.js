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
  isWaiting: false,
  authenticated: false
};

const local = (state = initialState, action) => {
  switch(action.type) {
    case LOCAL_LOGIN_USER:
      return {
        ...state,
        isWaiting: true
      };
    case LOCAL_LOGIN_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        authenticated: true
      };
    case LOCAL_LOGIN_ERROR:
      return {
        ...state,
        isWaiting: false,
        authenticated: false
      };
    case LOCAL_REGISTER_USER:
      return {
        ...state,
        isWaiting: true
      };
    case LOCAL_REGISTER_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        authenticated: true
      }
    case LOCAL_REGISTER_ERROR:
      return {
        ...state,
        isWaiting: false,
        authenticated: false
      }
    case LOCAL_LOGOUT_USER:
      return {
        ...state,
        isWaiting: true
      };
    case LOCAL_LOGOUT_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        authenticated: false
      };
    case LOCAL_LOGOUT_ERROR:
      return {
        ...state,
        isWaiting: false,
        authenticated: true
      }
    default:
      return state;
  }
}

export default local;