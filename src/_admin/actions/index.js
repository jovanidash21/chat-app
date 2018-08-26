import { bindActionCreators } from 'redux';
import {
  fetchActiveUser,
  fetchSelectedUser,
  fetchUsers,
  searchUser,
  createUser,
  editUser,
  deleteUser
} from './user';
import {
  fetchSelectedChatRoom,
  fetchChatRooms,
  createChatRoom,
  deleteChatRoom
} from './chat-room';
import { uploadImage } from './upload';

const actions = (dispatch) => {
  return bindActionCreators({
    fetchActiveUser,
    fetchSelectedUser,
    fetchUsers,
    searchUser,
    createUser,
    editUser,
    deleteUser,
    fetchSelectedChatRoom,
    fetchChatRooms,
    createChatRoom,
    deleteChatRoom,
    uploadImage
  }, dispatch);
}

export default actions;
