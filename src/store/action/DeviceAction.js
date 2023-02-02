import axios from "axios";
import Cookies from 'universal-cookie';
import {
    DEVICE_FAIL,
    DEVICE_REQUEST,
    DEVICE_SUCCESS,
    REGISTER_NEW_DEVICE_REQUEST,
    REGISTER_NEW_DEVICE_SUCCESS,
    REGISTER_NEW_DEVICE_FAIL,
    GET_ALL_LOG_BY_CODE_FAIL,
    GET_ALL_LOG_BY_CODE_REQUEST,
    GET_ALL_LOG_BY_CODE_SUCCESS

}from "../types/DeviceConstant";

const cookies = new Cookies();

export const deviceAction = (
  code = null,
  diffdate = null,
  page = 1,
  record = 25,
  sort = null
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
        `${process.env.REACT_APP_BASE_URL}/api/logger/device/`, 
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
export const registerNewDevice = ( DeviceID,DoctorName,HospitalName,Alias,IMEINumber,VentiOperator,Wardno) =>async(dispatch)=>{
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
export const getDeviceLogsById = (
  code,
  DeviceID,
  projectName,
) => async (dispatch) => {
  try {
      dispatch({
        type:GET_ALL_LOG_BY_CODE_REQUEST,
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
        `${process.env.REACT_APP_BASE_URL}/api/logger/DeviceData?code=${code}&name=${projectName}&DeviceId=${DeviceID}`, 
        config
      );
      dispatch({
        type:GET_ALL_LOG_BY_CODE_SUCCESS,
        payload:response.data,
      });
    }catch(error){
        dispatch({
            type: GET_ALL_LOG_BY_CODE_FAIL,
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