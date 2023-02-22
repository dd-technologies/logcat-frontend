/* eslint-disable */

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ADMIN_LOGOUT } from "./types/AdminConstants";

import {
  adminLoginReducer,
  adminRegisterReducer,
  forgetPasswordReducer,
  resetPasswordReducer,
} from "./reducer/AdminReducer";

import {
  getAllProjectReducer, getAllLogByCodeReducer, createNewProjectReducer, getLogCountsReducer, getLogCountsByDateReducer, getErrorWRTOSReducer, getErrorWRTVersionReducer, getDeviceInfoReducer,
  getLogMsgOccurenceWRTDateReducer, getCrashFreeUsersReducer, getCrashAnalyticsDataReducer, getCrashFreeUsersDataReducer, getModelCodeReducer, addCrashEmailReducer, getProjectByCodeSettingReducer,
} from "./reducer/ProjectReducer";
import { passwordChangeReducer, userInfoReducer } from "./reducer/UserProfileReducer";
import {deviceReducer,getAllLogByDeviceIdReducer} from "./reducer/deviceReducer"
import { alarmReducer } from "./reducer/AlarmReducer";
import { updateUserInfoReducer } from "./reducer/UpdateUserInfoReducer"
// import {
//   getAllDeviceReducer,
//   registerNewDeviceReducer,
// }from "./reducer/DeviceReducer"
import {eventReducer} from "./reducer/EventReducer";
const appReducer = combineReducers({
  adminLoginReducer,
  adminRegisterReducer,
  forgetPasswordReducer,
  resetPasswordReducer,

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

  addCrashEmailReducer,
  getProjectByCodeSettingReducer,
  alarmReducer,
  deviceReducer,
  userInfoReducer,
  updateUserInfoReducer,
  eventReducer,

  // getAllDeviceReducer,
  // registerNewDeviceReducer,
  getAllLogByDeviceIdReducer,
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
