import "./App.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateProject from "./Create_project/CreateProject";
import LogTable from "./LogTable/LogTable";
import Analytics from "./Analytics/Analytics";
import NotFound from "./NotFound";
import Login from "./Auth/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/analytics" component={Analytics} />
        <Route exact path="/logtable" component={LogTable} />
        <Route path="/project" component={CreateProject} />
        <Route exact path="/" component={Login} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
