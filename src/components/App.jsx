import "./App.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateProject from "./Create_project/CreateProject";
import LogTable from "./LogTable/LogTable";
import Analytics from "./Analytics/Analytics";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/analytics" component={Analytics} />
        <Route exact path="/logtable" component={LogTable} />
        <Route exact path="/" component={CreateProject} />
      </Switch>
    </Router>
  );
}

export default App;
