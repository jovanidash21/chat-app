import { bindActionCreators } from 'redux';
import {
  socketUserLogin,
  localLogin,
  facebookLogin,
  googleLogin,
  twitterLogin,
  instagramLogin,
  linkedinLogin,
  githubLogin,
  register
} from './auth';
import {
  fetchActiveUser,
  searchUser
} from './user';
import {
  isTyping,
  isNotTyping
} from './typer';
import {
  changeChatRoom,
  createGroupChatRoom,
  createDirectChatRoom,
  clearChatRoomUnreadMessages,
  muteChatRoom,
  unmuteChatRoom
} from './chat-room';
import {
  openPopUpChatRoom,
  closePopUpChatRoom
} from './popup-chat-room';
import {
  fetchOldMessages,
  sendTextMessage,
  sendFileMessage,
  sendAudioMessage,
  deleteMessage
} from './message';

const actions = (dispatch) => {
  return bindActionCreators({
    socketUserLogin,
    localLogin,
    facebookLogin,
    googleLogin,
    twitterLogin,
    instagramLogin,
    linkedinLogin,
    githubLogin,
    register,
    fetchActiveUser,
    searchUser,
    isTyping,
    isNotTyping,
    changeChatRoom,
    createGroupChatRoom,
    createDirectChatRoom,
    clearChatRoomUnreadMessages,
    muteChatRoom,
    unmuteChatRoom,
    openPopUpChatRoom,
    closePopUpChatRoom,
    fetchOldMessages,
    sendTextMessage,
    sendFileMessage,
    sendAudioMessage,
    deleteMessage
  }, dispatch);
}

export default actions;
