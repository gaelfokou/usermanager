import * as constants from "./constants";
import { defineState } from 'redux-localstore';

const defaultState = {
  users: [],
  count: 0,
  next: null,
  previous: null,
  loading: false,
  hasErrors: false,
  user: {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    userprofile: {
      hometown: "",
      age: "",
      gender: "",
    },
  },
};

const initialState = defineState(defaultState)('users');

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case constants.FILL_USER:
      let user = {};

      if (action.payload.target.id == 'hometown' || action.payload.target.id == 'age' || action.payload.target.id == 'gender') {
        user = {
          ...state.user,
          userprofile: {
            ...state.user.userprofile,
            [action.payload.target.id]: action.payload.target.value,
          },
        };
      } else {
        user = {
          ...state.user,
          [action.payload.target.id]: action.payload.target.value,
        };
      }

      return {
        ...state,
        user: user,
      };
    case constants.START_USER:
      return {
        ...state,
        loading: true,
        hasErrors: false,
      };
    case constants.SUCCESS_USER:
      return {
        ...state,
        loading: false,
        hasErrors: false,
      };
    case constants.FAILURE_USER:
      return {
        ...state,
        loading: false,
        hasErrors: true,
      };
    case constants.LIST_USERS:
      return {
        ...state,
        users: [...action.payload.results],
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
      };
    case constants.RESET_USER:
      return {
        ...state,
        user: {
          username: "",
          email: "",
          password: "",
          confirm_password: "",
          first_name: "",
          last_name: "",
          userprofile: {
            hometown: "",
            age: "",
            gender: "",
          },
        },
        loading: false,
        hasErrors: false,
      };
    default:
      return state;
  }
}

export default usersReducer;
