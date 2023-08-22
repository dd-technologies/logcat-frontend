import { DISPATCH_DETAILS_FAIL, DISPATCH_DETAILS_REQUEST, DISPATCH_DETAILS_SUCCESS, GET_DISPATCH_DETAILS_DATA_BYID_FAIL, GET_DISPATCH_DETAILS_DATA_BYID_REQUEST, GET_DISPATCH_DETAILS_DATA_BYID_SUCCESS, GET_DISPATCH_DETAILS_DATA_FAIL, GET_DISPATCH_DETAILS_DATA_REQUEST, GET_DISPATCH_DETAILS_DATA_SUCCESS } from "../types/DispatchDeviceType";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
//  USER REGISTER ACTIONS
export const dispatchDetailsAction =
  ({
    deviceId,
    product_type,
    serial_no,
    purpose,
    concerned_person,
    phone_number,
    batch_no,
    date_of_manufacturing,
    address,
    date_of_dispatch,
    hospital_name,
    navigate
  }) =>
    async (dispatch) => {
      try {
        dispatch({
          type: DISPATCH_DETAILS_REQUEST,
        });
        const projectCode = "SBXMH"
        const config = {
          header: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/logger/logs/add-dispatch-details/${projectCode}`,
          {
            deviceId,
            product_type,
            serial_no,
            purpose,
            concerned_person,
            phone_number,
            batch_no,
            date_of_manufacturing,
            address,
            date_of_dispatch,
            hospital_name,
          },
          config
        );
        dispatch({
          type: DISPATCH_DETAILS_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: DISPATCH_DETAILS_FAIL,
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

export const getdispatchDetailsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DISPATCH_DETAILS_DATA_REQUEST,
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
    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/get-dispatch-data/sbxmh`,
      config
    );
    dispatch({
      type: GET_DISPATCH_DETAILS_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DISPATCH_DETAILS_DATA_FAIL,
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

export const getdispatchDetailsByDeviceIdAction = (deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DISPATCH_DETAILS_DATA_BYID_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

   let response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/get-dispatch-databyId/${deviceId}`,
      config
    );
    dispatch({
      type: GET_DISPATCH_DETAILS_DATA_BYID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DISPATCH_DETAILS_DATA_BYID_FAIL,
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