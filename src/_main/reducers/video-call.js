import {
  SOCKET_REQUEST_VIDEO_CALL,
  SOCKET_BROADCAST_REQUEST_VIDEO_CALL,
  SOCKET_CANCEL_REQUEST_VIDEO_CALL,
  SOCKET_BROADCAST_CANCEL_REQUEST_VIDEO_CALL,
  SOCKET_REJECT_VIDEO_CALL,
  SOCKET_BROADCAST_REJECT_VIDEO_CALL,
  SOCKET_ACCEPT_VIDEO_CALL,
  SOCKET_BROADCAST_ACCEPT_VIDEO_CALL,
  SOCKET_END_VIDEO_CALL,
  SOCKET_BROADCAST_END_VIDEO_CALL,
} from '../constants/video-call';
import { isObjectEmpty } from '../../utils/object';

const initialState = {
  active: false,
  peerUser: {},
};

const videoCall = (state = initialState, action) => {
  switch(action.type) {
    case SOCKET_REQUEST_VIDEO_CALL:
    case SOCKET_BROADCAST_REQUEST_VIDEO_CALL: {
      const user =  action.user;
      const active = state.active;
      const peerUser = {...state.peerUser};

      if (!active && isObjectEmpty(peerUser)) {
        return {
          ...state,
          active: false,
          peerUser: user,
        };
      }

      return {
        ...state,
      };
    }
    case SOCKET_ACCEPT_VIDEO_CALL:
    case SOCKET_BROADCAST_ACCEPT_VIDEO_CALL: {
      return {
        ...state,
        active: true,
      };
    }
    case SOCKET_CANCEL_REQUEST_VIDEO_CALL:
    case SOCKET_BROADCAST_CANCEL_REQUEST_VIDEO_CALL:
    case SOCKET_REJECT_VIDEO_CALL:
    case SOCKET_BROADCAST_REJECT_VIDEO_CALL:
    case SOCKET_END_VIDEO_CALL:
    case SOCKET_BROADCAST_END_VIDEO_CALL: {
      return {
        ...state,
        active: false,
        peerUser: {},
      };
    }
    default:
      return state;
  }
}

export default videoCall;
