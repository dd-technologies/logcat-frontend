import axios from "axios";
import { ALARM_FAIL, ALARM_REQUEST, ALARM_SUCSESS } from "../types/AlarmConstants";

export const alarmAction =
  (projectType = null) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALARM_REQUEST,
      });
      const token = localStorage.getItem("ddAdminToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let response;

      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/logs/alerts/SBXMH?projectType=${projectType}`,
        config
      );

      dispatch({
        type: ALARM_SUCSESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ALARM_FAIL,
        payload: error,
      });
    }
  };
