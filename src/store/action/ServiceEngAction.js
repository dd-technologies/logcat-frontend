import axios from "axios";
import Cookies from 'universal-cookie';
import {
  GET_ALL_TICKETS_DATA_REQUEST,
  GET_ALL_TICKETS_DATA_SUCCESS,
  GET_ALL_TICKETS_DATA_FAIL,
  UPDATE_STATUS_DATA_REQUEST,
  UPDATE_STATUS_DATA_SUCCESS,
  UPDATE_STATUS_DATA_FAIL,
  DELETE_STATUS_DATA_REQUEST,
  DELETE_STATUS_DATA_SUCCESS,
  DELETE_STATUS_DATA_FAIL,
  GET_TICKET_DETAILS_BY_ID_REQUEST,
  GET_TICKET_DETAILS_BY_ID_SUCCESS,
  GET_TICKET_DETAILS_BY_ID_FAIL,
  POST_DOC_BY_SERVICE_REQUEST,
  POST_DOC_BY_SERVICE_SUCCESS,
  POST_DOC_BY_SERVICE_FAIL,
} from "../types/ServiceEngType";
const cookies = new Cookies();
export const getAllTicketsDataAction = (searchData, page, limit) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_TICKETS_DATA_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/support/get-tickets?page=${page}&limit=${limit}&search=${searchData}`,
      config
    );
    dispatch({
      type: GET_ALL_TICKETS_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TICKETS_DATA_FAIL,
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

export const putStatusDataAction = ({ id, status, priority }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_STATUS_DATA_REQUEST
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        method: 'PUT',
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/support/update-ticket`,
        {
          id,
          status,
          priority
        },
        config
      );
      dispatch({
        type: UPDATE_STATUS_DATA_SUCCESS,
        payload: data,
      });
      if (data.statusCode == 200) {
        window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: UPDATE_STATUS_DATA_FAIL,
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

export const deleteStatusDataAction = ({ id }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: DELETE_STATUS_DATA_REQUEST
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        method: 'PUT',
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/support/delete-ticket/${id}`,
        config
      );
      dispatch({
        type: DELETE_STATUS_DATA_SUCCESS,
        payload: data,
      });
      if (data.statusCode == 200) {
        window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: DELETE_STATUS_DATA_FAIL,
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

export const getTicketsDetailsByDeviceIdAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TICKET_DETAILS_BY_ID_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("id", id)
    let { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/support/get-ticket/${id}`,
      config
    );
    dispatch({
      type: GET_TICKET_DETAILS_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TICKET_DETAILS_BY_ID_FAIL,
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
export const uploadDocByServiceAction = (deviceId,file) => async (dispatch) => {
  try {
    dispatch({
      type: POST_DOC_BY_SERVICE_REQUEST
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      method: 'PUT',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log('11',deviceId)
    let { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/s3/upload-single`,
      {
        deviceId,
        file
      },
      config
    );
    dispatch({
      type: POST_DOC_BY_SERVICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_DOC_BY_SERVICE_FAIL,
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