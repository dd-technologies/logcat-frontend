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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AddProjectModal from "./model/AddProjectModal";
import Spinner from "../../container/Spinner";
import dispatch from "../../assets/icons/dispatch.png"
import dispatchList from "../../assets/icons/dispatchList.png"

const cookies = new Cookies();

function CreateProject() {
  const [modalShow, setModalShow] = useState(false);
  const Dispatch = useDispatch();
  const getAllProjectReducer = useSelector(
    (state) => state.getAllProjectReducer
  );
  const { allProjectData: ProjectData, allProjectData } = getAllProjectReducer;
  console.log('allProjectData', allProjectData)

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
            <div className="dashboard" style={{ position: "absolute", left: "1rem" }}>
            </div>
            <Row className="rowSection">
              {adminInfo && adminInfo.data && adminInfo.data.userType === "Admin" ? (
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
                          <FontAwesomeIcon icon={faPlus} bounce style={{ color: "#cb297b", }} />
                        </p>
                        <p style={{ color: "#707070" }}>Add Project</p>
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
              {adminInfo && adminInfo.data && adminInfo.data.userType === "Dispatch" ?
                <>
                  <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
                    <CustomCard
                      padding="15px"
                      height="200px"
                      boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
                    >
                      <Link
                        to="/dispatchDevice"
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="project-cart"
                          style={{
                            backgroundColor: "white",
                            padding: "2rem",
                            borderRadius: "5px",
                            width: "25rem",
                          }}
                        >
                          <div className="d-flex" style={{ gap: "5rem" }}>
                            <img
                              src={dispatch}
                              style={{ height: "5rem" }}
                              alt="AgvaVenti"
                            />
                            <div
                              className="d-flex"
                              style={{
                                gap: "1rem",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <div>
                                <h6 style={{ color: "#707070", fontSize: "1.5rem" }}>
                                  Dispatch
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </CustomCard>

                  </Col>
                  <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
                    <CustomCard
                      padding="15px"
                      height="200px"
                      boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
                    >
                      <Link
                        to="/allDispatchDeviceData"
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="project-cart"
                          style={{
                            backgroundColor: "white",
                            padding: "2rem",
                            borderRadius: "5px",
                            width: "25rem",
                          }}
                        >
                          <div className="d-flex" style={{ gap: "5rem" }}>
                            <img
                              src={dispatchList}
                              style={{ height: "5rem" }}
                              alt="AgvaVenti"
                            />
                            <div
                              className="d-flex"
                              style={{
                                gap: "1rem",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <div>
                                <h6 style={{ color: "#707070", fontSize: "1.5rem" }}>
                                  Dispatch Data
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </CustomCard>

                  </Col>
                </> :
                allProjectData &&
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
