import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/project/home/Home";
import CreateProject from "./components/project/home/Create_project/CreateProject";

function App() {
  return (
    <>
      <Router>
        {/* <Navbarr /> */}
        <Switch>
          {/* <Route exact path="/" component={Login} /> */}
          {/* <Route exact path="/register" component={SignUp} /> */}
          {/* <Route exact path='/home' component={Home} /> */}
          {/* <Route exact path="/logTable" component={LogTable} /> */}
          {/* <Route exact path="/newlogTable" component={NewLogTable} /> */}
          {/* <Route exact path="/newlogTable" component={LogTable} /> */}
          {/* <Route exact path="/customPagination" component={CustomPagination} /> */}
          {/* <Route exact path="/analytics" component={Analytics} /> */}

          {/*forgetpassword*/}
          {/* <Route path="/forgetPassword" component={FrogotPassowrd} /> */}

          {/*resetPassword*/}
          {/* <Route path="/resetPassword" component={ResetPassword} /> */}

          stack trace page
          {/* <Route path="/stackError" component={StackError} /> */}
          <Route path="/" component={Home} />

          {/* <Protected exact path="/home" Component={Home} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
