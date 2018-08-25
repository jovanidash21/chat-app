import { bindActionCreators } from 'redux';
import {
  fetchActiveUser,
  fetchSelectedUser,
  fetchUsers,
  createUser,
  editUser,
  deleteUser
} from './user';
import {
  fetchSelectedChatRoom,
  fetchChatRooms
} from './chat-room';
import { uploadImage } from './upload';

const actions = (dispatch) => {
  return bindActionCreators({
    fetchActiveUser,
    fetchSelectedUser,
    fetchUsers,
    createUser,
    editUser,
    deleteUser,
    fetchSelectedChatRoom,
    fetchChatRooms,
    uploadImage
  }, dispatch);
}

export default actions;
