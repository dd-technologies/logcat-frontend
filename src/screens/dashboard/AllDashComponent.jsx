import "../../index.css";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import CreateProject from "../projects/CreateProject";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="SideMenuAndPageContent">
        <SideBar/>
        <CreateProject/>
      </div>
    </div>
  );
}
export default App;