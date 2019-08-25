import {
  LOGIN,
  REGISTER,
} from '../constants/auth';

const commonStateFlags = {
  loading: false,
  success: false,
  error: false,
  message: '',
};

const initialState = {
  login: {...commonStateFlags},
  register: {...commonStateFlags},
};

const auth = (state = initialState, action) => {
  switch(action.type) {
    case `${LOGIN}_LOADING`: {
      return {
        ...state,
        login: {
          ...state.login,
          loading: true,
        },
      };
    }
    case `${REGISTER}_LOADING`: {
      return {
        ...state,
        register: {
          ...state.register,
          loading: true,
        },
      };
    }
    case `${LOGIN}_SUCCESS`: {
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
      };
    }
    case `${REGISTER}_SUCCESS`: {
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
      };
    }
    case `${LOGIN}_ERROR`: {
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${REGISTER}_ERROR`: {
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    default:
      return state;
  }
}

export default auth;
