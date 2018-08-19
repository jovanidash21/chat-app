import { bindActionCreators } from 'redux';
import {
  fetchActiveUser,
  fetchUsers,
  createUser,
  deleteUser,
  selectUser,
  deselectUser
} from './user';

const actions = (dispatch) => {
  return bindActionCreators({
    fetchActiveUser,
    fetchUsers,
    createUser,
    deleteUser,
    selectUser,
    deselectUser
  }, dispatch);
}

export default actions;
