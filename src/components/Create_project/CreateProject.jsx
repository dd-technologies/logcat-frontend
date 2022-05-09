import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Style from "./CreateProject.module.css";
import CustomCard from "../../Container/CustomCard";
import { Button, Row, Col, Container } from "react-bootstrap";
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

function CreateProject() {
  const [modalShow, setModalShow] = useState(false);
  const [darkMode, setDarkMode] = React.useState(true);
  const Dispatch = useDispatch();
  const getAllProjectReducer = useSelector(
    (state) => state.getAllProjectReducer
  );
  const { allProjectData: ProjectData, allProjectData } = getAllProjectReducer;

  // GETTING USER NAME
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;

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

  return (
    <>
      {/*Logout functionality */}
      {ProjectData && ProjectData.data && ProjectData.data.data ? (
        <>
          <section className={Style.backgroundSection}></section>
          <Container className={Style.MainContantainer}>
            <Row>
              <Col xl={6} md={6} sm={12} className="mt-2">
                <h5 className="darkModeColor" style={{ color: "#fff" }}>
                  Your Projects
                </h5>
              </Col>
              <Col xl={6} md={6} sm={12} className="mt-2">
                <section
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <p className="mx-2 darkModeColor" style={{ color: "#fff" }}>
                    {adminInfo.data.name}
                  </p>
                  <Button
                    onClick={(e) => {
                      handlelogout(e);
                    }}
                  >
                    Logout
                  </Button>
                </section>
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
