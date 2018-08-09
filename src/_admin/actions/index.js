import { bindActionCreators } from 'redux';
import {
  fetchUser,
  fetchUsers,
  createUser,
  deleteUser,
  selectUser,
  deselectUser
} from './user';

const actions = (dispatch) => {
  return bindActionCreators({
    fetchUser,
    fetchUsers,
    createUser,
    deleteUser,
    selectUser,
    deselectUser
  }, dispatch);
}

export default actions;
