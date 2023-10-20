import axios from "axios";
import Cookies from 'universal-cookie';
import {
  DEVICE_FAIL,
  DEVICE_REQUEST,
  DEVICE_SUCCESS,
  REGISTER_NEW_DEVICE_REQUEST,
  REGISTER_NEW_DEVICE_SUCCESS,
  REGISTER_NEW_DEVICE_FAIL,
  GET_DEVICE_EVENTS_BY_ID_FAIL,
  GET_DEVICE_EVENTS_BY_ID_SUCCESS,
  GET_DEVICE_EVENTS_BY_ID_REQUEST,
  UPDATE_DEVICE_DETAILS_BY_ID_FAIL,
  UPDATE_DEVICE_DETAILS_BY_ID_SUCCESS,
  UPDATE_DEVICE_DETAILS_BY_ID_REQUEST,
  GET_REGISTERED_DEVICE_DETAILS_REQUEST,
  GET_REGISTERED_DEVICE_DETAILS_SUCCESS,
  GET_REGISTERED_DEVICE_DETAILS_FAIL,
  GET_DEVICE_ALARMS_BY_ID_FAIL,
  GET_DEVICE_ALARMS_BY_ID_REQUEST,
  GET_DEVICE_ALARMS_BY_ID_SUCCESS,
  GET_DEVICE_LOGS_BY_ID_FAIL,
  GET_DEVICE_LOGS_BY_ID_REQUEST,
  GET_DEVICE_LOGS_BY_ID_SUCCESS,
  GET_DEVICE_TRENDS_BY_ID_REQUEST,
  GET_DEVICE_TRENDS_BY_ID_SUCCESS,
  GET_DEVICE_TRENDS_BY_ID_FAIL,
  GET_LOG_MSG_OCCURENCE_FAIL,
  GET_LOG_MSG_OCCURENCE_REQUEST,
  GET_LOG_MSG_OCCURENCE_SUCCESS,
  GET_DEVICE_CRASH_ANALYTICS_DATA_FAIL,
  GET_DEVICE_CRASH_ANALYTICS_DATA_REQUEST,
  GET_DEVICE_CRASH_ANALYTICS_DATA_SUCCESS,
  GET_DEVICE_CALIBRATION_BY_ID_REQUEST,
  GET_DEVICE_CALIBRATION_BY_ID_SUCCESS,
  GET_DEVICE_CALIBRATION_BY_ID_FAIL,
  GET_ABOUT_SECTION_BY_ID_REQUEST,
  GET_ABOUT_SECTION_BY_ID_FAIL,
  GET_ABOUT_SECTION_BY_ID_SUCCESS,
  GET_SERVICE_RECORDS_DETAILS,
  GET_SERVICE_RECORDS_DETAILS_SUCCESS,
  GET_SERVICE_RECORDS_DETAILS_FAIL,
  GET_SINGLE_DEVICEID_REQUEST,
  GET_SINGLE_DEVICEID_SUCCESS,
  GET_SINGLE_DEVICEID_FAIL,
  GET_SINGLE_DEVICEIDBY_USERID_REQUEST,
  GET_SINGLE_DEVICEIDBY_USERID_FAIL,
  GET_SINGLE_DEVICEIDBY_USERID_SUCCESS,
  GET_SINGLE_UPLOAD_FILE_REQUEST,
  GET_SINGLE_UPLOAD_FILE_SUCCESS,
  GET_SINGLE_UPLOAD_FILE_FAIL
} from "../types/DeviceConstant";
const cookies = new Cookies();

export const deviceAction = ({ page, limit, searchData }) => async (dispatch) => {
  try {
    dispatch({
      type: DEVICE_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response;
    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/AllEvents/Events?search=${searchData}&page=${page}&limit=${limit}`,
      config
    );
    dispatch({
      type: DEVICE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: DEVICE_FAIL,
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
//Register API Used in EditDetailsModal
export const registerNewDevice = ({ DeviceId, Alias, HospitalName, DoctorName, Wardno, IMEINumber, VentiOperator }) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_NEW_DEVICE_REQUEST,
    });
    console.log("DeviceID", DeviceId)
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/devices/register/`,
      {
        DeviceId,
        Department_Name: Alias,
        Hospital_Name: HospitalName,
        Doctor_Name: DoctorName,
        Ward_No: Wardno,
        IMEI_NO: IMEINumber,
        Bio_Med: VentiOperator,

      },
      config
    );
    dispatch({
      type: REGISTER_NEW_DEVICE_SUCCESS,
      payload: data,
    });
    // setTimeout(() => {
    //   window.location.reload()
    // }, 1000);
    //  window.location.reload()
  } catch (error) {
    dispatch({
      type: REGISTER_NEW_DEVICE_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    });
  }
}

export const getRegisteredDetailsById = (DeviceID, DoctorName, HospitalName, Alias, IMEINumber, VentiOperator, Wardno) => async (dispatch) => {
  try {
    dispatch({
      type: GET_REGISTERED_DEVICE_DETAILS_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/devices/`,
      {
        DeviceId: DeviceID,
        Doctor_Name: DoctorName,
        hospitalName: HospitalName,
        departmentName: Alias,
        IMEI_NO: IMEINumber,
        Bio_Med: VentiOperator,
        Ward_No: Wardno,
      },
      config
    );

    dispatch({
      type: GET_REGISTERED_DEVICE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_REGISTERED_DEVICE_DETAILS_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    });
  }
}

// If yopu saw an error regarding deviceId,  _ref kind of so just do {deviceId} to deviceId
export const getSingleDeviceIdDetails = ( DeviceId ) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_DEVICEID_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    console.log("9090", DeviceId)
    const config = {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/devices/getdevice/${DeviceId}`,
      config
    );
    dispatch({
      type: GET_SINGLE_DEVICEID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_DEVICEID_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    })
  }
};
export const getSingleDeviceIdByUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_DEVICEIDBY_USERID_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    console.log("userId111", userId)
    const config = {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/getAssignedDeviceByUserId/${userId}`,
      config
    );
    dispatch({
      type: GET_SINGLE_DEVICEIDBY_USERID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_DEVICEIDBY_USERID_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.msg,
    })
  }
};
export const updateDetailsById = (
  { DeviceId,
    departmentName,
    hospitalName,
    Doctor_Name,
    Ward_No,
    IMEI_NO,
    Bio_Med, }
) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_DEVICE_DETAILS_BY_ID_REQUEST
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        method: 'PUT',
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("9090", DeviceId)
      let { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/devices/update/${DeviceId}`,
        {
          Department_Name: departmentName,
          Hospital_Name: hospitalName,
          Doctor_Name,
          Ward_No,
          IMEI_NO,
          Bio_Med,
        },
        config
      );
      dispatch({
        type: UPDATE_DEVICE_DETAILS_BY_ID_SUCCESS,
        payload: data,
      });
      // console.log('data123',data)
    } catch (error) {
      dispatch({
        type: UPDATE_DEVICE_DETAILS_BY_ID_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.msg,
      })
      // console.log(DeviceId)
    }
  };
export const getAboutSectionById = (did) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ABOUT_SECTION_BY_ID_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    console.log('token',token)
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    console.log('00',did)
    const DeviceId121 = did
    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/about/${DeviceId121}`,
      config
    );
    dispatch({
      type: GET_ABOUT_SECTION_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ABOUT_SECTION_BY_ID_FAIL,
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
export const getDeviceEventsById = ({ page, limit }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEVICE_EVENTS_BY_ID_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const DeviceId12 = urlParams.get('DeviceId');
    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceEvents/${DeviceId12}?page=${page}&limit=${limit}`,
      config
    );
    dispatch({
      type: GET_DEVICE_EVENTS_BY_ID_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: GET_DEVICE_EVENTS_BY_ID_FAIL,
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
export const getCalibrationById = ({ page, limit }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEVICE_CALIBRATION_BY_ID_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const DeviceId12 = urlParams.get('DeviceId');
    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/calibration/${DeviceId12}?page=${page}&limit=${limit}`,
      config
    );
    dispatch({
      type: GET_DEVICE_CALIBRATION_BY_ID_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: GET_DEVICE_CALIBRATION_BY_ID_FAIL,
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
export const getDeviceAlarmsById = ({ page, limit }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEVICE_ALARMS_BY_ID_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const DeviceId121 = urlParams.get('DeviceId');
    // console.log('Device12',DeviceId121)
    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceAlerts/${DeviceId121}?page=${page}&limit=${limit}`,
      config
    );
    dispatch({
      type: GET_DEVICE_ALARMS_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEVICE_ALARMS_BY_ID_FAIL,
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
export const getDeviceLogsById = ({ page, limit }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEVICE_LOGS_BY_ID_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const DeviceId121 = localStorage.getItem('deviceid');
    // console.log('Device12',DeviceId121)
    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceLogs/${DeviceId121}?page=${page}&limit=${limit}`,
      config
    );
    dispatch({
      type: GET_DEVICE_LOGS_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEVICE_LOGS_BY_ID_FAIL,
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
export const getDeviceTrendsById = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEVICE_TRENDS_BY_ID_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const DeviceId12 = localStorage.getItem('deviceid');
    // console.log('Device12',DeviceId12)
    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceTrends/${DeviceId12}`,

      config
    );
    dispatch({
      type: GET_DEVICE_TRENDS_BY_ID_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: GET_DEVICE_TRENDS_BY_ID_FAIL,
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
export const getLogMsgOccurence = (did, logMsg) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LOG_MSG_OCCURENCE_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/logMsgOccurence2/${did}?logMsg=${logMsg}`,
      config
    );
    dispatch({
      type: GET_LOG_MSG_OCCURENCE_SUCCESS,
      payload: data.data
    });
    // console.log(data)
  } catch (error) {
    dispatch({
      type: GET_LOG_MSG_OCCURENCE_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    })
  }
};
export const getDeviceCrashAnalytics = (did, logMsg) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEVICE_CRASH_ANALYTICS_DATA_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/get-crashlytics-data2/${did}?&logMsg=${logMsg}`,
      config
    );
    dispatch({
      type: GET_DEVICE_CRASH_ANALYTICS_DATA_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEVICE_CRASH_ANALYTICS_DATA_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }

}
export const getServiceRecordsById = ({ did, page, limit }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SERVICE_RECORDS_DETAILS,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    console.log('page, limit',page, limit)
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/services/${did}/SBXMH?${page}&${limit}`,
      config
    );
    dispatch({
      type: GET_SERVICE_RECORDS_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SERVICE_RECORDS_DETAILS_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }

}

export const getSingleUploadFile = (deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_UPLOAD_FILE_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/s3/get-uploaded-files/${deviceId}`,
      config
    );
    dispatch({
      type: GET_SINGLE_UPLOAD_FILE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_UPLOAD_FILE_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.err &&
        error.response.data.data.err.msg,
    });
  }

}