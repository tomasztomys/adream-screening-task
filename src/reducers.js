import { combineReducers } from 'redux'

import UsersReducer from './modules/Users/reducer';

const reducers = combineReducers({
  users: UsersReducer
});

export default reducers;