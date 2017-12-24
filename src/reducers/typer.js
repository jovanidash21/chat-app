import {
  SOCKET_BROADCAST_IS_TYPING,
  SOCKET_BROADCAST_IS_NOT_TYPING
} from '../constants/typer';

const initialState = [];

const typer = (state=initialState, action) => {
  switch(action.type) {
    case SOCKET_BROADCAST_IS_TYPING:
      if (state.indexOf(action.typer._id) === -1) {
        return [
          ...state,
          action.typer
        ];
      }
      return state;
    case SOCKET_BROADCAST_IS_NOT_TYPING:
      return state.filter(typer =>
        typer._id !== action.typer._id
      );
    default:
      return state;
  }
}

export default typer;
