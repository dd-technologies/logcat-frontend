import {
  ALL_USERS_DETAILS_REQUEST,
  ALL_USERS_DETAILS_SUCCESS,
  ALL_USERS_DETAILS_FAIL,
  UPDATE_ALL_USERS_REQUEST,
  UPDATE_ALL_USERS_SUCCESS,
  UPDATE_ALL_USERS_FAIL,
  ALL_DEFAULT_DATA_FOR_DASHBOARD_REQUEST,
  ALL_DEFAULT_DATA_FOR_DASHBOARD_SUCCESS,
  ALL_DEFAULT_DATA_FOR_DASHBOARD_FAIL,
  DEVICE_ACTION_REQUEST,
  DEVICE_ACTION_SUCCESS,
  DEVICE_ACTION_FAIL,
  DEVICE_DELETE_REQUEST,
  DEVICE_DELETE_SUCCESS,
  DEVICE_DELETE_FAIL
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
export const dashboardDataDefault = (state = {}, action) => {
  switch (action.type) {
    case ALL_DEFAULT_DATA_FOR_DASHBOARD_REQUEST:
      return {
        loading: true,
      };
    case ALL_DEFAULT_DATA_FOR_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case ALL_DEFAULT_DATA_FOR_DASHBOARD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const deviceActionReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_ACTION_REQUEST:
      return {
        loading: true,
      };
    case DEVICE_ACTION_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case DEVICE_ACTION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const deviceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVICE_DELETE_REQUEST:
      return {
        loading: true,
      };
    case DEVICE_DELETE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case DEVICE_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};