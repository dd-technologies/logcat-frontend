import React,{useState, useEffect} from "react";
import "./App.module.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateProject from "./components/Create_project/CreateProject";
import LogTable from "./components/LogTable/LogTable";
import Analytics from "./components/Analytics/Analytics";
import NotFound from "./components/NotFound";
import Login from "./components/Auth/Login";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Protected from "./utils/Protected";
import Settings from "./components/Settings/Settings";
import { useSelector } from "react-redux";
import UpdateProfile from "./components/user/UpdateProfile";
import "./utils/Theme.css";
import Register from "./components/Auth/Register";
import Alarm from "./components/Alarm/Alarm";
import splash_screen2 from '../src/assets/images/Splash_screen2.gif'

function App() {
  const [splash, setSplash] = useState(true);
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  

  useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 3500);
  }, []);
  return (
    <>
      {
        splash?
          <div style={{display:"flex",height:"100vh", width:"100vw", justifyContent:"center", alignItems:'center'}}>
            <img style={{  width:"350px", height:'350px', alignContent:'center'}} src={splash_screen2} alt="loading..." />
          </div>
        :
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
          <Route exact path="/forgetPassword" element={<ForgetPassword />} />
          {/* Protected Route */}
          <Route element={<Protected/>}>
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
      }
    </>
  );
}

export default App;
