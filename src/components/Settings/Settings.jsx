import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Navbar, SideBar } from "../../utils/NavSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import LogICon from "../../assets/icons/log.png";
import Style from "./Settings.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addCrashEmail,
  getProjectByCodeSetting,
} from "../../redux/action/ProjectAction";
import Spinner from "../../Container/Spinner";

export default function Settings() {
  // dark mood state

  const [darkMood, setDarkMood] = useState(
    JSON.parse(localStorage.getItem("darkMood"))
  );

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");

  const getAllProjectReducer = useSelector(
    (state) => state.getAllProjectReducer
  );

  const addCrashEmailReducer = useSelector(
    (state) => state.addCrashEmailReducer
  );

  const getProjectByCodeSettingReducer = useSelector(
    (state) => state.getProjectByCodeSettingReducer
  );
  const { loading: ld, data: dt } = getProjectByCodeSettingReducer;

  console.log(`add email: ${dt}`);

  const { loading: lnd, data: dat } = addCrashEmailReducer;
  console.log(`crash email: ${dat && dat.reportEmail}`);

  const {
    allProjectData: PorjectData,
    loading,
    allProjectData,
  } = getAllProjectReducer;

  let dataObj;
  allProjectData &&
    allProjectData.data &&
    allProjectData.data.data.map((dt, idx) => {
      if (dt.code === code) {
        dataObj = dt;
      }
    });

  const dispatch = useDispatch();

  // CHIP CREATING STATE EMAIL
  const [chipState, setChipState] = useState({
    items: [...dataObj.reportEmail],
    value: "",
    error: null,
  });

  const [emailstate, setEmail] = useState({
    email: "",
    error: null,
  });
  const [emailList, setEmailList] = useState([...dataObj.reportEmail]);

  let deviceTypeArray = dataObj.device_types.map((type) => type.typeName);

  // Email error state
  const [emailError, setEmailError] = useState();

  // CHIP CREATING STATE PROJECT
  const [chipStateProject, setChipStateProject] = useState({
    items: [...deviceTypeArray],
    value: "",
    error: null,
  });

  // Project name and description state
  const [nameAndDesc, setNameAndDesc] = useState({
    name: dt && dt.data.name,
    desc: dt && dt.data.description,
  });

  const [projectChip, setprojectChip] = useState("");

  var dataOf;

  // SLIDEWINDOW STATE
  const slideWindowReducer = useSelector((state) => state.slideWindowReducer);
  const { data } = slideWindowReducer;

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
      iconName: null,
      linkName: null,
      link: "",
    },
    link2: {
      iconName: `/assets/icons/settings.png`,
      linkName: "Settings",
    },
  };

  //   EMAIL CHIPS --------------------------------------------------------------------------------------------------

  const validateEmail = (email) => {
    console.log("input chip validate");
    if (!email) {
      setEmailError("Please enter your email Id");

      console.log("email validate function " + emailError);
      return false;
    }

    if (email.length) {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        // console.log("patern test " + pattern.test(email));
        setEmailError("Please enter valid email address.");
        return false;
      }
    }

    // console.log("LoginFormState", loginForm);

    setEmailError(null);
    return true;
  };

  //   HANDLE KEYDOWN FUNCTION
  const handleKeyDownEmail = (evt) => {
    if (["Enter", "Tab", ",", " "].includes(evt.key)) {
      evt.preventDefault();
      setEmail({ ...emailstate, error: null });
      let inputChips = emailstate.email.trim();
      console.log(`input chip: ${inputChips}`);
      const emailValid = validateEmail(inputChips);
      console.log(`input chip email: ${emailValid}`);
      if (emailValid) {
        setEmailList([...emailList, inputChips]);
        setEmail({ email: "" });
        setEmailError(null);
      } else {
        setEmailError("Check Email");
      }
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
    setEmailList(
      emailList.filter((it) => {
        return it !== item;
      })
    );
  };

  const handleSaveEmail = (e) => {
    e.preventDefault();
    // setEmailList({email:""})
    setEmailError(null);
    if (emailList.email !== null) {
      dispatch(addCrashEmail(code, emailList));
    }

    if (!emailList.email.length) {
      setEmailError("Email is required");
    }
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

  useEffect(() => {
    // dispatch(addCrashEmailReducer(code));
  }, []);

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
            {ld ? (
              <Spinner />
            ) : (
              <Row>
                <Col xl={6} md={6} sm={12}>
                  <h4 className={`${Style.headingText} cpactiveText`}>Update project</h4>
                  <div className={`${Style.imputFields} mt-4`}>
                    <input
                      type="text"
                      className="form-control LoginForminput "
                      placeholder="Project Name"
                      value={nameAndDesc.name}
                      onChange={(e) =>
                        setNameAndDesc({ ...nameAndDesc, name: e.target.value })
                      }
                    />
                  </div>
                  <div className={`${Style.imputFields} mt-4`}>
                    <textarea
                      placeholder="Project Description"
                      rows="4"
                      cols="50"
                      value={nameAndDesc.desc}
                      onChange={(e) =>
                        setNameAndDesc({ ...nameAndDesc, desc: e.target.value })
                      }
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
                  <h4 className={Style.headingText}>Add project type</h4>
                  <div className={`${Style.imputFields} mt-4`}>
                    <input
                      type="text"
                      className="form-control LoginForminput "
                      id="exampleInputEmail1"
                      placeholder="Project Type"
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
            )}
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
                    placeholder="Enter Email"
                    value={emailstate.email}
                    aria-describedby="emailHelp"
                    onKeyDown={(e) => {
                      handleKeyDownEmail(e);
                    }}
                    onChange={(e) => setEmail({ email: e.target.value })}
                  />
                </div>
                {emailError ? (
                  <small style={{ color: "red" }}>{emailError}</small>
                ) : (
                  ""
                )}
                {/* CHIP SECTION */}
                <section className={Style.chipouter}>
                  {emailList.length > 0 &&
                    emailList.map((items) => {
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
                  // type="submit"
                  className="mt-4"
                  onClick={(e) => {
                    handleSaveEmail(e);
                  }}
                >
                  Save Emails
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
}
