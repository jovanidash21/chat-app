import {
  SOCKET_IS_TYPING,
  SOCKET_IS_NOT_TYPING
} from '../constants/typer';

export function socketIsTyping(typer, chatRoom) {
  return {
    type: SOCKET_IS_TYPING,
    typer: typer,
    chatRoom: chatRoom
  };
}

export function socketIsNotTyping(typer, chatRoom) {
  return {
    type: SOCKET_IS_NOT_TYPING,
    typer: typer,
    chatRoom: chatRoom
  };
}
