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
  editChatRoom,
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
    editChatRoom,
    deleteChatRoom,
    uploadImage
  }, dispatch);
}

export default actions;
