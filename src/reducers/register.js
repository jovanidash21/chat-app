import { 
  REGISTER_PENDING,
  REGISTER_FULFILLED,
  REGISTER_REJECTED
} from '../constants';

const initialState = {
  isLoading: false,
  isAuthenticated: false
};

const register = (state=initialState, action) => {
  switch(action.type) {
    case REGISTER_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case REGISTER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    case REGISTER_REJECTED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export default register;