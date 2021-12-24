import logo from "./logo.svg";
import "./App.scss";
import Home from "./components/project/home/Home";
import CreateProject from "./components/project/home/Create_project/CreateProject";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Analytics from "./components/project/Analytics/Analytics";

function App() {
  return (
    <>


      {/* <Home /> */}
      {/* <CreateProject /> */}
      <Analytics />


      <Router>


        <Switch>
          <Route path='/createProject' components={CreateProject} />
          <Route exact path="/" Component={Home} />
        </Switch>

      </Router>
    </>
  );
}

export default App;
