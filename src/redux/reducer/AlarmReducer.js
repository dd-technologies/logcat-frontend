import {
  ALARM_FAIL,
  ALARM_REQUEST,
  ALARM_SUCSESS,
} from "../types/AlarmConstants";

export const alarmReducer = (state = {}, action) => {
  switch (action.type) {
    case ALARM_REQUEST:
      return {
        loading: true,
      };
    case ALARM_SUCSESS:
      return {
        loading: false,
        data: action.payload,
      };
    case ALARM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
