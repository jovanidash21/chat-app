import { bindActionCreators } from 'redux';
import {
  fetchUser,
  fetchUsers,
  deleteUser,
  selectUser,
  deselectUser
} from './user';

const actions = (dispatch) => {
  return bindActionCreators({
    fetchUser,
    fetchUsers,
    deleteUser,
    selectUser,
    deselectUser
  }, dispatch);
}

export default actions;
