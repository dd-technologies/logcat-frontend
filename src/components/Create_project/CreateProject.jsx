import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Style from "./CreateProject.module.css";
import CustomCard from "../../Container/CustomCard";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
import {
  clearProjectData,
  getAllProject,
} from "../../redux/action/ProjectAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AddProjectModal from "./components/AddProjectModal";
import Spinner from "../../Container/Spinner";
import { adminLogout } from "../../redux/action/AdminAction";
import "../../utils/Theme.css";
import CustomeDropDown from "../../Container/DropDown";

function CreateProject() {
  const [modalShow, setModalShow] = useState(false);
  const [darkMode, setDarkMode] = React.useState(true);
  const [userInfo, setUserInfo] = useState(false);
  const Dispatch = useDispatch();
  const getAllProjectReducer = useSelector(
    (state) => state.getAllProjectReducer
  );
  const { allProjectData: ProjectData, allProjectData } = getAllProjectReducer;

  // GETTING USER NAME
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;

  const [avatar, setAvatar] = useState(
    adminInfo && adminInfo.image && adminInfo.image
  );

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
    if (!localStorage.getItem("ddAdminToken")) {
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

  const handlelogout = (e) => {
    e.preventDefault();
    Dispatch(adminLogout(navigate));
  };

  useEffect(() => {
    setDarkMode(!darkMode);
  }, []);

  const showUserInfoFun = () => {
    setUserInfo(!userInfo);
  };

  // @@ REMOVING PROJECT TYPE FROM LOCALHOST ----
  useEffect(() => {
    localStorage.removeItem("project_type");
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
                  className="darkModeColor"
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
                    top="14%"
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
                      className="darkModeColor"
                    >
                      {adminInfo && adminInfo.data && adminInfo.data.name}
                    </p>
                    <p
                      style={{
                        fontSize: "1rem",
                      }}
                      className="darkModeColor"
                    >
                      {adminInfo && adminInfo.data && adminInfo.data.email}
                    </p>

                    <section
                      style={{ border: "1px solid #fff", marginTop: "5px" }}
                      className={`${Style.logoutAccount} darkModeColor`}
                      onClick={(e) => {
                        handlelogout(e);
                      }}
                    >
                      Logout
                    </section>

                    <section className={Style.privacyPolicy}>
                      <p className="darkModeColor">Privacy policy</p>
                      <p className="darkModeColor">Terms of service</p>
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
                    <section
                      className={Style.addProject}
                      onClick={() => setModalShow(true)}
                    >
                      <section>
                        <p>
                          <FontAwesomeIcon icon={faPlus} />
                        </p>
                        <p className="darkModeColor">Add Project</p>
                      </section>
                    </section>
                  </CustomCard>
                  <AddProjectModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </Col>
              ) : null}

              {allProjectData &&
                allProjectData.data.data.length &&
                allProjectData.data.data.map((data) => (
                  <>
                    <ProjectCard data={data} key={data._id} />
                  </>
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
