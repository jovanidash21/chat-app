import {
  SOCKET_REQUEST_VIDEO_CALL,
  SOCKET_CANCEL_REQUEST_VIDEO_CALL,
  SOCKET_REJECT_VIDEO_CALL,
  SOCKET_ACCEPT_VIDEO_CALL,
  SOCKET_END_VIDEO_CALL,
} from '../constants/video-call';

/**
 * Request video call
 *
 * @param {string} callerID
 * @param {object} receiver
 * @param {object} peerID
 */
export function requestVideoCall( callerID, receiver, peerID ) {
  return {
    type: SOCKET_REQUEST_VIDEO_CALL,
    callerID: callerID,
    receiverID: receiver._id,
    user: receiver,
    peerID: peerID,
  };
}

/**
 * Cancel request video call
 *
 * @param {string} receiverID
 */
export function cancelRequestVideoCall( receiverID ) {
  return {
    type: SOCKET_CANCEL_REQUEST_VIDEO_CALL,
    receiverID: receiverID,
  };
}

/**
 * Reject video call
 *
 * @param {string} callerID
 * @param {string} receiverID
 */
export function rejectVideoCall( callerID ) {
  return {
    type: SOCKET_REJECT_VIDEO_CALL,
    callerID: callerID,
  };
}

/**
 * Accept video call
 *
 * @param {string} callerID
 * @param {object} peerID
 */
export function acceptVideoCall( callerID, peerID ) {
  return {
    type: SOCKET_ACCEPT_VIDEO_CALL,
    callerID: callerID,
    peerID: peerID,
  };
}

/**
 * End video call
 *
 * @param {string} callerID
 */
export function endVideoCall( callerID ) {
  return {
    type: SOCKET_END_VIDEO_CALL,
    callerID: callerID,
  };
}
