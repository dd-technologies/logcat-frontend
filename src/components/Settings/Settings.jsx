import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Navbar, SideBar } from "../../utils/NavSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import LogICon from "../../assets/icons/log.png";
import Style from "./Settings.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Settings() {
  // CHIP CREATING STATE EMAIL
  const [chipState, setChipState] = useState({
    items: [],
    value: "",
    error: null,
  });

  // CHIP CREATING STATE PROJECT
  const [chipStateProject, setChipStateProject] = useState({
    items: [],
    value: "",
    error: null,
  });

  const [projectChip, setprojectChip] = useState("");

  // SLIDEWINDOW STATE
  const slideWindowReducer = useSelector((state) => state.slideWindowReducer);
  const { data } = slideWindowReducer;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");

  // NAVIGATION MENU HERE
  const navdetails = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: faDatabase,
      linkName: "Logs",
    },
    link2: {
      iconName: faDatabase,
      linkName: "Settings",
    },
  };

  const sidebarDetails = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: LogICon,
      linkName: "Logs",
      link: `/logtable?code=${code}&name=${projectName}&pagename=logpage`,
    },
    link2: {
      iconName: `/assets/icons/settings.png`,
      linkName: "Settings",
    },
  };

  //   EMAIL CHIPS --------------------------------------------------------------------------------------------------

  //   HANDLE KEYDOWN FUNCTION
  const handleKeyDownEmail = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      setChipState({
        items: [...chipState.items, chipState.value],
        value: "",
      });
    }
  };

  //   HANDLE CHANG FUNCTION
  const handleChangeEmail = (evt) => {
    setChipState({
      ...chipState,
      value: evt.target.value,
      error: null,
    });
  };

  const hanldeOndeleteEmail = (item) => {
    setChipState({
      ...chipState,
      items: chipState.items.filter((i) => i !== item),
    });
  };

  //   -----------------------------------------------------------------------------------------------------------------

  //   PROJECT TYPE CHIPS --------------------------------------------------------------------------------------------------

  //   HANDLE KEYDOWN FUNCTION
  const handleKeyDownPorject = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = chipStateProject.value.trim();

      if (value) {
        setChipStateProject({
          ...chipStateProject,
          items: [...chipStateProject.items, chipStateProject.value],
          // ...chipStateProject,
          value: "",
        });
      }
    }
  };

  //   HANDLE CHANG FUNCTION
  const handleChangeProject = (evt) => {
    setChipStateProject({
      ...chipStateProject,
      value: evt.target.value,
      error: null,
    });
  };

  const hanldeOndeleteProject = (item) => {
    setChipStateProject({
      items: chipStateProject.items.filter((i) => i !== item),
    });
  };

  //   -----------------------------------------------------------------------------------------------------------------

  return (
    <>
      <Row>
        <Col
          xl={2}
          lg={2}
          md={2}
          sm={2}
          style={{ padding: "0px" }}
          className={data.show && `${Style.SidebarLogTable}`}
        >
          <SideBar sidebarDetails={sidebarDetails} />
        </Col>
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          style={{ padding: "0px" }}
          className={data.show && `${Style.NavbarLogTable}`}
        >
          <Navbar navdetails={navdetails} />
          <Container
            className={
              data.show
                ? Style.LogtableContaininer
                : Style.LogtableContaininerWithoutSlide
            }
          >
            {/* SETTGINS COMPONENTS */}
            <Row>
              <Col xl={6} md={6} sm={12}>
                <h4 className={Style.headingText}>Update project</h4>
                <div className={`${Style.imputFields} mt-4`}>
                  <input
                    type="email"
                    className="form-control LoginForminput "
                    id="exampleInputEmail1"
                    placeholder="Project Name"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className={`${Style.imputFields} mt-4`}>
                  <textarea
                    placeholder="Project Discription"
                    rows="4"
                    cols="50"
                  />
                </div>

                <Button
                  style={{ fontWeight: 700 }}
                  type="submit"
                  className="mt-4"
                >
                  Save Changes
                </Button>
              </Col>
              <Col xl={6} md={6} sm={12}>
                <h4 className={Style.headingText}>Add a project type</h4>
                <div className={`${Style.imputFields} mt-4`}>
                  <input
                    type="email"
                    className="form-control LoginForminput "
                    id="exampleInputEmail1"
                    placeholder="Project Name"
                    aria-describedby="emailHelp"
                    value={chipStateProject.value}
                    onKeyDown={handleKeyDownPorject}
                    onChange={handleChangeProject}
                  />
                </div>
                {/* CHIP SECTION */}

                <section className={Style.chipouter}>
                  {chipStateProject.items &&
                    chipStateProject.items.map((items) => {
                      return (
                        <>
                          <section className={Style.chip}>
                            <p style={{ color: "#fff" }} className="m-2">
                              {items}
                            </p>
                            <FontAwesomeIcon
                              icon={faWindowClose}
                              onClick={() => hanldeOndeleteProject(items)}
                            />
                          </section>
                        </>
                      );
                    })}
                </section>

                <Button
                  style={{ fontWeight: 700 }}
                  type="submit"
                  className="mt-4"
                >
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Container>
          <div className={Style.hrLine}></div>

          {/* CRASH FORWARDING */}
          <Container
            className={
              data.show
                ? Style.LogtableContaininer
                : Style.LogtableContaininerWithoutSlide
            }
          >
            <Row>
              <Col xl={6} md={6} sm={12}>
                <h4 className={Style.headingText}>Crash forwarding</h4>
                <div className={`${Style.imputFields} mt-4`}>
                  <input
                    type="email"
                    className="form-control LoginForminput "
                    id="exampleInputEmail1"
                    placeholder="email"
                    value={chipState.value}
                    aria-describedby="emailHelp"
                    onKeyDown={handleKeyDownEmail}
                    onChange={handleChangeEmail}
                  />
                </div>
                {/* CHIP SECTION */}
                <section className={Style.chipouter}>
                  {chipState.items &&
                    chipState.items.map((items) => {
                      return (
                        <>
                          <section className={Style.chip}>
                            <p style={{ color: "#fff" }} className="m-2">
                              {items}
                            </p>
                            <FontAwesomeIcon
                              icon={faWindowClose}
                              onClick={() => hanldeOndeleteEmail(items)}
                            />
                          </section>
                        </>
                      );
                    })}
                </section>

                <Button
                  style={{ fontWeight: 700 }}
                  type="submit"
                  className="mt-4"
                >
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
}
