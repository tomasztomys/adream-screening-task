import { combineReducers } from 'redux';

import UsersReducer from './modules/Users/reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

const reducers = combineReducers({
  users: UsersReducer,

  toastr: toastrReducer
});

export default reducers;
