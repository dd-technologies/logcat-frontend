import React, { useState, useEffect, Fragment } from "react";
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Style from "../../css/CreateProject.module.css";
import CustomCard from "../../container/CustomCard";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "./Allprojects";
import {
  clearProjectData,
  getAllProject,
} from "../../store/action/ProjectAction";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AddProjectModal from "./model/AddProjectModal";
import Spinner from "../../container/Spinner";
import { adminLogout } from "../../store/action/AdminAction";
import CustomeDropDown from "../../container/DropDown";
import Add from "../../assets/images/add.png"

const cookies = new Cookies();

function CreateProject() {
  const [modalShow, setModalShow] = useState(false);
  const [darkMode, setDarkMode] = React.useState(true);
  const [userInfo, setUserInfo] = useState(false);
  const Dispatch = useDispatch();
  const getAllProjectReducer = useSelector(
    (state) => state.getAllProjectReducer
  );
  const { allProjectData: ProjectData, allProjectData } = getAllProjectReducer;
  console.log('allProjectData',allProjectData)

  // GETTING USER NAME
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;

  const avatar = useState(
    adminInfo && adminInfo.image && adminInfo.image
  )[0];

  const createNewProjectReducer = useSelector(
    (state) => state.createNewProjectReducer
  );
  const { data } = createNewProjectReducer;
  if (data && data.data) {
    toast.success("Project Created Successfully");
    Dispatch(clearProjectData());
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.get('ddAdminToken')) {
      navigate("/");
    }
    if (localStorage.getItem("project_type")) {
      localStorage.removeItem("project_type");
    }
    if (localStorage.getItem("selected_date")) {
      localStorage.removeItem("selected_date");
    }
    Dispatch(getAllProject());
  }, []);
// Logout function
  const handlelogout = (e) => {
    e.preventDefault();
    Dispatch(adminLogout(navigate));
  };

  // useEffect(() => {
  //   setDarkMode(!darkMode);
  // }, []);

  const showUserInfoFun = () => {
    setUserInfo(!userInfo);
  };

  // @@ REMOVING PROJECT TYPE FROM LOCALHOST ----
  useEffect(() => {
    localStorage.removeItem("project_type");
    localStorage.removeItem("page_no");
  }, []);

  return (
    <>
      {/*Logout functionality */}
      {ProjectData && ProjectData.data && ProjectData.data.data ? (
        <>
          <section className={Style.backgroundSection}></section>  
          <Container className={Style.MainContantainer}>
            <div className="dashboard" style={{position:"absolute", left:"1rem"}}>
            </div>
            <Row className="rowSection">
              {adminInfo && adminInfo.data && adminInfo.data.isSuperAdmin ? (
                <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
                  <CustomCard
                    padding="10px"
                    height="200px"
                    boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
                  >
                    {/* Shows add project section */}
                    <section
                      className={Style.addProject}
                      onClick={() => setModalShow(true)}
                    >
                      <section>
                        <p>
                          <FontAwesomeIcon icon={faPlus} bounce style={{color: "#cb297b",}} />
                        </p>
                        <p style={{color:"#707070"}}>Add Project</p>
                      </section>
                    </section>
                  </CustomCard>
                  <AddProjectModal
                    show={modalShow} //shows modal of create project
                    onHide={() => setModalShow(false)}
                  />
                </Col>
              ) : null}
              {/*maps other project data in the project section  */}
              {allProjectData &&
                allProjectData.data.data.length &&
                allProjectData.data.data.map((data, i) => (
                  <Fragment key={i}>
                    <ProjectCard data={data} />
                  </Fragment>
                ))}
            </Row>
          </Container>
        </>
      ) : (
        <Spinner />
      )}
      
    </>
  );
}

export default CreateProject;
