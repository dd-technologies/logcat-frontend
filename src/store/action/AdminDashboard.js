import axios from 'axios';
import Cookies from 'universal-cookie';

import {
    ALL_USERS_DETAILS_REQUEST,
    ALL_USERS_DETAILS_SUCCESS,
    ALL_USERS_DETAILS_FAIL,
    UPDATE_ALL_USERS_REQUEST,
    UPDATE_ALL_USERS_SUCCESS,
    UPDATE_ALL_USERS_FAIL
} from '../types/AdminDashboard';
const cookies = new Cookies();

  export const getAllUsersDetalisById = () => async (dispatch) => {
    try {
      dispatch({
        type: ALL_USERS_DETAILS_REQUEST,
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/users-list`,
        config
      );
      dispatch({
        type: ALL_USERS_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_USERS_DETAILS_FAIL,
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

  export const updateAllUsersDetailsById = (userType,_id) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_ALL_USERS_REQUEST,
        });

        const token = cookies.get('ddAdminToken');

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        console.log("userType", userType)
        console.log("_id",_id)

        const { data } = await axios.put(
            `${process.env.REACT_APP_BASE_URL}/api/logger/change-userType/${_id}`,
            { userType},
            config,
        );
        dispatch({
            type: UPDATE_ALL_USERS_SUCCESS,
            payload: data,
        });
        if(data.statusCode==200){
          window.location.reload()
        }
    } catch (error) {

        dispatch({
            type: UPDATE_ALL_USERS_FAIL,
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