import { bindActionCreators } from 'redux';
import {
  fetchActiveUser,
  fetchSelectedUser,
  fetchUsers,
  createUser,
  editUser,
  deleteUser
} from './user';
import { fetchChatRooms } from './chat-room';
import { uploadImage } from './upload';

const actions = (dispatch) => {
  return bindActionCreators({
    fetchActiveUser,
    fetchSelectedUser,
    fetchUsers,
    createUser,
    editUser,
    deleteUser,
    fetchChatRooms,
    uploadImage
  }, dispatch);
}

export default actions;
