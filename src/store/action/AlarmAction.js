import axios from "axios";
import Cookies from 'universal-cookie';
import {
  ALARM_FAIL,
  ALARM_REQUEST,
  ALARM_SUCSESS,
} from "../types/AlarmConstant";

const cookies = new Cookies();

export const alarmAction = (
  code = null,
  projectType = null,
  diffdate = null,
  page = 1,
  record = 25,
  sort = null
) => async (dispatch) => {
  try {
    let date = new Date();
    let endDate = date.toLocaleDateString();
    endDate =
      endDate.split("/")[2] +
      "/" +
      endDate.split("/")[1] +
      "/" +
      endDate.split("/")[0];

    let startDate = new Date(
      new Date().setDate(new Date().getDate() - diffdate)
    )
      .toLocaleString()
      .split(",")[0];
    startDate =
      startDate.split("/")[2] +
      "/" +
      startDate.split("/")[1] +
      "/" +
      startDate.split("/")[0];

    dispatch({
      type: ALARM_REQUEST,
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
      `${process.env.REACT_APP_BASE_URL}/api/logger/logs/alerts/${code}?projectType=${projectType}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${record}&sort=${sort}`, //
      config
    );

    dispatch({
      type: ALARM_SUCSESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ALARM_FAIL,
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
