import axios from "axios";
import Cookies from "universal-cookie";
import { Toaster, toast } from "react-hot-toast";
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
  HOSPITAL_NAME_FAIL,
  HOSPITAL_NAME_REQUEST,
  HOSPITAL_NAME_SUCCESS,
  COUNTRY_STATE_DATA_REQUEST,
  COUNTRY_STATE_DATA_SUCCESS,
  COUNTRY_STATE_DATA_FAIL,
  STATE_DATA_REQUEST,
  STATE_DATA_FAIL,
  STATE_DATA_SUCCESS,
} from "../types/AdminConstants";
import { persistor } from "../Store";

const cookies = new Cookies();
// USER LOGIN
export const loginWithEmail =
  (email, passwordHash, isRemeberMe, ddAdminToken) => async (dispatch) => {
    try {
      Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
      };

      dispatch({ type: ADMIN_LOGIN_REQUEST });

      const config = {
        header: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/logger/auth/login`,
        {
          email,
          passwordHash,
          ddAdminToken,
        },
        config
      );
      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: data,
      });
      console.log("isRemeberMe",isRemeberMe)
      // if (isRemeberMe) {
      //   alert("hello")
      //   // localStorage.removeItem("email");
      //   // localStorage.removeItem("rememberEmail");
      //   // localStorage.removeItem("rememberPassword");
      //   // localStorage.removeItem("isRemeberMe");
      //   localStorage.setItem("rememberEmail",email);
      // localStorage.setItem("rememberPassword",passwordHash)
      // }
      localStorage.setItem("ddAdminToken", data.data.token);
      localStorage.setItem("name", data.data.name);
      localStorage.setItem("email",email);
      // localStorage.setItem("rememberEmail",email);
      // localStorage.setItem("rememberPassword",passwordHash)
      var currentDate = new Date();
      // to add 4 days to current date
      var updatedDate = currentDate.addDays(15);
      cookies.set("ddAdminToken", data.data.token, {
        path: "/",
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
        "Content-type": "application/json",
        Authorization: `Bearer ${cookies.get("ddAdminToken")}`,
      },
    };
    // console.log("token",cookies.get('ddAdminToken'))
    await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/auth/logout`,
      config
    );

    cookies.remove("ddAdminToken");
    // localStorage.removeItem('ddAdminToken');
    localStorage.removeItem("selected_record");
    localStorage.removeItem("forgetEmail");
    localStorage.removeItem("mode");
    localStorage.removeItem("selected_log");
    localStorage.removeItem("diffDate");
    localStorage.removeItem("project_type");
    localStorage.removeItem("page_no");
    localStorage.removeItem("selected_date");

    await persistor.purge();

    navigate("/");
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
  (
    firstName,
    lastName,
    stateName,
    countryName,
    hospitalName,
    email,
    passwordHash,
    confirmPassword,
    navigate
  ) =>
  async (dispatch) => {
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
          firstName,
          lastName,
          stateName,
          countryName,
          hospitalName,
          email,
          passwordHash,
          confirmPassword,
        },
        config
      );

      // console.log("Data", data);

      dispatch({
        type: ADMIN_REGISTER_SUCCESS,
        payload: data,
      });

      localStorage.setItem("adminInfo", data);
      navigate("/");
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
      `${process.env.REACT_APP_BASE_URL}/api/logger/auth/resetPassword`,
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
  ({ resetData }) =>
  async (dispatch) => {
    // const navigate = useNavigate();
    try {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });
      const otp = resetData;
      alert("opt", otp);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/logger/auth/verify-otp`,
        {
          otp,
        }
      );

      dispatch({
        type: RESET_PASSWORD_REQUEST_SUCCESS,
        payload: data,
      });
      // if(data.statusCode==200){
      //   // navigate("/changePassword")
      //   // message("hello")
      // }
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

// Password Change

export const forgetPasswordChange =
  ({ email, resetData }) =>
  async (dispatch) => {
    <Toaster/>
    // const navigate = useNavigate();
    try {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });
      const passwordHash = resetData.newPass;
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/logger/auth/generate-newpassword`,
        {
          email,
          passwordHash,
        }
      );

      dispatch({
        type: RESET_PASSWORD_REQUEST_SUCCESS,
        payload: data,
      });
      if(data.statusCode==200){
        toast.success("Update Success")
      }
    } catch (error) {
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

export const allHospitalData = (State) => async (dispatch) => {
  try {
    dispatch({
      type: HOSPITAL_NAME_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/hospital/hospital-list/${State}`,
      config
    );
    dispatch({
      type: HOSPITAL_NAME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOSPITAL_NAME_FAIL,
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
export const allCountryStateData = () => async (dispatch) => {
  try {
    dispatch({
      type: COUNTRY_STATE_DATA_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/hospital/get-country-list`,
      config
    );
    dispatch({
      type: COUNTRY_STATE_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNTRY_STATE_DATA_FAIL,
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
export const allStateData = (name) => async (dispatch) => {
  try {
    dispatch({
      type: STATE_DATA_REQUEST,
    });
    const token = cookies.get("ddAdminToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/hospital/get-state-list/${name}`,
      config
    );
    dispatch({
      type: STATE_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STATE_DATA_FAIL,
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
