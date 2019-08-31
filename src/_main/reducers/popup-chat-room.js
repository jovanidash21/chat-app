import {
  OPEN_POPUP_CHAT_ROOM,
  CLOSE_POPUP_CHAT_ROOM,
} from '../constants/popup-chat-room';
import {
  FETCH_NEW_MESSAGES,
  FETCH_OLD_MESSAGES,
  SEND_MESSAGE,
  SOCKET_BROADCAST_SEND_MESSAGE,
  DELETE_MESSAGE,
  SOCKET_BROADCAST_DELETE_MESSAGE,
} from '../constants/message';
import {
  SOCKET_BROADCAST_IS_TYPING,
  SOCKET_BROADCAST_IS_NOT_TYPING,
} from '../constants/typer';
import {
  SOCKET_BROADCAST_USER_LOGIN,
  SOCKET_BROADCAST_USER_LOGOUT,
} from '../constants/auth';

const initialState = {
  all: [],
};

const popUpChatRoom = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_POPUP_CHAT_ROOM: {
      const chatRoom = action.chatRoom;
      const chatRooms = [ ...state.all ];

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoom.data._id;
      });

      if (chatRoomIndex === -1) {
        chatRooms.push(chatRoom);
      }

      return {
        ...state,
        all: [...chatRooms],
      };
    }
    case CLOSE_POPUP_CHAT_ROOM: {
      const chatRoomID = action.chatRoomID;
      let chatRooms = [...state.all];

      chatRooms = chatRooms.filter((singlChatRoom) => {
        return singlChatRoom.data._id !== chatRoomID;
      });

      return {
        ...state,
        all: [...chatRooms],
      };
    }
    case `${FETCH_NEW_MESSAGES}_LOADING`: {
      const chatRoomID = action.meta;
      const chatRooms = [...state.all];

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoomID;
      });

      if (chatRoomIndex > -1) {
        chatRooms[chatRoomIndex].message.fetchNew = {
          ...chatRooms[chatRoomIndex].message.fetchNew,
          loading: true,
        };
      }

      return {
        ...state,
        all: [ ...chatRooms ],
      };
    }
    case `${FETCH_OLD_MESSAGES}_LOADING`: {
      const chatRoomID = action.meta;
      const chatRooms = [...state.all];

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoomID;
      });

      if (chatRoomIndex > -1) {
        chatRooms[chatRoomIndex].message.fetchOld = {
          ...chatRooms[chatRoomIndex].message.fetchOld,
          loading: true,
        };
      }

      return {
        ...state,
        all: [...chatRooms],
      };
    }
    case `${FETCH_NEW_MESSAGES}_SUCCESS`: {
      const chatRoomID = action.meta;
      const chatRooms = [...state.all];

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoomID;
      });

      if (chatRoomIndex > -1) {
        chatRooms[chatRoomIndex].message.fetchNew = {
          ...chatRooms[chatRoomIndex].message.fetchNew,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        };
        chatRooms[chatRoomIndex].message.all = action.payload.data.messages;
      }

      return {
        ...state,
        all: [ ...chatRooms ],
      };
    }
    case `${FETCH_OLD_MESSAGES}_SUCCESS`: {
      const chatRoomID = action.meta;
      const chatRooms = [...state.all];

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoomID;
      });

      if (chatRoomIndex > -1) {
        chatRooms[chatRoomIndex].message.fetchOld = {
          ...chatRooms[chatRoomIndex].message.fetchOld,
          loading: false,
          success: true,
          error: false,
          message: action.payload.data.message,
        };
        chatRooms[chatRoomIndex].message.all = [
          ...action.payload.data.messages,
          ...chatRooms[chatRoomIndex].message.all,
        ];
      }

      return {
        ...state,
        all: [...chatRooms],
      };
    }
    case `${FETCH_NEW_MESSAGES}_ERROR`: {
      const chatRoomID = action.meta;
      const chatRooms = [...state.all];

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoomID;
      });

      if (chatRoomIndex > -1) {
        chatRooms[chatRoomIndex].message.fetchNew = {
          ...chatRooms[chatRoomIndex].message.fetchNew,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        };
      }

      return {
        ...state,
        all: [ ...chatRooms],
      };
    }
    case `${FETCH_OLD_MESSAGES}_ERROR`: {
      const chatRoomID = action.meta;
      const chatRooms = [ ...state.all ];

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoomID;
      });

      if (chatRoomIndex > -1) {
        chatRooms[chatRoomIndex].message.fetchOld = {
          ...chatRooms[chatRoomIndex].message.fetchOld,
          loading: false,
          success: false,
          error: true,
          message: action.payload.response.data.message,
        };
      }

      return {
        ...state,
        all: [...chatRooms],
      };
    }
    case `${SEND_MESSAGE}_SUCCESS`: {
      const messageID = action.meta;
      const newMessage = action.payload.data.messageData;
      const chatRooms = [...state.all ];

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === newMessage.chatRoom;
      });

      if (chatRoomIndex > -1) {
        const messages = [...chatRooms[chatRoomIndex].message.all];
        const messageIndex = messages.findIndex((singleMessage) => {
          return singleMessage._id === messageID;
        });

        if (messageIndex > -1) {
          newMessage.isSending = false;
          messages[messageIndex] = newMessage;
        }

        chatRooms[chatRoomIndex].message.all = messages;
      }

      return {
        ...state,
        all: [...chatRooms],
      };
    }
    case SEND_MESSAGE:
    case SOCKET_BROADCAST_SEND_MESSAGE: {
      const message = action.message;
      const chatRooms = [...state.all];

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === message.chatRoom;
      });

      if (chatRoomIndex > -1) {
        const messages = [...chatRooms[chatRoomIndex].message.all];

        messages.push(message);

        chatRooms[chatRoomIndex].message.all = messages;
      }

      return {
        ...state,
        all: [...chatRooms],
      };
    }
    case `${DELETE_MESSAGE}_SUCCESS`: {
      const messageID = action.meta.messageID;
      const chatRoomID = action.meta.chatRoomID;
      const chatRooms = [...state.all];

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoomID;
      });

      if (chatRoomIndex > -1) {
        chatRooms[chatRoomIndex].message.all = chatRooms[chatRoomIndex].message.all.filter((message) => {
          return message._id !== messageID;
        });
      }

      return {
        ...state,
        all: [...chatRooms],
      };
    }
    case SOCKET_BROADCAST_DELETE_MESSAGE: {
      const messageID = action.messageID;
      const chatRoomID = action.chatRoomID;
      const chatRooms = [...state.all];

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoomID;
      });

      if (chatRoomIndex > -1) {
        chatRooms[chatRoomIndex].message.all = chatRooms[chatRoomIndex].message.all.filter((message) => {
          return message._id !== messageID;
        });
      }

      return {
        ...state,
        all: [...chatRooms],
      };
    }
    case SOCKET_BROADCAST_IS_TYPING: {
      const typer = action.typer;
      const chatRoomID = action.chatRoomID;
      const chatRooms = [...state.all];

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoomID;
      });

      if (chatRoomIndex > -1) {
        chatRooms[chatRoomIndex].typer.all = chatRooms[chatRoomIndex].typer.all.filter((singleTyper) => {
          return singleTyper._id !== typer._id;
        });
        chatRooms[chatRoomIndex].typer.all.push(typer);
      }

      return {
        ...state,
        all: [...chatRooms],
      };
    }
    case SOCKET_BROADCAST_IS_NOT_TYPING: {
      const typer = action.typer;
      const chatRoomID = action.chatRoomID;
      const chatRooms = [...state.all];

      const chatRoomIndex = chatRooms.findIndex((singleChatRoom) => {
        return singleChatRoom.data._id === chatRoomID;
      });

      if (chatRoomIndex > -1) {
        chatRooms[chatRoomIndex].typer.all = chatRooms[chatRoomIndex].typer.all.filter((singleTyper) => {
          return singleTyper._id !== typer._id;
        });
      }

      return {
        ...state,
        all: [...chatRooms],
      };
    }
    case SOCKET_BROADCAST_USER_LOGIN: {
      const user = action.user;
      const userID = user._id;
      const chatRooms = [...state.all];

      if (chatRooms.length > 0) {
        for (let i = 0; i < chatRooms.length; i += 1) {
          const chatRoom = chatRooms[i];
          const members = chatRoom.data.members;

          if (members.length > 0) {
            const memberIndex = members.findIndex((singleMember) => {
              return singleMember._id === userID;
            });

            if (memberIndex > -1) {
              members[memberIndex].isOnline = true;
            }
          }
        }
      }

      return {
        ...state,
        all: [...chatRooms],
      };
    }
    case SOCKET_BROADCAST_USER_LOGOUT: {
      const userID = action.userID;
      const chatRooms = [...state.all];

      if (chatRooms.length > 0) {
        for (let i = 0; i < chatRooms.length; i += 1) {
          const chatRoom = chatRooms[i];
          const members = chatRoom.data.members;

          if (members.length > 0) {
            const memberIndex = members.findIndex((singleMember) => {
              return singleMember._id === userID;
            });

            if (memberIndex > -1) {
              members[memberIndex].isOnline = false;
            }
          }
        }
      }

      return {
        ...state,
        all: [ ...chatRooms ],
      };
    }
    default:
      return state;
  }
}

export default popUpChatRoom;
