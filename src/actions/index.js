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
  register,
  logout
} from './auth';
import {
  fetchUser,
  fetchUsers
} from './user';
import { sendEmail } from './email';
import {
  socketIsTyping,
  socketIsNotTyping
} from './typer';
import {
  fetchChatRooms,
  createChatRoom,
  socketJoinChatRoom,
  socketLeaveChatRoom
} from './chat-room';
import { changeChatRoom } from './active-chat-room';
import {
  fetchMessages,
  sendMessage
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
    logout,
    fetchUser,
    fetchUsers,
    socketIsTyping,
    socketIsNotTyping,
    fetchChatRooms,
    createChatRoom,
    socketJoinChatRoom,
    socketLeaveChatRoom,
    changeChatRoom,
    fetchMessages,
    sendMessage
  }, dispatch);
}

export default actions;
