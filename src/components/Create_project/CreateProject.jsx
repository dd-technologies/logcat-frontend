import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch,
  faPlus,
  faCity,
  faHome,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import Style from "./CreateProject.module.scss";
import CustomCard from "../../Container/CustomCard";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import {
  clearProjectData,
  getAllProject,
} from "../../redux/action/ProjectAction";
// import AddProjectModal from "../utils/AddProjectModal";
// import SpinLoader from "../utils/SpinLoader";
// import ProjectCard from "../utils/ProjectCard";
import { useHistory } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

function CreateProject() {
  const [modal, setModal] = useState(false);
  const Dispatch = useDispatch();
  const getAllProjectReducer = useSelector(
    (state) => state.getAllProjectReducer
  );
  const { loading, allProjectData } = getAllProjectReducer;

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

  const navbardetail = {
    name: adminInfo.data.name,
    dashName: "Welcome",
    link1: {
      iconName: faHome,
      linkName: "Home",
      link: `/`,
    },
    link2: {
      iconName: faUserAlt,
      linkName: "Profile",
      link: `/`,
    },
  };
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("ddAdminToken")) {
      history.push("/");
    }
    Dispatch(getAllProject());
  }, []);

  const closeModal = () => {
    setModal(false);
  };
  return (
    <>
      <section className={Style.backgroundSection}></section>
      <Container className={Style.MainContantainer}>
        <p className={Style.para}>Your Projects</p>
        <Row>
          <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
            <CustomCard padding="10px" height="200px">
              <section className={Style.addProject}>
                <section>
                  <p>
                    <FontAwesomeIcon icon={faPlus} />
                  </p>
                  <p>Add Project</p>
                </section>
              </section>
            </CustomCard>
          </Col>

          {/* dynamic projects */}

          {/* <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
            <CustomCard padding="10px">
              <Row>
                <Col xl={12} className={Style.InfoColumn}>
                  <h4>Agva Advanced</h4>
                  <p>agva Advanced</p>
                </Col>
                <Col xl={12} className={Style.InfoDetails}>
                  <p>
                    <FontAwesomeIcon icon={faCodeBranch} />
                  </p>
                  <p>
                    <span>
                      <FontAwesomeIcon icon={faCity} />
                    </span>
                    agvaadvanced.com
                  </p>
                </Col>
              </Row>
            </CustomCard>
          </Col> */}
          {allProjectData &&
            allProjectData.data.data.length &&
            allProjectData.data.data.map((datas) => (
              <ProjectCard data={datas} />
            ))}
        </Row>
      </Container>
    </>
  );
}

export default CreateProject;
