import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

const reducers = combineReducers({
    loadingBar: loadingBarReducer,
});

export default reducers;