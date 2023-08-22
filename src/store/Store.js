
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ADMIN_LOGOUT } from "./types/AdminConstants";
import {liveDataReducer} from "./reducer/LiveDataReducer"
import {
  adminLoginReducer,
  adminRegisterReducer,
  forgetPasswordReducer,
  resetPasswordReducer,
} from "./reducer/AdminReducer";
import { allhospitalNameReducer ,allCountryStateReducer, allStateReducer} from "./reducer/HospitalNameReducer";
import {
  getAllProjectReducer, getAllLogByCodeReducer, createNewProjectReducer, getLogCountsReducer, getLogCountsByDateReducer, getErrorWRTOSReducer, getErrorWRTVersionReducer, getDeviceInfoReducer,
  getLogMsgOccurenceWRTDateReducer, getCrashFreeUsersReducer, getCrashAnalyticsDataReducer, getCrashFreeUsersDataReducer, getModelCodeReducer, addCrashEmailReducer, getProjectByCodeSettingReducer,
} from "./reducer/ProjectReducer";
import { passwordChangeReducer, userInfoReducer } from "./reducer/UserProfileReducer";
import {deviceReducer,getAllAboutByDeviceIdReducer,getAllEventsByDeviceIdReducer,getRegisteredDetailsReducer,getAllAlarmsByDeviceIdReducer,getAllTrendsByDeviceIdReducer,getCalibrationByDeviceIdReducer,getAllLogsByDeviceIdReducer,getLogMsgOccurenceReducer,getDeviceCrashAnalyticsDataReducer,getDeviceLogMsgOccurenceWRTDateReducer} from "./reducer/deviceReducer";
import { alarmReducer } from "./reducer/AlarmReducer";
import {dispatchAllDetailsReducer,dispatchAllDetailsByIdReducer}from "./reducer/DispatchDevices"
import { updateUserInfoReducer } from "./reducer/UpdateUserInfoReducer"
import { getAllDeviceLogsReducer } from "./reducer/ProjectReducer";
import {eventReducer} from "./reducer/EventReducer";
import {allUsersDetailsReducer,updateAllUsersDetailReducer,dashboardDataDefault,deviceActionReducer,deviceDeleteReducer} from "./reducer/AdminDashboardReducer"
const appReducer = combineReducers({
  adminLoginReducer,
  adminRegisterReducer,
  allhospitalNameReducer,
  allCountryStateReducer,
  allStateReducer,
  forgetPasswordReducer,
  resetPasswordReducer,
  liveDataReducer,
  getAllProjectReducer,
  getAllLogByCodeReducer,
  createNewProjectReducer,
  getLogCountsReducer,
  getLogCountsByDateReducer,
  getModelCodeReducer,

  getErrorWRTOSReducer,
  getErrorWRTVersionReducer,
  getDeviceInfoReducer,

  getLogMsgOccurenceWRTDateReducer,
  getCrashFreeUsersReducer,
  getCrashAnalyticsDataReducer,
  getCrashFreeUsersDataReducer,

  passwordChangeReducer,
  updateAllUsersDetailReducer,
  dashboardDataDefault,
  deviceActionReducer,
  deviceDeleteReducer,
  getAllAboutByDeviceIdReducer,
  addCrashEmailReducer,
  getProjectByCodeSettingReducer,
  alarmReducer,
  deviceReducer,
  userInfoReducer,
  updateUserInfoReducer,
  allUsersDetailsReducer,
  eventReducer,
  getAllDeviceLogsReducer,
  getAllEventsByDeviceIdReducer,
  getAllAlarmsByDeviceIdReducer,
  getAllTrendsByDeviceIdReducer,
  getCalibrationByDeviceIdReducer,
  getAllLogsByDeviceIdReducer,
  getRegisteredDetailsReducer,
  getLogMsgOccurenceReducer,
  getDeviceCrashAnalyticsDataReducer,
  getDeviceLogMsgOccurenceWRTDateReducer,
  dispatchAllDetailsReducer,
  dispatchAllDetailsByIdReducer
});

const persistConf = {
  key: "root",
  storage,
};

const rootReducer = (state, action) => {
  if (action.type == ADMIN_LOGOUT) {
    // for all keys defined in your persistConfig(s)
    storage.removeItem("persist:root");
    // storage.removeItem('persist:otherKey')

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
const persistedReducer = persistReducer(persistConf, rootReducer);

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
export default store;