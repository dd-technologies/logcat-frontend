import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_LOGOUT_FAIL,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_REQUEST_SUCCESS,
  FORGET_PASSWORD_REQUEST_FAIL,
  FORGET_PASSWORD_RESET_STATE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST_SUCCESS,
  UPDATE_PROFILE_REQUEST_FAIL,
} from "../types/AdminConstants";

export const adminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        loading: false,
        adminInfo: action.payload,
      };
    case ADMIN_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_LOGOUT_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ADMIN_LOGOUT:
      return state;

    default:
      return state;
  }
};

export const adminRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_REGISTER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };

    case ADMIN_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const forgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case FORGET_PASSWORD_REQUEST_SUCCESS:
      return {
        loading: false,
        forgetPasswordInfo: action.payload,
      };

    case FORGET_PASSWORD_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case FORGET_PASSWORD_RESET_STATE:
      return {};
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case RESET_PASSWORD_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };

    case RESET_PASSWORD_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { loading: true };

    case UPDATE_PROFILE_REQUEST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case UPDATE_PROFILE_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
