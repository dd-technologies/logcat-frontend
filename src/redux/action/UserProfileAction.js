import axios from "axios";
import {
  USER_PASSWORD_CHANGE_REQUEST,
  USER_PASSWORD_CHANGE_SUCESS,
  USER_PASSWORD_CHANGE_FAIL,
} from "../types/UserConstants";

// USER PASSWORD UPDATE
export const passwordChangeAction =
  (password, newPassword) => async (dispatch) => {
    try {
      var response;
      dispatch({ type: USER_PASSWORD_CHANGE_REQUEST });
      const token = localStorage.getItem("ddAdminToken");
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
      // console.log("response data: ", response.data);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      dispatch({
        type: USER_PASSWORD_CHANGE_FAIL,
        payload: error,
      });
    }
  };
