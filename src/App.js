import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/project/home/Home";
import CreateProject from "./components/project/home/Create_project/CreateProject";
import Analytics from "./components/project/Analytics/Analytics";

function App() {
  return (
    <>
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
