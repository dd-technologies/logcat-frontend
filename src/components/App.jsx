import "./App.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Analytics from "./Analytics/Analytics";
import CreateProject from "./Create_project/CreateProject";
import LogTable from "./LogTable/LogTable";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/Analytics" component={Analytics} />
        <Route exact exact path="/" component={CreateProject} />
        <Route exact exact path="/home" component={LogTable} />
      </Switch>
    </Router>
  );
}

export default App;
