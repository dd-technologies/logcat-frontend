import axios from "axios";
import Cookies from "universal-cookie";

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
  DEVICE_DELETE_SUCCESS,
  DEVICE_DELETE_FAIL,
  DEVICE_DELETE_REQUEST,
  DEVICE_DELETE_DATA_ACTION_REQUEST,
  DEVICE_DELETE_DATA_ACTION_SUCCESS,
  DEVICE_DELETE_DATA_ACTION_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_REQUEST_FAIL,
  USER_DELETE_REQUEST_SUCCESS
} from "../types/AdminDashboard";
const cookies = new Cookies();

export const getAllUsersDetalisById = ({page,limit}) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_USERS_DETAILS_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/users-list?page=${page}&limit=${limit}`,
      config
    );
    dispatch({
      type: ALL_USERS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_DETAILS_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};

export const updateAllUsersDetailsById =
  ({userType, _id}) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_ALL_USERS_REQUEST,
      });

      const token = cookies.get("ddAdminToken");

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("userType", userType);
      console.log("_id", _id);

      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/logger/change-userType/${_id}`,
        { userType },
        config
      );
      dispatch({
        type: UPDATE_ALL_USERS_SUCCESS,
        payload: data,
      });
      if (data.statusCode == 200) {
        window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: UPDATE_ALL_USERS_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };
export const getDefaultDataForDashboard = (durationData) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_DEFAULT_DATA_FOR_DASHBOARD_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    console.log("durationData000",durationData)
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/getTotalDevicesCount/${durationData}`,
      config
    );
    dispatch({
      type: ALL_DEFAULT_DATA_FOR_DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_DEFAULT_DATA_FOR_DASHBOARD_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};

export const deviceAssignAction =
  ({ _id, DeviceId }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: DEVICE_ACTION_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/assignedDeviceToUser`,
        {
          _id,
          DeviceId,
        },
        config
      );
      dispatch({
        type: DEVICE_ACTION_SUCCESS,
        payload: data,
      });
      // if(data.statusCode==200){
      //   toast.success("Update Success")
      // }
    } catch (error) {
      dispatch({
        type: DEVICE_ACTION_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };

export const deviceDeleteAction = () => async (dispatch) => {
  try {
    dispatch({
      type: DEVICE_DELETE_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const _id = localStorage.getItem("userId");
    console.log("userId", _id);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/getAssignedDeviceByUserId/${_id}`,
      config
    );
    dispatch({
      type: DEVICE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEVICE_DELETE_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }
};

export const deviceDataDeleteAction =
  ({ userId, DeviceId }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: DEVICE_DELETE_DATA_ACTION_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      console.log("token",token)
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deleteAssignedDeviceById`,
        {
          userId,
          DeviceId,
        },
        config
      );
      dispatch({
        type: DEVICE_DELETE_DATA_ACTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DEVICE_DELETE_DATA_ACTION_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };

  export const userDeleteAction =
  ({userId}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST,
      });
      const token = cookies.get("ddAdminToken");
      console.log("userId",userId)
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/logger/users/delete-byid/${userId}`,
        config
      );
      dispatch({
        type: USER_DELETE_REQUEST_SUCCESS,
        payload: data,
      });
      if(data.statusCode==200){
        setTimeout(()=>{
          window.location.reload()
        },500)
      }
    } catch (error) {
      dispatch({
        type: USER_DELETE_REQUEST_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.err.msg,
      });
    }
  };