import axios from "axios";
import {
  USER_PASSWORD_CHANGE_REQUEST,
  USER_PASSWORD_CHANGE_SUCESS,
  USER_PASSWORD_CHANGE_FAIL,
} from "../types/UserConstants";

export const passwordChangeAction =
  (password, newPassword) => async (dispatch) => {
    try {
      // console.log(password, newPassword);

      var response;
      dispatch({ type: USER_PASSWORD_CHANGE_REQUEST });

      // API INTEGRATION -----
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

      // console.log("body", body);
      // console.log("config", config);

      response = await axios.put(
        `https://logger-server.herokuapp.com/api/logger/users/changepassword`,
        body,
        config
      );

      dispatch({
        type: USER_PASSWORD_CHANGE_SUCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: USER_PASSWORD_CHANGE_FAIL,
        payload: error,
      });
    }
  };
