import { bindActionCreators } from 'redux';
import {
  fetchUser,
  fetchUsers,
  selectUser
} from './user';

const actions = (dispatch) => {
  return bindActionCreators({
    fetchUser,
    fetchUsers,
    selectUser
  }, dispatch);
}

export default actions;
