import {
  GET_PRODUCTION_DETAILS_DATA_REQUEST, PRODUCTION_DETAILS_REQUEST, PRODUCTION_DETAILS_SUCCESS, PRODUCTION_DETAILS_FAIL, DISPATCH_DETAILS_FAIL, DISPATCH_DETAILS_REQUEST, DISPATCH_DETAILS_SUCCESS, GET_DISPATCH_DETAILS_DATA_BYID_FAIL, GET_DISPATCH_DETAILS_DATA_BYID_REQUEST, GET_DISPATCH_DETAILS_DATA_BYID_SUCCESS, GET_DISPATCH_DETAILS_DATA_FAIL, GET_DISPATCH_DETAILS_DATA_REQUEST, GET_DISPATCH_DETAILS_DATA_SUCCESS, GET_PRODUCTION_DETAILS_DATA_SUCCESS, GET_PRODUCTION_DETAILS_DATA_FAIL,
  GET_PRODUCTION_DETAILS_DATA_BY_ID_REQUEST,
  GET_PRODUCTION_DETAILS_DATA_BY_ID_SUCCESS,
  GET_PRODUCTION_DETAILS_DATA_BY_ID_FAIL,
  GET_DHR_UPLOAD_FILE_REQUEST,
  GET_DHR_UPLOAD_FILE_SUCCESS,
  GET_DHR_UPLOAD_FILE_FAIL,
  GET_PINCODE_DATA_SUCCESS,
  GET_PINCODE_DATA_REQUEST,
  GET_PINCODE_DATA_FAIL,
  GET_DEVICEID_FROM_PRODUCTION_REQUEST,
  GET_DEVICEID_FROM_PRODUCTION_SUCCESS,
  GET_DEVICEID_FROM_PRODUCTION_FAIL,
  GET_EDIT_DISPATCH_DATA_REQUEST,
  GET_EDIT_DISPATCH_DATA_FAIL,
  GET_EDIT_DISPATCH_DATA_SUCCESS,
  GET_SINGLE_HOSPITAL_DETAILS_REQUEST,
  GET_SINGLE_HOSPITAL_DETAILS_SUCCESS,
  GET_SINGLE_HOSPITAL_DETAILS_FAIL,
  GET_SERIAL_NUMBER_LIST_REQUEST,
  GET_SERIAL_NUMBER_LIST_SUCCESS,
  GET_SERIAL_NUMBER_LIST_FAIL,
  GET_SINGLE_SERIAL_NO_TRACK_DATA_REQUEST,
  GET_SINGLE_SERIAL_NO_TRACK_DATA_SUCCESS,
  GET_SINGLE_SERIAL_NO_TRACK_DATA_FAIL,
} from "../types/DispatchDeviceType";
import axios from "axios";
import { toast } from "react-hot-toast";
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
    address,
    date_of_dispatch,
    hospital_name,
    pincode,
    distributor_name,
    distributor_contact,
    district,
    state,
    city,
    document_no
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
            address,
            date_of_dispatch,
            hospital_name,
            pincode,
            distributor_contact,
            distributor_name,
            district,
            state,
            city,
            document_no
          },
          config
        );
        dispatch({
          type: DISPATCH_DETAILS_SUCCESS,
          payload: data,
        });
        if (data.statusCode == 201) {
          window.location.reload()
        }
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

export const getdispatchDetailsAction = ({ page, limit }) => async (dispatch) => {
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
    console.log("heyy", page, limit)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const DeviceId121 = urlParams.get('DeviceId');
    let response;

    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/get-dispatch-data/sbxmh?page=${page}&limit=${limit}`,
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

export const productionDetailsAction = ({
  deviceId,
  productType,
  purpose,
  batchNumber,
  manufacturingDate,
  serialNumber,
  dispatchDate,
  simNumber,
  hw_version,
  sw_version,
  turbineNumber,
  displayNumber
  
}) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCTION_DETAILS_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/production/add-new`,
      {
        deviceId,
        productType,
        purpose,
        batchNumber,
        manufacturingDate,
        serialNumber,
        dispatchDate,
        simNumber,
        hw_version,
        sw_version,
        turbineNumber,
        displayNumber
      },
      config
    );
    dispatch({
      type: PRODUCTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTION_DETAILS_FAIL,
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
export const getproductionDetailsAction = ({ page, limit }) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTION_DETAILS_DATA_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/production/production-list?page=${page}&limit=${limit}`,
      config
    );
    dispatch({
      type: GET_PRODUCTION_DETAILS_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTION_DETAILS_DATA_FAIL,
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
export const getproductionDetailsByIdAction = (deviceId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTION_DETAILS_DATA_BY_ID_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response;
    console.log('id', deviceId)
    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/production/get-byid/${deviceId}`,
      config
    );
    dispatch({
      type: GET_PRODUCTION_DETAILS_DATA_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTION_DETAILS_DATA_BY_ID_FAIL,
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
export const getDHRUploadFile = (deviceId, key) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DHR_UPLOAD_FILE_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/production/get-production-file/${deviceId}/${key}`,
      config
    );
    dispatch({
      type: GET_DHR_UPLOAD_FILE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DHR_UPLOAD_FILE_FAIL,
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

export const getPincodeData = (pincode) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PINCODE_DATA_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log('pincode', pincode)
    let response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/common/search-by-pincode/${pincode}`,
      config
    );
    dispatch({
      type: GET_PINCODE_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PINCODE_DATA_FAIL,
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

export const getDeviceIdFromProduction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEVICEID_FROM_PRODUCTION_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/production/get-production-devices`,
      config
    );
    dispatch({
      type: GET_DEVICEID_FROM_PRODUCTION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEVICEID_FROM_PRODUCTION_FAIL,
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

export const editDispatchDataModel = ({ deviceId,
  hospital_name,
  address,
  document_no,
  phone_number,
  concerned_person , serial_no, date_of_dispatch}) => async (dispatch) => {
    try {
      dispatch({
        type: GET_EDIT_DISPATCH_DATA_REQUEST,
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/update-dispatch-data/SBXMH`,
        {
          deviceId,
          hospital_name,
          address,
          document_no,
          phone_number,
          concerned_person,
          serial_no,
          date_of_dispatch
        },
        config
      );
      dispatch({
        type: GET_EDIT_DISPATCH_DATA_SUCCESS,
        payload: response.data,
      });
      console.log('data',response.data)
      if(response.data.statusCode===200){
        toast.success('New Data Added')
      }
    } catch (error) {
      dispatch({
        type: GET_EDIT_DISPATCH_DATA_FAIL,
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

  export const getSingleHospitalDetails = (hospital_name) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_HOSPITAL_DETAILS_REQUEST,
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/hospital/get-byhospital/${hospital_name}`,
        config
      );
      dispatch({
        type: GET_SINGLE_HOSPITAL_DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_HOSPITAL_DETAILS_FAIL,
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

  export const getSerialNumberList = () => async (dispatch) => {
    try {
      dispatch({
        type: GET_SERIAL_NUMBER_LIST_REQUEST,
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/common/get-serial-number-list`,
        config
      );
      dispatch({
        type: GET_SERIAL_NUMBER_LIST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_SERIAL_NUMBER_LIST_FAIL,
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

  export const getSingleSerialNumberData = (deviceId) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_SERIAL_NO_TRACK_DATA_REQUEST,
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/track-dispatched-device-location/${deviceId}`,
        config
      );
      dispatch({
        type: GET_SINGLE_SERIAL_NO_TRACK_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_SERIAL_NO_TRACK_DATA_FAIL,
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