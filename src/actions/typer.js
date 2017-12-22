import {
  IS_TYPING,
  IS_NOT_TYPING
} from '../constants/typer';

export function isTyping(typer) {
  return {
    type: IS_TYPING,
    typer
  };
}

export function isNotTyping(typer) {
  return {
    type: IS_NOT_TYPING,
    typer
  };
}
