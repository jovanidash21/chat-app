import {
  FETCH_USER,
  SEARCH_USER
} from '../constants/user';

const initialState = {
  isFetchingActive: false,
  isFetchingActiveSuccess: false,
  active: {},
  search: []
};

const user = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_USER}_LOADING`:
      return {
        ...state,
        isFetchingActive: true
      };
    case `${SEARCH_USER}_LOADING`:
      return {
        ...state,
        search: []
      };
    case `${FETCH_USER}_SUCCESS`:
      return {
        ...state,
        isFetchingActive: false,
        isFetchingActiveSuccess: true,
        active: action.payload.data
      };
    case `${SEARCH_USER}_SUCCESS`:
      return {
        ...state,
        search: action.payload.data
      };
    case `${FETCH_USER}_ERROR`:
      return {
        ...state,
        isFetchingActive: false,
        isFetchingActiveSuccess: false
      };
    case `${SEARCH_USER}_ERROR`:
      return {
        ...state,
        search: []
      };
    default:
      return state;
  }
}

export default user;
