import { CHANGE_CHAT_ROOM } from '../constants/active-chat-room';

export function changeChatRoom(chatRoom) {
  return {
    type: CHANGE_CHAT_ROOM,
    payload: chatRoom
  };
}
