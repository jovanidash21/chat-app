import {
  FETCH_ACTIVE_USER,
  FETCH_USERS_COUNT,
  FETCH_USERS_GRAPH,
  FETCH_SELECTED_USER,
  FETCH_USERS,
  EDIT_ACTIVE_USER,
  SEARCH_USER,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
} from '../constants/user';

const commonStateFlags = {
  loading: false,
  success: false,
  error: false,
  message: '',
};

const initialState = {
  fetchActive: {...commonStateFlags},
  fetchCount: {...commonStateFlags},
  fetchGraph: {...commonStateFlags},
  fetchSelect: {...commonStateFlags},
  fetchAll: {...commonStateFlags},
  editActive: {...commonStateFlags},
  search: {...commonStateFlags},
  create: {...commonStateFlags},
  edit: {...commonStateFlags},
  delete: {...commonStateFlags},
  count: 0,
  active: {},
  graph: [],
  all: [],
  selected: {},
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
    case `${FETCH_USERS_COUNT}_LOADING`: {
      return {
        ...state,
        fetchCount: {
          ...state.fetchCount,
          loading: true,
        },
      };
    }
    case `${FETCH_USERS_GRAPH}_LOADING`: {
      return {
        ...state,
        fetchGraph: {
          ...state.fetchGraph,
          loading: true,
        },
      };
    }
    case `${FETCH_SELECTED_USER}_LOADING`: {
      return {
        ...state,
        fetchSelect: {
          ...state.fetchSelect,
          loading: true,
        },
      };
    }
    case `${FETCH_USERS}_LOADING`: {
      return {
        ...state,
        fetchAll: {
          ...state.fetchAll,
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
    case `${CREATE_USER}_LOADING`: {
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
        },
      };
    }
    case `${EDIT_USER}_LOADING`: {
      return {
        ...state,
        edit: {
          ...state.edit,
          loading: true,
        },
      };
    }
    case `${DELETE_USER}_LOADING`:
      return {
        ...state,
        delete: {
          ...state.delete,
          loading: true,
        },
      };

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
    case `${FETCH_USERS_COUNT}_SUCCESS`: {
      return {
        ...state,
        fetchCount: {
          ...state.fetchCount,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        count: action.payload.data.count,
      };
    }
    case `${FETCH_USERS_GRAPH}_SUCCESS`: {
      return {
        ...state,
        fetchGraph: {
          ...state.fetchGraph,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        graph: action.payload.data.graph,
      };
    }
    case `${FETCH_SELECTED_USER}_SUCCESS`: {
      return {
        ...state,
        fetchSelect: {
          ...state.fetchSelect,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        selected: action.payload.data.user,
      };
    }
    case `${FETCH_USERS}_SUCCESS`: {
      return {
        ...state,
        fetchAll: {
          ...state.fetchAll,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        all: action.payload.data.users,
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
    case `${CREATE_USER}_SUCCESS`: {
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
      };
    }
    case `${EDIT_USER}_SUCCESS`: {
      return {
        ...state,
        edit: {
          ...state.edit,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
      };
    }
    case `${DELETE_USER}_SUCCESS`: {
      let users = [...state.all];
      const userID = action.meta;

      users = users.filter((user) => {
        return user._id !== userID;
      });

      return {
        ...state,
        delete: {
          ...state.delete,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        all: [...users],
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
    case `${FETCH_USERS_COUNT}_ERROR`: {
      return {
        ...state,
        fetchCount: {
          ...state.fetchCount,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${FETCH_USERS_GRAPH}_ERROR`: {
      return {
        ...state,
        fetchGraph: {
          ...state.fetchGraph,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${FETCH_SELECTED_USER}_ERROR`: {
      return {
        ...state,
        fetchSelect: {
          ...state.fetchSelect,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${FETCH_USERS}_ERROR`: {
      return {
        ...state,
        fetchAll: {
          ...state.fetchAll,
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
    case `${CREATE_USER}_ERROR`: {
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${EDIT_USER}_ERROR`: {
      return {
        ...state,
        edit: {
          ...state.edit,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
      };
    }
    case `${DELETE_USER}_ERROR`: {
      return {
        ...state,
        delete: {
          ...state.delete,
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
