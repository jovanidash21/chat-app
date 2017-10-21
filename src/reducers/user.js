import { FECTH_USER } from '../constants/user';

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
    case `${FECTH_USER}_LOADING`:
      return {
        ...state,
        isLoading: true
      };
    case `${FECTH_USER}_SUCCESS`:
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
    case `${FECTH_USER}_ERROR`:
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