import {
  IS_TYPING,
  IS_NOT_TYPING
} from '../constants/typer';

const initialState = [];

const typer = (state=initialState, action) => {
  switch(action.type) {
    case IS_TYPING:
      if (state.indexOf(action.username) === -1) {
        return [
          ...state,
          action.typer
        ];
      }
      return state;
    case IS_NOT_TYPING:
      return state.filter(typer =>
        typer._id !== action.typer._id
      );
    default:
      return state;
  }
}

export default typer;
