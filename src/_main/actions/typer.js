import {
  SOCKET_IS_TYPING,
  SOCKET_IS_NOT_TYPING,
} from '../constants/typer';

/**
 * Socket is typing
 *
 * @param {Object} typer
 * @param {string} chatRoomID
 */
export function isTyping(typer, chatRoomID) {
  return {
    type: SOCKET_IS_TYPING,
    typer,
    chatRoomID,
  };
}

/**
 * Socket is not typing
 *
 * @param {Object} typer
 * @param {string} chatRoomID
 */
export function isNotTyping(typer, chatRoomID) {
  return {
    type: SOCKET_IS_NOT_TYPING,
    typer,
    chatRoomID,
  };
}
