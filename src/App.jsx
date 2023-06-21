import React, { useState, useEffect } from "react";
import "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import CreateProject from "./screens/projects/CreateProject";
import LogTable from "./screens/logs/LogTable";
import Analytics from "./screens/analytics/Analytics";
import NotFound from "./screens/NotFound";
import Login from "./screens/auth/Login";
import ResetPassword from "./screens/auth/ResetPassword";
import ForgetPassword from "./screens/auth/ForgetPassword";
import Protected from "./utils/Protected";
import Settings from "./screens/settings/Settings";
import { useSelector } from "react-redux";
import UpdateProfile from "./screens/user/UpdateProfile";
import Register from "./screens/auth/Register";
import AlarmNew from "./screens/alerts/AlertsNew";
import Event from "./screens/events/Event";
import Device from "./screens/device/Device"
import ddLoader from "../src/assets/images/ddLoader.gif";
import "./css/Theme.css"
import DeviceLogs from "./screens/device/DeviceLogs";
import Alarms from "./screens/device/components/table/Alarms";
import DeviceAnalytics from "./screens/deviceAnalytics/DeviceAnalytics";
import AllDashComponent from "../src/screens/dashboard/AllDashComponent"
import DeviceOverview from "./screens/device/DeviceOverview";
import About from "./screens/device/About";
import Services from "./screens/device/Services";
import PrivacyPolicy from "./utils/PrivacyPolicy";
import TermsOfServices from "./utils/TermsOfServices";
import { Navbar } from "./utils/NavBar";
import AdminDashboard from "./screens/AdminDashboard/AdminDashboard";
import Live from "./screens/device/Live";
import ManageUsers from "./screens/AdminDashboard/ManageUsers";
// import Navbar from "./screens/dashboard/NavBar/Navbar";
function App() {
  const [splash, setSplash] = useState(true);
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 1500);
  }, []);

  return (
    <>
      {splash ? (
        <div
          style={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "300px", height: "300px", alignContent: "center" }}
            src={ddLoader}
            alt="loading..."
          />
        </div>
      ) : (
        <BrowserRouter>
        {/* <Navbar/> */}
        {/* <Navbar/> */}
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/resetpassword" element={<ResetPassword />} />
            <Route exact path="/forgetPassword" element={<ForgetPassword />} />
            {/* Protected Route */}
            <Route element={<Protected />}>
            <Route exact path="/home" element={<AllDashComponent/>}/>
              {/* <Route exact path="/home" element={<CreateProject/>} /> */}
              <Route exact path="/log_table" element={<LogTable />}/>
              <Route exact path="/analytics" element={<Analytics />}/>
              <Route exact path="/update" element={<UpdateProfile />} />
              <Route exact path="/alarm" element={<AlarmNew />}/>
              <Route exact path="/events" element={<Event/>}/>
              <Route exact path="/device" element={<Device/>}/>
              <Route exact path="/deviceOverview" element={<DeviceOverview/>}/>
              <Route exact path="/about" element={<About/>}/>
              <Route exact path="/service" element={<Services/>}/>
              <Route exact path="/deviceEvents" element={<DeviceLogs/>}/>
              <Route exact path="/deviceAlerts" element={<Alarms/>}/>
              <Route exact path="/deviceAnalytics" element={<DeviceAnalytics/>}/>
              <Route exact path="/privacyPolicy" element={<PrivacyPolicy/>}/>
              <Route exact path="/termsOfServices" element={<TermsOfServices/>}/>
              <Route exact path="/navBar" element={<Navbar />} />
              <Route exact path="/live" element={<Live />} />
              {adminInfo && adminInfo.data && adminInfo.data.userType ==="Admin"?(
                <Route exact path="/settings" element={<Settings />}/>
              ):""}
              {adminInfo && adminInfo.data && adminInfo.data.userType ==="Admin"?(
                <>
                <Route exact path="/adminDashboard" element={<AdminDashboard />}/>
                <Route exact path="/manageUsers" element={<ManageUsers />}/>
                </>
              ):""}
            </Route>
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
