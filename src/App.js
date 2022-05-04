import React from "react";
import "./App.module.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateProject from "./components/Create_project/CreateProject";
import LogTable from "./components/LogTable/LogTable";
import Analytics from "./components/Analytics/Analytics";
import NotFound from "./components/NotFound";
import Login from "./components/Auth/Login";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgetPassword from "./components/Auth/ForgetPassword";
// import {Protected} from './utils/Protected'
import ProtectedRoute from "./utils/Protected"
import Settings from "./components/Settings/Settings";
import { useSelector } from "react-redux";
import UpdateProfile from "./components/user/UpdateProfile";
import "./utils/Theme.scss";
import Register from "./components/Auth/Register";
import Alarm from "./components/Alarm/Alarm";

function App() {
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
          <Route exact path="/forgetPassword" element={<ForgetPassword />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute/>}>

            <Route exact path="/home" element={<CreateProject />} />
            <Route exact path="/logtable" element={<LogTable />} />
            <Route exact path="/analytics" element={<Analytics />} />
            <Route exact path="/update" element={<UpdateProfile />} />
            <Route exact path="/alarm" element={<Alarm />} />
            {adminInfo && adminInfo.data && adminInfo.data.isSuperAdmin && (
              <Route exact path="/settings" element={<Settings />} />
            )}
            
          </Route>
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
