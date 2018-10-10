import {
  FETCH_ACTIVE_USER,
  SEARCH_USER
} from '../constants/user';

const initialState = {
  fetchActive: {
    loading: false,
    success: false,
    error: false,
    message: ''
  },
  search: {
    loading: false,
    success: false,
    error: false,
    message: ''
  },
  active: {},
  searched: []
};

const user = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_ACTIVE_USER}_LOADING`:
      return {
        ...state,
        fetchActive: {
          ...state.fetchActive,
          loading: true
        }
      };
    case `${SEARCH_USER}_LOADING`:
      return {
        ...state,
        search: {
          ...state.search,
          loading: true
        },
        searched: []
      };
    case `${FETCH_ACTIVE_USER}_SUCCESS`:
      return {
        ...state,
        fetchActive: {
          ...state.fetchActive,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message
        },
        active: action.payload.data.user
      };
    case `${SEARCH_USER}_SUCCESS`:
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message
        },
        searched: action.payload.data.users
      };
    case `${FETCH_ACTIVE_USER}_ERROR`:
      return {
        ...state,
        fetchActive: {
          ...state.fetchActive,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message
        }
      };
    case `${SEARCH_USER}_ERROR`:
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message
        },
        searched: []
      };
    default:
      return state;
  }
}

export default user;
