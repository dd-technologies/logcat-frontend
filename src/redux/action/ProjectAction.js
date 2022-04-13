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
  GET_LOG_COUNT_REQUEST,
  GET_LOG_COUNT_SUCCESS,
  GET_LOG_COUNT_FAIL,
  GET_LOG_COUNT_BY_DATE_REQUEST,
  GET_LOG_COUNT_BY_DATE_SUCCESS,
  GET_LOG_COUNT_BY_DATE_FAIL,
  GET_ERROR_WRT_OS_REQUEST,
  GET_ERROR_WRT_OS_REQUEST_SUCCESS,
  GET_ERROR_WRT_OS_REQUEST_FAIL,
  GET_ERROR_COUNT_BY_VERSION_REQUEST,
  GET_ERROR_COUNT_BY_VERSION_REQUEST_SUCCESS,
  GET_ERROR_COUNT_BY_VERSION_REQUEST_FAIL,
  GET_DEVICE_INFO_REQUEST,
  GET_DEVICE_INFO_REQUEST_SUCCESS,
  GET_DEVICE_INFO_REQUEST_FAIL,
  GET_LOG_MSG_OCCURENCE_COUNT_WRT_DATE_REQUEST,
  GET_LOG_MSG_OCCURENCE_COUNT_WRT_DATE_REQUEST_SUCCESS,
  GET_LOG_MSG_OCCURENCE_COUNT_WRT_DATE_REQUEST_FAIL,
  UPLOAD_NEW_PROJECT_REQUEST_RESET,
  GET_CRASH_FREE_USERS_REQUEST,
  GET_CRASH_FREE_USERS_REQUEST_SUCCESS,
  GET_CRASH_FREE_USERS_REQUEST_FAIL,
  GET_CRASH_ANALYTICS_DATA_REQUEST,
  GET_CRASH_ANALYTICS_DATA_REQUEST_SUCCESS,
  GET_CRASH_ANALYTICS_DATA_REQUEST_FAIL,
  GET_CRASH_FREE_USERS_DATA_REQUEST,
  GET_CRASH_FREE_USERS_DATA_REQUEST_SUCCESS,
  GET_CRASH_FREE_USERS_DATA_REQUEST_FAIL,
  GET_MODEL_CODE_REQUEST,
  GET_MODEL_CODE_SUCCESS,
  GET_MODEL_CODE_FAIL,
  ADD_CRASH_EMAIL_REQUEST,
  ADD_CRASH_EMAIL_REQUEST_SUCCESS,
  ADD_CRASH_EMAIL_REQUEST_FAIL,
  GET_PROJECT_BY_CODE_REQUEST,
  GET_PROJECT_BY_CODE_REQUEST_SUCCESS,
  GET_PROJECT_BY_CODE_REQUEST_FAIL,
  GET_PROJECT_CRASH_EMAIL_REQUEST,
  GET_PROJECT_CRASH_EMAIL_REQUEST_SUCCESS,
  GET_PROJECT_CRASH_EMAIL_REQUEST_FAIL,
} from "../types/ProjectConstants";

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
    dispatch({
      type: GET_PROJECT_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addCrashEmail = (code, email) => async (dispatch) => {
  try {
    // console.log(`add emails: ${email} ${code}`)
    dispatch({
      type: ADD_CRASH_EMAIL_REQUEST,
    });
    const token = localStorage.getItem("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/logger/updateEmail/${code}`,
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
    // console.log(`error: ${error}`)
    dispatch({
      type: ADD_CRASH_EMAIL_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

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
          }
        }
      }
      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/projects/getDetail/${code}?startDate=${date.start}&endDate=${date.end}&limit=${record}&page=${page}&logType=${logString}&projectType=${projectType}`,
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
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

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
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearProjectData = () => (dispatch) => {
  dispatch({
    type: UPLOAD_NEW_PROJECT_REQUEST_RESET,
    payload: {},
  });
};

export const getLogTypeCounts =
  ({ code, diffDate, code1 }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_LOG_COUNT_REQUEST,
      });

      const token = localStorage.getItem("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      var dt = new Date();
      const end = dt.toISOString().slice(0, 10);
      dt.setDate(dt.getDate() - diffDate);
      const start = dt.toISOString().slice(0, 10);

      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/projects/getLogsCount/${code}?startDate=${start}&endDate=${end}&projectType=${code1}`,
        config
      );
      dispatch({
        type: GET_LOG_COUNT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LOG_COUNT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getLogByDate =
  ({ code, diffDate, code1 }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_LOG_COUNT_BY_DATE_REQUEST,
      });
      const token = localStorage.getItem("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response;
      var dt = new Date();
      const end = dt.toISOString().slice(0, 10);
      dt.setDate(dt.getDate() - diffDate);
      const start = dt.toISOString().slice(0, 10);

      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/projects/datewiselogcount/${code}?startDate=${start}&endDate=${end}&projectType=${code1}`,
        config
      );

      dispatch({
        type: GET_LOG_COUNT_BY_DATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {}
  };

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
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getErrorWRTOS = (code, projectType) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ERROR_WRT_OS_REQUEST,
    });
    const token = localStorage.getItem("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/projects/getErrorCountByOSArchitecture/${code}?projectType=${projectType}`,
      config
    );
    dispatch({
      type: GET_ERROR_WRT_OS_REQUEST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR_WRT_OS_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getErrorWRTVersion = (code, projectType) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ERROR_COUNT_BY_VERSION_REQUEST,
    });
    const token = localStorage.getItem("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/projects/getErrorCountByVersion/${code}?projectType=${projectType}`,
      config
    );
    dispatch({
      type: GET_ERROR_COUNT_BY_VERSION_REQUEST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR_COUNT_BY_VERSION_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getLogMsgOccurenceWRTDate =
  ({ code, startDate, endDate, logMsg, code1 }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_LOG_MSG_OCCURENCE_COUNT_WRT_DATE_REQUEST,
      });
      const token = localStorage.getItem("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (startDate == null && endDate == null) {
        var dt = new Date();
        const endDate = dt.toISOString().slice(0, 10);
        dt.setDate(dt.getDate() - 10);
        const startDate = dt.toISOString().slice(0, 10);
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/projects/log-occurrences-datewise/${code}?startDate=${startDate}&endDate=${endDate}&logMsg=${logMsg}&projectType=${code1}`,

          config
        );
        dispatch({
          type: GET_LOG_MSG_OCCURENCE_COUNT_WRT_DATE_REQUEST_SUCCESS,
          payload: data.data,
        });
      } else {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/logger/projects/log-occurrences-datewise/${code}?startDate=${startDate}&endDate=${endDate}&logMsg=${logMsg}&projectType=${code1}`,
          config
        );
        dispatch({
          type: GET_LOG_MSG_OCCURENCE_COUNT_WRT_DATE_REQUEST_SUCCESS,
          payload: data.data,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_LOG_MSG_OCCURENCE_COUNT_WRT_DATE_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCrashFreeUsers =
  ({ code, diffDate, code1 }) =>
  async (dispatch) => {
    try {
      var dt = new Date();
      const endDate = dt.toISOString().slice(0, 10);
      dt.setDate(dt.getDate() - diffDate);
      const startDate = dt.toISOString().slice(0, 10);

      dispatch({
        type: GET_CRASH_FREE_USERS_REQUEST,
      });
      const token = localStorage.getItem("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/projects/crashfree-users-datewise/${code}?startDate=${startDate}&endDate=${endDate}&projectType=${code1}`,
        config
      );
      dispatch({
        type: GET_CRASH_FREE_USERS_REQUEST_SUCCESS,
        payload: data.data,
      });

      // }
    } catch (error) {
      dispatch({
        type: GET_CRASH_FREE_USERS_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCrashAnalyticsData =
  (code, logMsg, projectType) => async (dispatch) => {
    try {
      var dt = new Date();
      const endDate = dt.toISOString().slice(0, 10);
      dt.setDate(dt.getDate() - 90);
      const startDate = dt.toISOString().slice(0, 10);

      dispatch({
        type: GET_CRASH_ANALYTICS_DATA_REQUEST,
      });
      const token = localStorage.getItem("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/projects/get-crashlytics-data/${code}?&startDate=${startDate}&endDate=${endDate}&logMsg=${logMsg}&projectType=${projectType}`,
        config
      );
      dispatch({
        type: GET_CRASH_ANALYTICS_DATA_REQUEST_SUCCESS,
        payload: data.data,
      });

      // }
    } catch (error) {
      dispatch({
        type: GET_CRASH_ANALYTICS_DATA_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCrashFreeUsersData =
  (code, logMsg, projectType) => async (dispatch) => {
    try {
      var dt = new Date();
      const endDate = dt.toISOString().slice(0, 10);
      dt.setDate(dt.getDate() - 90);
      const startDate = dt.toISOString().slice(0, 10);

      dispatch({
        type: GET_CRASH_FREE_USERS_DATA_REQUEST,
      });
      const token = localStorage.getItem("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/projects/logMsgOccurence/${code}?msg=${logMsg}&projectType=${projectType}`,
        config
      );
      dispatch({
        type: GET_CRASH_FREE_USERS_DATA_REQUEST_SUCCESS,
        payload: data.data,
      });

    } catch (error) {
      dispatch({
        type: GET_CRASH_FREE_USERS_DATA_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getDeviceModelCode = (code) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MODEL_CODE_REQUEST,
    });
    const token = localStorage.getItem("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/projects/getDeviceCount/${code}`,
      config
    );
    dispatch({
      type: GET_MODEL_CODE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MODEL_CODE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
