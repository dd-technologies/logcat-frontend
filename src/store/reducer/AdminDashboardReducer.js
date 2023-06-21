import {
    ALL_USERS_DETAILS_REQUEST,
    ALL_USERS_DETAILS_SUCCESS,
    ALL_USERS_DETAILS_FAIL,
    UPDATE_ALL_USERS_REQUEST,
    UPDATE_ALL_USERS_SUCCESS,
    UPDATE_ALL_USERS_FAIL
  } from "../types/AdminDashboard";

export const allUsersDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case ALL_USERS_DETAILS_REQUEST:
        return { loading: true };
  
      case ALL_USERS_DETAILS_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
      case ALL_USERS_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export const updateAllUsersDetailReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_ALL_USERS_REQUEST:
        return {
          loading: true,
        };
      case UPDATE_ALL_USERS_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
      case UPDATE_ALL_USERS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };