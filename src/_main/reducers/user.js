import {
  FETCH_ACTIVE_USER,
  EDIT_ACTIVE_USER,
  SEARCH_USER,
  BLOCK_USER,
  UNBLOCK_USER,
} from '../constants/user';

const commonStateFlags = {
  loading: false,
  success: false,
  error: false,
  message: '',
};

const initialState = {
  fetchActive: { ...commonStateFlags },
  editActive: { ...commonStateFlags },
  search: { ...commonStateFlags },
  block: { ...commonStateFlags },
  unblock: { ...commonStateFlags },
  active: {},
  searched: [],
};

const user = ( state = initialState, action ) => {
  switch( action.type ) {
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
    case `${BLOCK_USER}_LOADING`: {
      return {
        ...state,
        block: {
          ...state.block,
          loading: true,
        },
      };
    }
    case `${UNBLOCK_USER}_LOADING`: {
      return {
        ...state,
        unblock: {
          ...state.unblock,
          loading: true,
        },
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
    case `${BLOCK_USER}_SUCCESS`: {
      return {
        ...state,
        block: {
          ...state.block,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
      };
    }
    case `${UNBLOCK_USER}_SUCCESS`: {
      return {
        ...state,
        unblock: {
          ...state.unblock,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
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
    case `${BLOCK_USER}_ERROR`: {
      return {
        ...state,
        block: {
          ...state.block,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${UNBLOCK_USER}_ERROR`: {
      return {
        ...state,
        unblock: {
          ...state.unblock,
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

export default user;
