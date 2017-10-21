import { GET_USER_DATA } from '../constants/user';

const initialState = {
  isLoading: false,
  isError: false,
  userData: {
    username: null,
    name: null,
    email: null,
    profilePicture: null
  }
};

const user = (state=initialState, action) => {
  switch(action.type) {
    case `${GET_USER_DATA}_LOADING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_USER_DATA}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        userData: {
          username: action.payload.data.username,
          name: action.payload.data.name,
          email: action.payload.data.email,
          profilePicture: action.payload.data.profilePicture
        }
      };
    case `${GET_USER_DATA}_ERROR`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}

export default user;