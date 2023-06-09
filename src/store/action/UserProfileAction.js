import axios from "axios";
import Cookies from 'universal-cookie';
import { USER_PASSWORD_CHANGE_REQUEST, USER_PASSWORD_CHANGE_SUCESS, USER_PASSWORD_CHANGE_FAIL, } from "../types/UserConstants";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCSESS } from "../types/UserInfoConstant";

const cookies = new Cookies();

// USER PASSWORD UPDATE
export const passwordChangeAction =
  (password, newPassword) => async (dispatch) => {
    try {
      var response;
      dispatch({ type: USER_PASSWORD_CHANGE_REQUEST });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const body = {
        currentPassword: password,
        newPassword: newPassword,
      };
      response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/logger/users/changepassword`,
        body,
        config
      );
      dispatch({
        type: USER_PASSWORD_CHANGE_SUCESS,
        payload: response.data,
      });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      // console.log("error", error);

      dispatch({
        type: USER_PASSWORD_CHANGE_FAIL,
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



export const userInfoActionFn = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const token = cookies.get('ddAdminToken');
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/logger/users/me`,
      config
    );
    dispatch({
      type: USER_DETAILS_SUCSESS,
      payload: response.data,
    });
  } catch (error) {
    // console.log("get log count api error", error);

    dispatch({
      type: USER_DETAILS_FAIL,
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