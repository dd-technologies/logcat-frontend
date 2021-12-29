import "./App.module.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateProject from './components/Create_project/CreateProject'
import LogTable from './components/LogTable/LogTable'
import Analytics from './components/Analytics/Analytics';
import NotFound from './components/NotFound';
import Login from './components/Auth/Login';
import ResetPassword from "./components/Auth/ResetPassword";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Protected from "./utils/Protected";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route exact path="/forgetPassword" component={ForgetPassword} />
        <Protected exact path="/home" component={CreateProject} />
        <Route exact path="/logtable" component={LogTable} />
        <Route exact path="/analytics" component={Analytics} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
