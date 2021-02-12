import users from "reducers/users";
import { combineReducers } from "redux";

// collects the reducers and combine them to pass the object to create store
export default combineReducers({
  users
});
