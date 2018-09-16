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
  socketIsTyping,
  socketIsNotTyping
} from './typer';
import {
  changeChatRoom,
  createGroupChatRoom,
  createDirectChatRoom,
  socketJoinChatRoom,
  socketLeaveChatRoom
} from './chat-room';
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
    socketIsTyping,
    socketIsNotTyping,
    changeChatRoom,
    createGroupChatRoom,
    createDirectChatRoom,
    socketJoinChatRoom,
    socketLeaveChatRoom,
    fetchOldMessages,
    sendTextMessage,
    sendFileMessage,
    sendAudioMessage,
    deleteMessage
  }, dispatch);
}

export default actions;
