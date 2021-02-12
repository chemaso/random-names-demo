import {
  GET_USERS_SUCCESS,
  GET_USERS_START,
  GET_USERS_FAILURE,
  UPDATE_USERS_START,
  UPDATE_USERS_SUCCESS,
  UPDATE_USERS_FAILURE
} from "actionTypes/users";

import { getUsers as fetchUsers } from "api/users";

/*
We can track the action failure or success
in this case we have 3 action types for get users and 3  for update it
*/

const getUsersStart = () => {
  return {
    type: GET_USERS_START
  };
};

const getUsersSuccess = (data) => {
  return {
    type: GET_USERS_SUCCESS,
    list: data
  };
};

const getUsersFailure = () => {
  return {
    type: GET_USERS_FAILURE,
    list: []
  };
};

export const getUsers = (params) => {
  return async (dispatch) => {
    try {
      dispatch(getUsersStart());
      const { data } = await fetchUsers(params);
      dispatch(getUsersSuccess(data.results));
    } catch (e) {
      // TODO: create an error notification system
      dispatch(getUsersFailure());
      console.log(e);
    }
  };
};

const updateUserStart = () => {
  return {
    type: UPDATE_USERS_START
  };
};

const updateUsersSuccess = (data) => {
  return {
    type: UPDATE_USERS_SUCCESS,
    list: data
  };
};

const updateUsersFailure = () => {
  return {
    type: UPDATE_USERS_FAILURE
  };
};

export const updateUsers = (values) => {
  return async (dispatch) => {
    try {
      dispatch(updateUserStart(values));
      dispatch(updateUsersSuccess(values));
    } catch (e) {
      dispatch(updateUsersFailure());
    }
  };
};
