import {
  FETCH_ACTIVE_USER,
  EDIT_ACTIVE_USER,
  SEARCH_USER,
} from '../constants/user';

const commonStateFlags = {
  loading: false,
  success: false,
  error: false,
  message: '',
};

const initialState = {
  fetchActive: {...commonStateFlags},
  editActive: {...commonStateFlags},
  search: {...commonStateFlags},
  active: {},
  searched: [],
};

const user = (state = initialState, action) => {
  switch(action.type) {
    case `${FETCH_ACTIVE_USER}_LOADING`: {
      return {
        ...state,
        fetchActive: {
          ...state.fetchActive,
          loading: true,
        },
      };
    }
    case `${EDIT_ACTIVE_USER}_LOADING`: {
      return {
        ...state,
        editActive: {
          ...state.editActive,
          loading: true,
        },
      };
    }
    case `${SEARCH_USER}_LOADING`: {
      return {
        ...state,
        search: {
          ...state.search,
          loading: true,
        },
        searched: [],
      };
    }
    case `${FETCH_ACTIVE_USER}_SUCCESS`: {
      return {
        ...state,
        fetchActive: {
          ...state.fetchActive,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        active: action.payload.data.user,
      };
    }
    case `${EDIT_ACTIVE_USER}_SUCCESS`: {
      return {
        ...state,
        editActive: {
          ...state.editActive,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        active: action.payload.data.user,
      };
    }
    case `${SEARCH_USER}_SUCCESS`: {
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        searched: action.payload.data.users,
      };
    }
    case `${FETCH_ACTIVE_USER}_ERROR`: {
      return {
        ...state,
        fetchActive: {
          ...state.fetchActive,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${EDIT_ACTIVE_USER}_ERROR`: {
      return {
        ...state,
        editActive: {
          ...state.editActive,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${SEARCH_USER}_ERROR`: {
      return {
        ...state,
        search: {
          ...state.search,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
        searched: [],
      };
    }
    default:
      return state;
  }
}

export default user;
