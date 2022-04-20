import axios from "axios";
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
} from "../types/AdminConstants";
import { persistor } from "../Store";

// USER LOGIN
export const loginWithEmail =
  (email, password, isRemeberMe) => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_LOGIN_REQUEST });
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };
      console.log(`env varibale: ${process.env.REACT_APP_BASE_URL}`);
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
        localStorage.removeItem("adminUserName");
        localStorage.removeItem("adminUserCredential");
        localStorage.removeItem("userIsRemember");
      }
      localStorage.setItem("ddAdminToken", data.data.token);
    } catch (error) {
      dispatch({
        type: ADMIN_LOGIN_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data.message
            : error.message,
      });
    }
  };

// USER LOGOUT
export const adminLogout = (history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ddAdminToken")}`,
      },
    };

    await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/auth/logout`,
      config
    );

    localStorage.removeItem("ddAdminToken");
    await persistor.purge();

    history.push("/");
    dispatch({
      type: ADMIN_LOGOUT,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//  USER REGISTER ACTIONS
export const adminRegister =
  (email, password, name, history) => async (dispatch) => {
    try {
      dispatch({
        type: ADMIN_REGISTER_REQUEST,
      });

      const config = {
        header: {
          "Content-type": "application/json",
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

      dispatch({
        type: ADMIN_REGISTER_SUCCESS,
        payload: data,
      });

      localStorage.setItem("adminInfo", data);
      history.push("/");
    } catch (error) {
      dispatch({
        type: ADMIN_REGISTER_FAIL,
        payload:
          error.response && error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message,
      });
    }
  };

// FORGET PASSWORD
export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGET_PASSWORD_REQUEST,
    });

    const config = {
      header: {
        "Content-type": "application/json",
      },
    };
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
    dispatch({
      type: FORGET_PASSWORD_REQUEST_FAIL,
      payload:
        error.response && error.response.data.errorMessage
          ? error.response.data.errorMessage
          : error.message,
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

      const config = {
        header: {
          "Content-type": "application/json",
        },
      };
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
      dispatch({
        type: RESET_PASSWORD_REQUEST_FAIL,
        payload:
          error.response &&
          error.response.data &&
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message,
      });
    }
  };

// UPDATE PROFILE OF USER
export const updateProfile = (email, name, avatar) => async (dispatch) => {
  try {
    console.log("form data: ", email, name, avatar);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("image", avatar);
    console.log([...formData]);
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });
    const token = localStorage.getItem("ddAdminToken");
    const config = {
      headers: {
        Accept: "application/JSON",
        "Content-type": "multipart/form-data",
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
    dispatch({
      type: UPDATE_PROFILE_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
