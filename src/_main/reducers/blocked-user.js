import {
  FETCH_BLOCKED_USERS,
  BLOCK_USER,
  UNBLOCK_USER,
} from '../constants/blocked-user';

const commonStateFlags = {
  loading: false,
  success: false,
  error: false,
  message: '',
};

const initialState = {
  fetch: { ...commonStateFlags },
  block: { ...commonStateFlags },
  unblock: { ...commonStateFlags },
  all: [],
};

const blockedUser = ( state = initialState, action ) => {
  switch( action.type ) {
    case `${FETCH_BLOCKED_USERS}_LOADING`: {
      return {
        ...state,
        fetch: {
          ...state.fetch,
          loading: true,
        },
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
    case `${FETCH_BLOCKED_USERS}_SUCCESS`: {
      return {
        ...state,
        fetch: {
          ...state.fetch,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        all: [ ...action.payload.data.blockedUsers ],
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
    case `${FETCH_BLOCKED_USERS}_ERROR`: {
      return {
        ...state,
        fetch: {
          ...state.fetch,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        },
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

export default blockedUser;
