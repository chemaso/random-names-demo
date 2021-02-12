import {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  UPDATE_USERS_START,
  UPDATE_USERS_SUCCESS,
  UPDATE_USERS_FAILURE
} from "actionTypes/users";

export const initialState = {
  list: [],
  loading: false,
  loaded: false
};

// users reducer can handle get / update actions
const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_START:
      return {
        ...state,
        loading: true
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.list
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        list: []
      };
    case UPDATE_USERS_START:
      // as we are not triggering api calls to update we will just pass the state as it is
      return state;
    case UPDATE_USERS_SUCCESS:
      return {
        ...state,
        list: action.list
      };
    case UPDATE_USERS_FAILURE:
      // as we are not triggering api calls to update we will just pass the state as it is
      return state;
    default:
      return state;
  }
};

export default users;
