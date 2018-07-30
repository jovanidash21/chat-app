import { bindActionCreators } from 'redux';
import {
  fetchUser,
  fetchUsers,
  selectUser,
  deselectUser
} from './user';

const actions = (dispatch) => {
  return bindActionCreators({
    fetchUser,
    fetchUsers,
    selectUser,
    deselectUser
  }, dispatch);
}

export default actions;
