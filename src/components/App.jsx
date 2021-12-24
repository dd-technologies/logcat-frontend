import "./App.scss";
// import LogTable from "./LogTable/LogTable.jsx";
// import CreateProject from "./Create_project/CreateProject";
// import Analytics from "./Analytics/Analytics";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavSideBar from "../utils/NavSideBar";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/Analytics" component={Analytics} />
        <Route exact exact path="/" component={CreateProject} />
        <Route exact exact path="/home" component={LogTable} /> */}
        <Route exact exact path="/" component={NavSideBar} />
      </Switch>
    </Router>
  );
}

export default App;
