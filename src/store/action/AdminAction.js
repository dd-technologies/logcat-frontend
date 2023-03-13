import axios from 'axios';
import Cookies from 'universal-cookie';

import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_LOGOUT_FAIL,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_REQUEST_SUCCESS,
  FORGET_PASSWORD_REQUEST_FAIL,
  FORGET_PASSWORD_RESET_STATE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST_SUCCESS,
  UPDATE_PROFILE_REQUEST_FAIL,
} from '../types/AdminConstants';
import { persistor } from '../Store';

const cookies = new Cookies();

// USER LOGIN
export const loginWithEmail =
  (email, password, isRemeberMe) => async (dispatch) => {
    try {
      Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
      };

      dispatch({ type: ADMIN_LOGIN_REQUEST });
      
      const config = {
        header: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/logger/auth/login`,
        {
          email,
          password,
        },
        config
      );
      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: data,
      });
      if (!isRemeberMe) {
        localStorage.removeItem('adminUserName');
        localStorage.removeItem('adminUserCredential');
        localStorage.removeItem('userIsRemember');
      }
      // localStorage.setItem("ddAdminToken", data.data.token);
      var currentDate = new Date();
      // to add 4 days to current date
      var updatedDate = currentDate.addDays(15);
      cookies.set('ddAdminToken', data.data.token, {
        path: '/',
        expires: updatedDate,
      });
    } catch (error) {
      // console.log("login error", error);
      dispatch({
        type: ADMIN_LOGIN_FAIL,
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

// USER LOGOUT
export const adminLogout = (navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${cookies.get('ddAdminToken')}`,
      },
    };

    await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/auth/logout`,
      config
    );

    cookies.remove('ddAdminToken');
    // localStorage.removeItem('ddAdminToken');
    localStorage.removeItem('selected_record');
    localStorage.removeItem('forgetEmail');
    localStorage.removeItem('mode');
    localStorage.removeItem('selected_log');
    localStorage.removeItem('diffDate');
    localStorage.removeItem('project_type');
    localStorage.removeItem('page_no');
    localStorage.removeItem('selected_date');

    await persistor.purge();

    navigate('/');
    dispatch({
      type: ADMIN_LOGOUT,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LOGOUT_FAIL,
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

//  USER REGISTER ACTIONS
export const adminRegister =
  (name, email, password, navigate) => async (dispatch) => {
    try {
      dispatch({
        type: ADMIN_REGISTER_REQUEST,
      });

      const config = {
        header: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/logger/auth/register`,
        {
          name,
          email,
          password,
        },
        config
      );

      // console.log("Data", data);

      dispatch({
        type: ADMIN_REGISTER_SUCCESS,
        payload: data,
      });

      localStorage.setItem('adminInfo', data);
      navigate('/');
    } catch (error) {
      // console.log("reigster error", error);
      dispatch({
        type: ADMIN_REGISTER_FAIL,
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

// FORGET PASSWORD
export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGET_PASSWORD_REQUEST,
    });

    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/logger/auth/forget`,
      {
        email,
      }
    );

    dispatch({
      type: FORGET_PASSWORD_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log("forget password", error);

    dispatch({
      type: FORGET_PASSWORD_REQUEST_FAIL,
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

// RESET FORGET PASSWORD REDUCER STATE
export const resetForgetPasswordState = () => async (dispatch) => {
  dispatch({
    type: FORGET_PASSWORD_RESET_STATE,
  });
};

// RESET PASSWORD AFTER OTP
export const resetForgetPassword =
  ({ email, resetData }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });

      const otp = resetData.otp;
      const password = resetData.newPass;
      const passwordVerify = resetData.confirmPass;

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/logger/auth/resetPassword`,
        {
          otp,
          password,
          email,
          passwordVerify,
        }
      );

      dispatch({
        type: RESET_PASSWORD_REQUEST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.log("reset password", error);
      dispatch({
        type: RESET_PASSWORD_REQUEST_FAIL,
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

// UPDATE PROFILE OF USER
export const updateProfile = (email, name, avatar) => async (dispatch) => {
  try {
    // console.log("form data: ", email, name, avatar);
    let formData = new FormData();
    formData.append('name', name);
    formData.append('image', avatar);
    console.log([...formData]);
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });
    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        Accept: 'application/JSON',
        'Content-type': 'multipart/form-data',
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_BASE_URL}api/logger/users/update`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log("update profile", error);
    dispatch({
      type: UPDATE_PROFILE_REQUEST_FAIL,
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
