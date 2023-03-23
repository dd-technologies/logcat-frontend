import React, { useState, useEffect, Fragment } from "react";
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Style from "../../css/CreateProject.module.css";
import CustomCard from "../../container/CustomCard";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "./Allprojects";
import {
  clearProjectData,
  getAllProject,
} from "../../store/action/ProjectAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AddProjectModal from "./model/AddProjectModal";
import Spinner from "../../container/Spinner";
import { adminLogout } from "../../store/action/AdminAction";
import CustomeDropDown from "../../container/DropDown";

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
            <Row>
              <Col
                xl={6}
                md={6}
                sm={12}
                className="mt-2 d-flex align-self-center"
              >
                <h5
                  style={{
                    color: "#fff",
                  }}
                >
                  Your Projects
                </h5>
              </Col>
              <Col
                xl={6}
                md={6}
                sm={12}
                className="mt-2 d-flex justify-content-end"
              >
                <section
                  className={`${Style.AvatarSection}`}
                  onClick={showUserInfoFun}
                >
                  {adminInfo &&
                    adminInfo.data &&
                    adminInfo.data.name.split(" ")[0].split("")[0]}
                </section>
                {userInfo && (
                  <CustomeDropDown
                    position="fixed"
                    right="0%"
                    top="10%"
                    width="400px"
                    zIndex="10"
                    marginRight="10px"
                  >
                    <section
                      className={Style.AvatarSectionDropDown}
                      onClick={showUserInfoFun}
                    >
                      {avatar ? (
                        <img src={URL.createObjectURL(avatar)} alt="Avatar" />
                      ) : (
                        adminInfo &&
                        adminInfo.data &&
                        adminInfo.data.name.split(" ")[0].split("")[0]
                      )}
                    </section>

                    <p
                      style={{
                        fontSize: "1.3rem",
                      }}
                    >
                      {adminInfo && adminInfo.data && adminInfo.data.name}
                    </p>
                    <p
                      style={{
                        fontSize: "1rem",
                      }}
                    >
                      {adminInfo && adminInfo.data && adminInfo.data.email}
                    </p>
                   {/* Logout method in navbar */}
                    <section
                      style={{ border: "1px solid #fff", marginTop: "5px" }}
                      className={`${Style.logoutAccount} darkModeColor`}
                      onClick={(e) => {
                        handlelogout(e);
                      }}
                    >
                      Logout
                    </section>
                  {/*Navbar section  */}
                    <section className={Style.privacyPolicy}>
                      <p>Privacy policy</p>
                      <p>Terms of service</p>
                    </section>
                  </CustomeDropDown>
                )}
              </Col>
            </Row>
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
                          <FontAwesomeIcon icon={faPlus} />
                        </p>
                        <p>Add Project</p>
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
      )
    </>
  );
}

export default CreateProject;
