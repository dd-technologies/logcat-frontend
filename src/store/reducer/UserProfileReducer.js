import {
  USER_PASSWORD_CHANGE_REQUEST,
  USER_PASSWORD_CHANGE_SUCESS,
  USER_PASSWORD_CHANGE_FAIL,
} from "../types/UserConstants";

export const passwordChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_CHANGE_REQUEST:
      return {
        loading: true,
      };
    case USER_PASSWORD_CHANGE_SUCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case USER_PASSWORD_CHANGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
