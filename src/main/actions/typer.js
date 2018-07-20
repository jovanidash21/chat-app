import {
  SOCKET_IS_TYPING,
  SOCKET_IS_NOT_TYPING
} from '../constants/typer';

/**
 * Socket is typing
 * @param {Object} typer
 * @param {string} chatRoomID
 */
export function socketIsTyping(typer, chatRoomID) {
  return {
    type: SOCKET_IS_TYPING,
    typer: typer,
    chatRoomID: chatRoomID
  };
}

/**
 * Socket is not typing
 * @param {Object} typer
 * @param {string} chatRoomID
 */
export function socketIsNotTyping(typer, chatRoomID) {
  return {
    type: SOCKET_IS_NOT_TYPING,
    typer: typer,
    chatRoomID: chatRoomID
  };
}
