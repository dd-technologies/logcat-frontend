import "./App.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Analytics from "./Analytics/Analytics";
import CreateProject from "./Create_project/CreateProject";
import LogTable from "./LogTable/LogTable";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/analytics" component={Analytics} />
        <Route exact exact path="/logtable" component={LogTable} />
        <Route exact exact path="/" component={CreateProject} />
      </Switch>
    </Router>
  );
}

export default App;
