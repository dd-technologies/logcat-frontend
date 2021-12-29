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
import { useHistory } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import AddProjectModal from "./components/AddProjectModal";
import Spinner from "../../Container/Spinner";
import { adminLogout } from "../../redux/action/AdminAction";

function CreateProject() {
  const [modalShow, setModalShow] = useState(false);
  // project data load or not

  const Dispatch = useDispatch();
  const getAllProjectReducer = useSelector(
    (state) => state.getAllProjectReducer
  );
  const {
    allProjectData: PorjectData,
    loading,
    allProjectData,
  } = getAllProjectReducer;
  // console.log("PorjectData", PorjectData);

  // GETTGIN THE USER NAME TO PUT IN DOCUMENT
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;

  // console.log("adminInfo", adminInfo);

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

  const handlelogout = (e) => {
    e.preventDefault();
    Dispatch(adminLogout(history));
  };

  return (
    <>
      {/* user name with logout functionalty */}
      {PorjectData && PorjectData.data && PorjectData.data.data ? (
        <>
          <section className={Style.backgroundSection}></section>
          <Container className={Style.MainContantainer}>
            <Row>
              <Col
                xl={12}
                className="d-flex justify-content-end align-items-center"
              >
                <p className="px-2">{adminInfo.data.name}</p>
                <Button
                  onClick={(e) => {
                    handlelogout(e);
                  }}
                >
                  Logout
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <p className={Style.para}>Your Projects</p>
              </Col>
              <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
                <CustomCard padding="10px" height="200px">
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
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
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
      ) : (
        <Spinner />
      )}
      )
    </>
  );
}

export default CreateProject;
