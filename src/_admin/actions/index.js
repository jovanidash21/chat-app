import { bindActionCreators } from 'redux';
import {
  fetchActiveUser,
  fetchSelectedUser,
  fetchUsers,
  createUser,
  editUser,
  deleteUser,
  selectUser,
  deselectUser
} from './user';

const actions = (dispatch) => {
  return bindActionCreators({
    fetchActiveUser,
    fetchSelectedUser,
    fetchUsers,
    createUser,
    editUser,
    deleteUser,
    selectUser,
    deselectUser
  }, dispatch);
}

export default actions;
