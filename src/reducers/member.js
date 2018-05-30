import { FETCH_MEMBERS } from '../constants/member';

const initialState = {
  isLoading: false,
  all: []
};

const member = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_MEMBERS}_LOADING`:
      return {
        ...state,
        isLoading: true
      };
    case `${FETCH_MEMBERS}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isFetchMembersSuccess: true,
        all: action.payload.data
      };
    case `${FETCH_MEMBERS}_ERROR`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}

export default member;
