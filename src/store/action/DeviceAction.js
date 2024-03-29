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
    // GET_ALL_LOG_BY_CODE_FAIL,
    // GET_ALL_LOG_BY_CODE_REQUEST,
    // GET_ALL_LOG_BY_CODE_SUCCESS,
    GET_DEVICE_ALARMS_BY_ID_FAIL,
    GET_DEVICE_ALARMS_BY_ID_REQUEST,
    GET_DEVICE_ALARMS_BY_ID_SUCCESS,
    GET_DEVICE_LOGS_BY_ID_FAIL,
    GET_DEVICE_LOGS_BY_ID_REQUEST,
    GET_DEVICE_LOGS_BY_ID_SUCCESS,
    GET_LOG_MSG_OCCURENCE_FAIL,
    GET_LOG_MSG_OCCURENCE_REQUEST,
    GET_LOG_MSG_OCCURENCE_SUCCESS,
    GET_DEVICE_CRASH_ANALYTICS_DATA_FAIL,
    GET_DEVICE_CRASH_ANALYTICS_DATA_REQUEST,
    GET_DEVICE_CRASH_ANALYTICS_DATA_SUCCESS

}from "../types/DeviceConstant";
const cookies = new Cookies();

export const deviceAction = (
  code,
) => async (dispatch) => {
  try {
      dispatch({
        type:DEVICE_REQUEST,
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
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/AllEvents/Events`, 
        config
      );
      dispatch({
        type:DEVICE_SUCCESS,
        payload:response.data,
      });
    }catch(error){
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
export const registerNewDevice = ( DeviceID,Alias,HospitalName,DoctorName,Wardno,IMEINumber,VentiOperator) =>async(dispatch)=>{
  try{
    dispatch({
      type:REGISTER_NEW_DEVICE_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/logger/device/RegisterDevice/`,
      {
        DeviceId:DeviceID,
        AliasName:Alias,
        Hospital_Name:HospitalName,
        Doctor_Name:DoctorName,
        Ward_No:Wardno,
        IMEI_NO:IMEINumber,
        Ventilator_Operator:VentiOperator,
       
      },
      config
      );
      dispatch({
        type: REGISTER_NEW_DEVICE_SUCCESS,
        payload: data,
      });
  }catch (error) {
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

export const getRegisteredDetailsById=(DeviceID,DoctorName,HospitalName,Alias,IMEINumber,VentiOperator,Wardno) =>async(dispatch)=>{
  try{
    dispatch({
      type:GET_REGISTERED_DEVICE_DETAILS_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/device`,
      {
        DeviceId:DeviceID,
        Doctor_Name:DoctorName,
        Hospital_Name:HospitalName,
        AliasName:Alias,
        IMEI_NO:IMEINumber,
        Ventilator_Operator:VentiOperator,
        Ward_No:Wardno,
      },
      config
      );
      dispatch({
        type: GET_REGISTERED_DEVICE_DETAILS_SUCCESS,
        payload: data,
      });
      // console.log('data12',data);
  }catch(error) {
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
// export const getDetailsById = 
// (
//   did = null,
  
// )=>
// async(dispatch)=>{
//   try{
//     dispatch({
//       type:GET_DEVICE_DETAILS_BY_ID_REQUEST
//     });
//     const token = cookies.get('ddAdminToken');
//     const config ={
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await axios.get(
//       // `${process.env.REACT_APP_BASE_URL}/api/logger/device/RegisterDevice/${DeviceID}`,
//       `${process.env.REACT_APP_BASE_URL}/api/logger/logs/AllEvents/Events/${did}`,
//       config
//     );
//     dispatch({
//       type:GET_DEVICE_DETAILS_BY_ID_SUCCESS,
//       payload:response.data,
//     });
//   }catch(error){
//     dispatch({
//       type:GET_DEVICE_DETAILS_BY_ID_FAIL,
//       payload:
//       error &&
//       error.response &&
//       error.response.data &&
//       error.response.data.data &&
//       error.response.data.data.err &&
//       error.response.data.data.msg,
//     })
//   }
// };

export const updateDetailsById = 
(
  DeviceId,
  AliasName,
  Hospital_Name,
  Doctor_Name,
  Ward_No,
  IMEI_NO,
  Ventilator_Operator,
)=>
async(dispatch)=>{
  try{
    dispatch({
      type:UPDATE_DEVICE_DETAILS_BY_ID_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config ={
      method:'PUT',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let {data} = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/logger/device/Update/${DeviceId}`,
      {
        AliasName,
        Hospital_Name,
        Doctor_Name,
        Ward_No,
        IMEI_NO,
        Ventilator_Operator,
      },
      config
    );
    dispatch({
      type:UPDATE_DEVICE_DETAILS_BY_ID_SUCCESS,
      payload:data,
    });
    console.log('data123',data)
  }catch(error){
    dispatch({
      type:UPDATE_DEVICE_DETAILS_BY_ID_FAIL,
      payload:
      error &&
      error.response &&
      error.response.data &&
      error.response.data.data &&
      error.response.data.data.err &&
      error.response.data.data.msg,
    })
    console.log(DeviceId)
  }
};
export const getDeviceEventsById = () => async (dispatch) => {
  try {
      dispatch({
        type:GET_DEVICE_EVENTS_BY_ID_REQUEST,
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
      console.log('Device12',DeviceId12)
      let response;

      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceEvents/${DeviceId12}`,
         
        config
      );
      dispatch({
        type:GET_DEVICE_EVENTS_BY_ID_SUCCESS,
        payload:response.data,
      });
      
    }catch(error){
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
export const getDeviceAlarmsById = () => async (dispatch) => {
  try {
      dispatch({
        type:GET_DEVICE_ALARMS_BY_ID_REQUEST,
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
      console.log('Device12',DeviceId121)
      let response;

      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceAlerts/${DeviceId121}`, 
        config
      );
      dispatch({
        type:GET_DEVICE_ALARMS_BY_ID_SUCCESS,
        payload:response.data,
      });
    }catch(error){
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
export const getDeviceLogsById = () => async (dispatch) => {
  try {
      dispatch({
        type:GET_DEVICE_LOGS_BY_ID_REQUEST,
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
      console.log('Device12',DeviceId121)
      let response;

      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/deviceLogs/${DeviceId121}`, 
        config
      );
      dispatch({
        type:GET_DEVICE_LOGS_BY_ID_SUCCESS,
        payload:response.data,
      });
    }catch(error){
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

export const getLogMsgOccurence = (did,logMsg) => async (dispatch) =>{
  try{
        dispatch({
          type:GET_LOG_MSG_OCCURENCE_REQUEST,
        });
        const token = cookies.get('ddAdminToken');
        const config = {
          headers:{
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        };
        const {data} = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/logger/logs/logMsgOccurence2/${did}?logMsg=${logMsg}`,
                config
              );
              dispatch({
                type:GET_LOG_MSG_OCCURENCE_SUCCESS,
                payload:data.data
              });
              console.log(data)
            }catch(error){
              dispatch({
                type:GET_LOG_MSG_OCCURENCE_FAIL,
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
export const getDeviceCrashAnalytics = (did,logMsg)=>async (dispatch) =>{
  try{
    dispatch({
      type:GET_DEVICE_CRASH_ANALYTICS_DATA_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers:{
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/get-crashlytics-data2/${did}?&logMsg=${logMsg}`,
        config
      );
      dispatch({
        type:GET_DEVICE_CRASH_ANALYTICS_DATA_SUCCESS,
        payload: data.data,
  });
  }catch(error){
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