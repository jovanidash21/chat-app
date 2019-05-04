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
} from './auth';
import {
  fetchActiveUser,
  editActiveUser,
  searchUser,
  blockUser,
  unblockUser,
} from './user';
import {
  isTyping,
  isNotTyping,
} from './typer';
import {
  changeChatRoom,
  createGroupChatRoom,
  createDirectChatRoom,
  clearChatRoomUnreadMessages,
  muteChatRoom,
  unmuteChatRoom,
} from './chat-room';
import {
  openPopUpChatRoom,
  closePopUpChatRoom,
} from './popup-chat-room';
import {
  fetchOldMessages,
  sendTextMessage,
  sendFileMessage,
  sendAudioMessage,
  deleteMessage,
} from './message';
import {
  requestVideoCall,
  cancelRequestVideoCall,
  rejectVideoCall,
  acceptVideoCall,
  endVideoCall,
} from './video-call';
import { uploadImage } from './upload';

const actions = ( dispatch ) => {
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
    editActiveUser,
    searchUser,
    blockUser,
    unblockUser,
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
    deleteMessage,
    requestVideoCall,
    cancelRequestVideoCall,
    rejectVideoCall,
    acceptVideoCall,
    endVideoCall,
    uploadImage,
  }, dispatch);
}

export default actions;
