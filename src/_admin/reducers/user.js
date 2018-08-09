import {
  FETCH_USER,
  FETCH_USERS,
  CREATE_USER,
  DELETE_USER,
  SELECT_USER,
  DESELECT_USER
} from '../constants/user';

const initialState = {
  isFetchingActive: false,
  isFetchingActiveSuccess: false,
  isFetchingAll: false,
  isFetchingAllSuccess: false,
  isCreating: false,
  isCreatingSuccess: true,
  isDeleting: false,
  isDeletingSuccess: true,
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
    case `${CREATE_USER}_LOADING`:
      return {
        ...state,
        isCreating: true
      };
    case `${DELETE_USER}_LOADING`:
      return {
        ...state,
        isDeleting: true
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
    case `${CREATE_USER}_SUCCESS`:
      return {
        ...state,
        isCreating: false,
        isCreatingSuccess: true
      };
    case `${DELETE_USER}_SUCCESS`:
      var users = [...state.all];
      var userID = action.meta;

      users = users.filter((user) => user._id !== userID);

      return {
        ...state,
        isDeleting: false,
        isDeletingSuccess: true,
        all: [...users]
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
    case `${CREATE_USER}_ERROR`:
      return {
        ...state,
        isCreating: false,
        isCreatingSuccess: false
      };
    case `${DELETE_USER}_ERROR`:
      return {
        ...state,
        isDeleting: false,
        isDeletingSuccess: false
      };
    case SELECT_USER:
      return {
        ...state,
        selected: action.user
      };
    case DESELECT_USER:
      return {
        ...state,
        isDeleting: false,
        isDeletingSuccess: true,
        selected: {}
      };
    default:
      return state;
  }
}

export default user;
