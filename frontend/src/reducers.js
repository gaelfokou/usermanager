import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({
  users: usersReducer,
  toastr: toastrReducer
});

export default rootReducer;
