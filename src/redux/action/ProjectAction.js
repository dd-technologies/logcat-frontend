import axios from "axios";
import {
  GET_PROJECT_REQUEST,
  GET_PROJECT_REQUEST_SUCCESS,
  GET_PROJECT_REQUEST_FAIL,
  GET_ALL_LOG_BY_CODE_REQUEST,
  GET_ALL_LOG_BY_CODE_SUCCESS,
  GET_ALL_LOG_BY_CODE_FAIL,
  UPLOAD_NEW_PROJECT_REQUEST,
  UPLOAD_NEW_PROJECT_REQUEST_SUCCESS,
  UPLOAD_NEW_PROJECT_REQUEST_FAIL,
  UPLOAD_NEW_PROJECT_REQUEST_RESET,
  ADD_CRASH_EMAIL_REQUEST,
  ADD_CRASH_EMAIL_REQUEST_SUCCESS,
  ADD_CRASH_EMAIL_REQUEST_FAIL,
  GET_PROJECT_BY_CODE_REQUEST,
  GET_PROJECT_BY_CODE_REQUEST_SUCCESS,
  GET_PROJECT_BY_CODE_REQUEST_FAIL,
} from "../types/ProjectConstants";

// ALL PROJECT
export const getAllProject = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROJECT_REQUEST,
    });
    const token = localStorage.getItem("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/projects/`,
      config
    );
    dispatch({
      type: GET_PROJECT_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: GET_PROJECT_REQUEST_FAIL,
      payload:
        error &&
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.data &&
        error?.response?.data?.data?.err &&
        error?.response?.data?.data?.msg,
    });
  }
};

// ADD CRASH EMAIL
export const addCrashEmail = (code, email) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CRASH_EMAIL_REQUEST,
    });
    const token = localStorage.getItem("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/logger/projects/updateEmail/${code}`,
      {
        email,
      },
      config
    );
    dispatch({
      type: ADD_CRASH_EMAIL_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CRASH_EMAIL_REQUEST_FAIL,
      payload:
        error &&
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.data &&
        error?.response?.data?.data?.err &&
        error?.response?.data?.data?.msg,
    });
  }
};

// PROJECT WITH CODE
export const getProjectByCode =
  (
    code,
    date = null,
    filters = null,
    page = null,
    record = 25,
    projectType = null
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_LOG_BY_CODE_REQUEST,
      });
      console.log("filter", filters);
      const token = localStorage.getItem("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      let logString = "";
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value) {
            logString += `${key}-`;
            console.log("logstring", logString);
          }
        }
      }
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/${code}?startDate=${date.start}&endDate=${date.end}&limit=${record}&page=${page}&logType=${logString}&projectType=${projectType}`,
        config
      );

      dispatch({
        type: GET_ALL_LOG_BY_CODE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_LOG_BY_CODE_FAIL,
        payload:
          error &&
          error?.response &&
          error?.response?.data &&
          error?.response?.data?.data &&
          error?.response?.data?.data?.err &&
          error?.response?.data?.data?.msg,
      });
    }
  };

// UPLOAD PROJECT
export const uploadNewProject = (name, modelList, desc) => async (dispatch) => {
  try {
    dispatch({
      type: UPLOAD_NEW_PROJECT_REQUEST,
    });
    const token = localStorage.getItem("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/logger/projects/`,
      {
        name: name,
        description: desc,
        device_type: modelList,
      },
      config
    );
    dispatch({
      type: UPLOAD_NEW_PROJECT_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_NEW_PROJECT_REQUEST_FAIL,
      payload:
        error &&
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.data &&
        error?.response?.data?.data?.err &&
        error?.response?.data?.data?.msg,
    });
  }
};

// CLEAR PROJECT DATA FROM STATE
export const clearProjectData = () => (dispatch) => {
  dispatch({
    type: UPLOAD_NEW_PROJECT_REQUEST_RESET,
    payload: {},
  });
};

// GET PROJECT WITH CODE FOR SETTING
export const getProjectByCodeSetting = (code) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROJECT_BY_CODE_REQUEST,
    });
    const token = localStorage.getItem("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/projects/${code}`,
      config
    );
    dispatch({
      type: GET_PROJECT_BY_CODE_REQUEST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECT_BY_CODE_REQUEST_FAIL,
      payload:
        error &&
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.data &&
        error?.response?.data?.data?.err &&
        error?.response?.data?.data?.msg,
    });
  }
};
