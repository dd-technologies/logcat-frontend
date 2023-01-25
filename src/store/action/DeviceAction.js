import axios from "axios"
import Cookies from 'universal-cookie';

import{
    REGISTER_DEVICE_DETAILS_REQUEST,
    REGISTER_DEVICE_DETAILS_FAIL,
    REGISTER_DEVICE_DETAILS_SUCCESS
}from "../types/DeviceConstant";

const cookies = new Cookies();

export const registerNewDevice = () =>async(dispatch)=>{
    try{
        dispatch({
            type:REGISTER_DEVICE_DETAILS_REQUEST,
        });
        const token = cookies.get('ddAdminToken')
        const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/logger/device/`,
        {
          deviceID: device_ID,
          IMEINo: IMEI_No,
          hospName: hosp_name,
        },
        config
      );
      dispatch({
        type: REGISTER_DEVICE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_DEVICE_DETAILS_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data &&
          error.response.data.data.err &&
          error.response.data.data.msg,
      });
    }
};