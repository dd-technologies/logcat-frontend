import Style from "./App.module.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import { useEffect, useState } from "react";

function App() {
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  var colors = JSON.parse(localStorage.getItem("darkMood"))
    ? "#1A2035"
    : "#e3e7ee3a";
  var [backGroundCOlor, setBackgroundColor] = useState(colors);
  return (
    <>
      <style>{"body {background-color:" + backGroundCOlor + "}"}</style>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/resetpassword" component={ResetPassword} />
          <Route exact path="/forgetPassword" component={ForgetPassword} />
          <Protected exact path="/home" component={CreateProject} />
          <Route exact path="/logtable" component={LogTable} />
          <Route exact path="/analytics" component={Analytics} />
          <Route exact path="/update" component={UpdateProfile} />
          {adminInfo && adminInfo.data && adminInfo.data.isSuperAdmin && (
            <Route exact path="/settings" component={Settings} />
          )}
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
