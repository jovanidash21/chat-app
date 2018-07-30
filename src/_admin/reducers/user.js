import {
  FETCH_USER,
  FETCH_USERS,
  SELECT_USER,
} from '../constants/user';

const initialState = {
  isFetchingActive: false,
  isFetchingActiveSuccess: false,
  isFetchingAll: false,
  isFetchingAllSuccess: false,
  active: {},
  all: [],
  selected: {}
};

const user = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_USER}_LOADING`:
      return {
        ...state,
        isFetchingActive: true
      };
    case `${FETCH_USERS}_LOADING`:
      return {
        ...state,
        isFetchingAll: true
      };
    case `${FETCH_USER}_SUCCESS`:
      return {
        ...state,
        isFetchingActive: false,
        isFetchingActiveSuccess: true,
        active: action.payload.data
      };
    case `${FETCH_USERS}_SUCCESS`:
      return {
        ...state,
        isFetchingAll: false,
        isFetchingAllSuccess: true,
        all: action.payload.data
      };
    case `${FETCH_USER}_ERROR`:
      return {
        ...state,
        isFetchingActive: false,
        isFetchingActiveSuccess: false
      };
    case `${FETCH_USERS}_ERROR`:
      return {
        ...state,
        isFetchingAll: false,
        isFetchingAllSuccess: false
      };
    case SELECT_USER:
      return {
        ...state,
        isDeleting: false,
        isDeletingSuccess: true,
        selected: action.user
      };
    default:
      return state;
  }
}

export default user;
