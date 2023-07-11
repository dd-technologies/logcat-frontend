import "../../index.css";
// import AppHeader from "./NavBar/Navbar";
// import SideMenu from "./Sidemenu/SideMenu";
// import Dashboard from "./Dashboard";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import CreateProject from "../projects/CreateProject";

function App() {
  return (
    <div className="App">
      {/* <AppHeader /> */}
      <Navbar/>
      <div className="SideMenuAndPageContent">
        {/* <SideMenu/> */}
        <SideBar/>
        <CreateProject/>
        {/* <Dashboard className="PageContent"/> */}
      </div>
    </div>
  );
}
export default App;