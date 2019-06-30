import { bindActionCreators } from 'redux';
import {
  fetchActiveUser,
  fetchUsersCount,
  fetchUsersGraph,
  fetchSelectedUser,
  fetchUsers,
  editActiveUser,
  searchUser,
  createUser,
  editUser,
  deleteUser,
} from './user';
import {
  fetchChatRoomsCount,
  fetchSelectedChatRoom,
  fetchChatRooms,
  createChatRoom,
  editChatRoom,
  deleteChatRoom,
} from './chat-room';
import { fetchMessagesCount } from './message';
import {
  fetchBlockedUsers,
  blockUser,
  unblockUser,
  unblockAllUsers,
} from './blocked-user';
import { uploadImage } from './upload';

const actions = (dispatch) => {
  return bindActionCreators({
    fetchActiveUser,
    fetchUsersCount,
    fetchUsersGraph,
    fetchSelectedUser,
    fetchUsers,
    editActiveUser,
    searchUser,
    createUser,
    editUser,
    deleteUser,
    fetchChatRoomsCount,
    fetchSelectedChatRoom,
    fetchChatRooms,
    createChatRoom,
    editChatRoom,
    deleteChatRoom,
    fetchMessagesCount,
    fetchBlockedUsers,
    blockUser,
    unblockUser,
    unblockAllUsers,
    uploadImage,
  }, dispatch);
}

export default actions;
