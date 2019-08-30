import {
  SOCKET_BROADCAST_IS_TYPING,
  SOCKET_BROADCAST_IS_NOT_TYPING
} from '../constants/typer';
import { CHANGE_CHAT_ROOM } from '../constants/chat-room';

const initialState = {
  activeChatRoom: {
    data: {},
  },
  all: [],
};

const typer = (state = initialState, action) => {
  switch(action.type) {
    case SOCKET_BROADCAST_IS_TYPING: {
      const typer = action.typer;
      const chatRoomID = action.chatRoomID;
      const activeChatRoom = {...state.activeChatRoom};
      const typers = [...state.all];

      const typerIndex = typers.findIndex((singleTyper) => {
        return singleTyper._id === typer._id;
      });

      if (activeChatRoom.data._id === chatRoomID && typerIndex === -1) {
        typers.push(typer);
      }

      return {
        ...state,
        all: [...typers],
      };
    }
    case SOCKET_BROADCAST_IS_NOT_TYPING: {
      const typer = action.typer;
      const chatRoomID = action.chatRoomID;
      const activeChatRoom = {...state.activeChatRoom};
      let typers = [...state.all];

      if (activeChatRoom.data._id === chatRoomID) {
        typers = typers.filter((singleTyper) => {
          return singleTyper._id !== typer._id;
        });
      }

      return {
        ...state,
        all: [...typers],
      };
    }
    case CHANGE_CHAT_ROOM: {
      return {
        ...state,
        activeChatRoom: action.chatRoom,
        all: [],
      };
    }
    default:
      return state;
  }
}

export default typer;
