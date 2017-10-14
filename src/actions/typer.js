import {
  IS_TYPING,
  IS_NOT_TYPING
} from '../constants/typer';

export function isTyping(username) {
  return {
    type: IS_TYPING,
    username
  };
}

export function isNotTyping(username) {
  return {
    type: IS_NOT_TYPING,
    username
  };
}