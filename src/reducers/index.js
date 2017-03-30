import { combineReducers } from 'redux';
import namesReducer from './names';
import activeNameReducer from './activeName';

const reducers = combineReducers({
    names: namesReducer,
    activeName: activeNameReducer
});

export default reducers;