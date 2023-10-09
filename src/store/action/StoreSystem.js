import axios from "axios";
import Cookies from 'universal-cookie';
import {
  STORE_SYSTEM_REQUEST,
  STORE_SYSTEM_SUCCESS,
  STORE_SYSTEM_FAIL,
  ALL_HOSPITAL_DATA_SUCCESS,
  ALL_HOSPITAL_DATA_REQUEST,
  ALL_HOSPITAL_DATA_FAIL,
  PUT_ALL_STORE_DATA_REQUEST,
  PUT_ALL_STORE_DATA_SUCCESS,
  PUT_ALL_STORE_DATA_FAIL
} from "../types/StoreConstant";
const cookies = new Cookies();
export const getStoreSystem = () => async (dispatch) => {
  try {
    dispatch({
      type: STORE_SYSTEM_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/api/logger/service-eng-list`,
      config
    );
    dispatch({
      type: STORE_SYSTEM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: STORE_SYSTEM_FAIL,
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

export const getAllHospitalData = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_HOSPITAL_DATA_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/hospital/hospital-list`,
      config
    );
    dispatch({
      type: ALL_HOSPITAL_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_HOSPITAL_DATA_FAIL,
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

export const putallStoreDataAction = ({ deviceId, service_engineer, hospital_name, details, concerned_p_contact , issues}) => async (dispatch) => {
  try {
    dispatch({
      type: PUT_ALL_STORE_DATA_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/support/create-ticket`,
      {
        deviceId,
        service_engineer,
        hospital_name,
        details,
        concerned_p_contact,
        issues
      },
      config
    );
    dispatch({
      type: PUT_ALL_STORE_DATA_SUCCESS,
      payload: data,
    });
    if (data.statusCode == 200) {
      window.location.reload();
    }
  } catch (error) {
    dispatch({
      type: PUT_ALL_STORE_DATA_FAIL,
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