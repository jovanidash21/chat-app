import { bindActionCreators } from 'redux';
import {
  fetchActiveUser,
  fetchSelectedUser,
  fetchUsers,
  createUser,
  editUser,
  deleteUser
} from './user';

const actions = (dispatch) => {
  return bindActionCreators({
    fetchActiveUser,
    fetchSelectedUser,
    fetchUsers,
    createUser,
    editUser,
    deleteUser
  }, dispatch);
}

export default actions;
