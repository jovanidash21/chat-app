import { bindActionCreators } from 'redux';
import {
  fetchUser,
  fetchUsers
} from './user';

const actions = (dispatch) => {
  return bindActionCreators({
    fetchUser,
    fetchUsers
  }, dispatch);
}

export default actions;
