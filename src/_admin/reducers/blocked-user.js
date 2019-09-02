import {
  FETCH_BLOCKED_USERS,
  BLOCK_USER,
  UNBLOCK_USER,
  UNBLOCK_ALL_USERS,
} from '../constants/blocked-user';

const commonStateFlags = {
  loading: false,
  success: false,
  error: false,
  message: '',
};

const initialState = {
  fetch: {...commonStateFlags},
  block: {...commonStateFlags},
  unblock: {...commonStateFlags},
  unblockAll: {...commonStateFlags},
  all: [],
};

const blockedUser = (state = initialState, action) => {
  switch(action.type) {
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
    case `${UNBLOCK_ALL_USERS}_LOADING`: {
      return {
        ...state,
        unblockAll: {
          ...state.unblockAll,
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
      const blockedUserID = action.meta;
      const blockedUsers = [...state.all];

      const blockedUserIndex = blockedUsers.findIndex((blockedUser) => {
        return blockedUser._id === blockedUserID;
      });

      if (blockedUserIndex > -1) {
        blockedUsers[blockedUserIndex].blocked = true;
      }

      return {
        ...state,
        block: {
          ...state.block,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        all: [...blockedUsers],
      };
    }
    case `${UNBLOCK_USER}_SUCCESS`: {
      const unblockedUserID = action.meta;
      const blockedUsers = [...state.all];

      const blockedUserIndex = blockedUsers.findIndex(( blockedUser ) => {
        return blockedUser._id === unblockedUserID;
      });

      if (blockedUserIndex > -1) {
        blockedUsers[blockedUserIndex].blocked = false;
      }

      return {
        ...state,
        unblock: {
          ...state.unblock,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        all: [...blockedUsers],
      };
    }
    case `${UNBLOCK_ALL_USERS}_SUCCESS`: {
      const blockedUsers = [...state.all];

      for (let i = 0; i < blockedUsers.length; i += 1) {
        blockedUsers[i].blocked = false;
      }

      return {
        ...state,
        unblockAll: {
          ...state.unblockAll,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        },
        all: [...blockedUsers],
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
    case `${UNBLOCK_ALL_USERS}_ERROR`: {
      return {
        ...state,
        unblockAll: {
          ...state.unblockAll,
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
