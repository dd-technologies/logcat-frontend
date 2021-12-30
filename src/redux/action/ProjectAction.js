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

} from "../types/ProjectConstants";

export const getAllProject = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROJECT_REQUEST });
    const token = localStorage.getItem("ddAdminToken");
    // console.log(token);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // console.log(config);

    // const {data} = await axios.get('https://agvalogger.herokuapp.com/api/logger/projects/',
    // config
    // )

    const { data } = await axios.get(
      `https://logger-server.herokuapp.com/api/logger/projects/`,
      config
    );
    // console.log(data);
    dispatch({
      type: GET_PROJECT_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error.response);
    dispatch({
      type: GET_PROJECT_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProjectByCode =
  (code, date = null, filters = null, page = null, record = 25) =>
    async (dispatch) => {
      try {
        console.log(`pageno from action project code ${code}`);
        dispatch({ type: GET_ALL_LOG_BY_CODE_REQUEST });
        const token = localStorage.getItem("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // console.log(filters);

        // const {data} = await axios.get('https://agvalogger.herokuapp.com/api/logger/projects/',
        // config
        // )

        // /api/logger/projects/getDetail/MF7OW?startDate=2021-09-20&endDate=2021-10-04
        let response;
        if (date != null && date.start && date.end) {
          response = await axios.get(
            `https://logger-server.herokuapp.com/api/logger/projects/getDetail/${code}?startDate=${date.start}&endDate=${date.end}&limit=${record}`,
            config
          );
        } else if (date != null && date.start) {
          response = await axios.get(
            `https://logger-server.herokuapp.com/api/logger/projects/getDetail/${code}?startDate=${date.start}&limit=${record}`,
            config
          );
        } else if (date != null && date.end) {
          response = await axios.get(
            `https://logger-server.herokuapp.com/api/logger/projects/getDetail/${code}?endDate=${date.end}&limit=${record}`,
            config
          );
        } else if (filters != null) {
          let logString = "";
          for (const [key, value] of Object.entries(filters)) {
            if (value) {
              logString += `${key}-`;
            }
          }
          // console.log(logString);

          response = await axios.get(
            `https://logger-server.herokuapp.com/api/logger/projects/getDetail/${code}?logType=${logString}&page=${page}&limit=${record}`,
            config
          );
          // console.log(response);
        } else {
          // console.log(`pageno from action project ${page}`);
          response = await axios.get(
            `https://logger-server.herokuapp.com/api/logger/projects/getDetail/${code}?page=${page}&limit=${record}`,
            config
          );
        }
        console.log(response.data);
        dispatch({
          type: GET_ALL_LOG_BY_CODE_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        // console.log(error.response);
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
    dispatch({ type: UPLOAD_NEW_PROJECT_REQUEST });

    const token = localStorage.getItem("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // console.log(config);

    // const {data} = await axios.get('https://agvalogger.herokuapp.com/api/logger/projects/',
    // config
    // )

    const { data } = await axios.post(
      `https://logger-server.herokuapp.com/api/logger/projects/`,
      {
        name: name,
        description: desc,
        device_type: modelList,
      },
      config
    );
    // console.log(data);
    dispatch({
      type: UPLOAD_NEW_PROJECT_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error.response);
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
  ({ code, diffDate }) =>
    async (dispatch) => {
      // code
      try {
        dispatch({ type: GET_LOG_COUNT_REQUEST });

        const token = localStorage.getItem("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // console.log(config);
        var dt = new Date();
        const end = dt.toISOString().slice(0, 10);
        dt.setDate(dt.getDate() - diffDate);
        const start = dt.toISOString().slice(0, 10);

        const { data } = await axios.get(
          `https://logger-server.herokuapp.com/api/logger/projects/getLogsCount/${code}?startDate=${start}&endDate=${end}`,
          config
        );
        console.log(data);
        dispatch({
          type: GET_LOG_COUNT_SUCCESS,
          payload: data,
        });
      } catch (error) {
        // console.log(error.response);
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
  // code, date = null

  ({ code, diffDate }) =>
    async (dispatch) => {
      try {
        dispatch({ type: GET_LOG_COUNT_BY_DATE_REQUEST });
        const token = localStorage.getItem("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // console.log("hello from action by date");
        // console.log(date);

        // const {data} = await axios.get('https://agvalogger.herokuapp.com/api/logger/projects/',
        // config
        // )

        // /api/logger/projects/getDetail/MF7OW?startDate=2021-09-20&endDate=2021-10-04
        let response;
        // if (date != null && date.start && date.end) {
        //   response = await axios.get(
        //     `https://logger-server.herokuapp.com/api/logger/projects/datewiselogcount/${code}?startDate=${date.start}&endDate=${date.end}`,
        //     config
        //   );
        // } else if (date != null && date.start) {
        //   response = await axios.get(
        //     `https://logger-server.herokuapp.com/api/logger/projects/datewiselogcount/${code}?startDate=${date.start}`,
        //     config
        //   );
        // } else if (date != null && date.end) {
        //   response = await axios.get(
        //     `https://logger-server.herokuapp.com/api/logger/projects/datewiselogcount/${code}?endDate=${date.end}`,
        //     config
        //   );
        // } else {
        var dt = new Date();
        const end = dt.toISOString().slice(0, 10);
        dt.setDate(dt.getDate() - diffDate);
        const start = dt.toISOString().slice(0, 10);
        response = await axios.get(
          `https://logger-server.herokuapp.com/api/logger/projects/datewiselogcount/${code}?startDate=${start}&endDate=${end}`,
          config
        );
        console.log(`start ${start} and ${end}`);
        // }

        // console.log(response);
        dispatch({
          type: GET_LOG_COUNT_BY_DATE_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        console.log(error);
      }
    };

export const getErrorWRTOS = (code) => async (dispatch) => {
  try {
    dispatch({ type: GET_ERROR_WRT_OS_REQUEST });
    const token = localStorage.getItem("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // console.log("hello from action from OS arch");

    const { data } = await axios.get(
      `https://logger-server.herokuapp.com/api/logger/projects/getErrorCountByOSArchitecture/${code}`,
      config
    );
    // console.log(data);
    dispatch({
      type: GET_ERROR_WRT_OS_REQUEST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    // console.log(error.response);
    dispatch({
      type: GET_ERROR_WRT_OS_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getErrorWRTVersion = (code) => async (dispatch) => {
  try {
    dispatch({ type: GET_ERROR_COUNT_BY_VERSION_REQUEST });
    const token = localStorage.getItem("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // console.log("hello from action from OS arch");

    const { data } = await axios.get(
      `https://logger-server.herokuapp.com/api/logger/projects/getErrorCountByVersion/${code}`,
      config
    );
    // console.log(data);
    dispatch({
      type: GET_ERROR_COUNT_BY_VERSION_REQUEST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    // console.log(error.response);
    dispatch({
      type: GET_ERROR_COUNT_BY_VERSION_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProjectDetails = (code) => async (dispatch) => {
  try {
    dispatch({ type: GET_DEVICE_INFO_REQUEST });
    const token = localStorage.getItem("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // console.log("hello from action from get project details");

    const { data } = await axios.get(
      `https://logger-server.herokuapp.com/api/logger/projects/getDeviceCount/${code}`,
      config
    );
    // console.log(data);
    dispatch({
      type: GET_DEVICE_INFO_REQUEST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    // console.log(error.response);
    dispatch({
      type: GET_DEVICE_INFO_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getLogMsgOccurenceWRTDate =
  ({ code, startDate, endDate, logMsg }) =>
    async (dispatch) => {
      console.log("request comming to log")
      try {
        console.log(logMsg)
        console.log(code)
        console.log(startDate)
        console.log(endDate)
        dispatch({ type: GET_LOG_MSG_OCCURENCE_COUNT_WRT_DATE_REQUEST });
        const token = localStorage.getItem("ddAdminToken");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // console.log("hello from action from get project details");

        // console.log(`https://logger-server.herokuapp.com/api/logger/projects/log-occurrences-datewise/${code}?startDate=${startDate}&endDate=${endDate}&logMsg=${logMsg}`)
        if (startDate == null && endDate == null) {
          var dt = new Date();
          const endDate = dt.toISOString().slice(0, 10);
          dt.setDate(dt.getDate() - 10);
          const startDate = dt.toISOString().slice(0, 10);
          // console.log("date", startDate, endDate, logMsg, code)
          const { data } = await axios.get(
            // `https://logger-server.herokuapp.com/api/logger/projects/log-occurrences-datewise/${code}?startDate=${startDate}&endDate=${endDate}&logMsg=${logMsg}`
            `https://logger-server.herokuapp.com/api/logger/projects/log-occurrences-datewise/${code}?startDate=${startDate}&endDate=${endDate}&logMsg=${logMsg}`,
            // MF7OW?startDate=2021-08-01&endDate=2021-12-31&logMsg=Debugging!&did=10:EC:81:1C:12:30
            config
          );
          dispatch({
            type: GET_LOG_MSG_OCCURENCE_COUNT_WRT_DATE_REQUEST_SUCCESS,
            payload: data.data,
          });
        } else {
          const { data } = await axios.get(
            // `https://logger-server.herokuapp.com/api/logger/projects/log-occurrences-datewise/${code}?startDate=${startDate}&endDate=${endDate}&logMsg=${logMsg}`
            `https://logger-server.herokuapp.com/api/logger/projects/log-occurrences-datewise/${code}?startDate=${startDate}&endDate=${endDate}&logMsg=${logMsg}`,
            // MF7OW?startDate=2021-08-01&endDate=2021-12-31&logMsg=Debugging!&did=10:EC:81:1C:12:30
            config
          );
          dispatch({
            type: GET_LOG_MSG_OCCURENCE_COUNT_WRT_DATE_REQUEST_SUCCESS,
            payload: data.data,
          });
        }
      } catch (error) {
        // console.log(error.response);
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
  ({ code, diffDate }) =>
    async (dispatch) => {
      try {
        console.log(code);
        console.log("difference date" + diffDate);

        var dt = new Date();
        const endDate = dt.toISOString().slice(0, 10);
        dt.setDate(dt.getDate() - diffDate);
        const startDate = dt.toISOString().slice(0, 10);
        console.log(`${startDate} and ${endDate}`);

        dispatch({ type: GET_CRASH_FREE_USERS_REQUEST });
        const token = localStorage.getItem("ddAdminToken");
        console.log(token);
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(
          `https://logger-server.herokuapp.com/api/logger/projects/crashfree-users-datewise/${code}?startDate=${startDate}&endDate=${endDate}`,
          config
        );
        console.log(data);
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
    ( code,logMsg ) =>
      async (dispatch) => {
        try {
          console.log(code);
          var dt = new Date();
          const endDate = dt.toISOString().slice(0, 10);
          dt.setDate(dt.getDate() -90);
          const startDate = dt.toISOString().slice(0, 10);
          console.log(`${startDate} and ${endDate}`);
  
          dispatch({ type: GET_CRASH_ANALYTICS_DATA_REQUEST });
          const token = localStorage.getItem("ddAdminToken");
          console.log(token);
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
  
          const { data } = await axios.get(
            `https://logger-server.herokuapp.com/api/logger/projects/get-crashlytics-data/${code}?&startDate=${startDate}&endDate=${endDate}&logMsg=${logMsg}`,
            config
          );
          console.log(data);
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
      ( code,logMsg ) =>
        async (dispatch) => {
          try {
            console.log(code);
            var dt = new Date();
            const endDate = dt.toISOString().slice(0, 10);
            dt.setDate(dt.getDate() -90);
            const startDate = dt.toISOString().slice(0, 10);
            console.log(`${startDate} and ${endDate}`);
    
            dispatch({ type: GET_CRASH_FREE_USERS_DATA_REQUEST });
            const token = localStorage.getItem("ddAdminToken");
            console.log(token);
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            };
    
            const { data } = await axios.get(
              `https://logger-server.herokuapp.com/api/logger/projects/logMsgOccurence/${code}?msg=${logMsg}`,
              config
            );
            console.log(data);
            dispatch({
              type: GET_CRASH_FREE_USERS_DATA_REQUEST_SUCCESS,
              payload: data.data,
            });
    
            // }
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
