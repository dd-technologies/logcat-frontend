import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Style from "./Settings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCrashEmail } from "../../redux/action/ProjectAction";
import Spinner from "../../Container/Spinner";
import { validateEmailHelper } from "../../helper/Emails";
import SideBar from "../../utils/Sidebar";
import { Navbar } from "../../utils/NavBar";

export default function Settings() {
  // dark mood state

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");

  const getAllProjectReducer = useSelector(
    (state) => state.getAllProjectReducer
  );

  const getProjectByCodeSettingReducer = useSelector(
    (state) => state.getProjectByCodeSettingReducer
  );
  const { loading: ld, data: dt } = getProjectByCodeSettingReducer;

  const { allProjectData } = getAllProjectReducer;

  let dataObj;
  allProjectData &&
    allProjectData.data &&
    allProjectData.data.data.map((dt, idx) => {
      if (dt.code === code) {
        dataObj = dt;
      }
    });

  const dispatch = useDispatch();

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
      iconName: `/assets/icons/log.png`,
      linkName: `Logs`,
      link: `/logtable?code=${code}&name=${projectName}&pagename=logpage`,
    },
    link2: {
      iconName: `/assets/icons/settings.png`,
      linkName: "Settings",
      link: `/settings?code=${code}&name=${projectName}&pagename=settings`,
    },
    link3: {
      iconName: `/assets/icons/settings.png`,
      linkName: "Settings",
      link: `/alarm?code=${code}&name=${projectName}&pagename=alarm`,
    },
  };

  //EMAIL CHIPS
  const validateEmail = (email) => {
    // if (!email) {
    //   setEmailError("Please enter your email Id");

    //   console.log("email validate function " + emailError);
    //   return false;
    // }

    // if (email.length) {
    //   var pattern = new RegExp(
    //     /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    //   );
    //   if (!pattern.test(email)) {
    //     setEmailError("Please enter valid email address.");
    //     return false;
    //   }
    // }

    const isEmailValid = validateEmailHelper(email);
    if (isEmailValid.isSuccess) {
      return isEmailValid.isSuccess;
    }
    if (!isEmailValid.isSuccess && !isEmailValid.isEmail) {
      setEmailError(isEmailValid.message);
      return isEmailValid.isSuccess;
    }
    if (!isEmailValid.isSuccess && isEmailValid.isEmail) {
      setEmailError(isEmailValid.message);
      return isEmailValid.isSuccess;
    }
    setEmailError(null);
    return true;
  };

  //   HANDLE KEYDOWN FUNCTION
  const handleKeyDownEmail = (evt) => {
    if (["Enter", "Tab", ",", " "].includes(evt.key)) {
      evt.preventDefault();
      setEmail({ ...emailstate, error: null });
      let inputChips = emailstate.email.trim();
      const emailValid = validateEmail(inputChips);
      if (emailValid) {
        setEmailList([...emailList, inputChips]);
        setEmail({ email: "" });
        setEmailError(null);
      } else {
        setEmailError("Check Email");
      }
    }
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

  //PROJECT TYPE CHIPS

  //ADD CHIPS ON CLICK
  const handleKeyDownPorject = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
      var value = chipStateProject.value.trim();
      if (value) {
        setChipStateProject({
          ...chipStateProject,
          items: [...chipStateProject.items, chipStateProject.value],
          value: "",
        });
      }
    }
  };

  //UPDATE STATE ON CHANGE
  const handleChangeProject = (evt) => {
    setChipStateProject({
      ...chipStateProject,
      value: evt.target.value,
      error: null,
    });
  };

  // DELETE PROJECT
  const hanldeOndeleteProject = (item) => {
    setChipStateProject({
      items: chipStateProject.items.filter((i) => i !== item),
    });
  };

  return (
    <>
      <Row className="rowSection">
        <Col xl={2} lg={2} md={2} sm={2} className="noSidebar colSection">
          <SideBar
            sidebarDetails={sidebarDetails}
            className={Style.SideBarColume}
          />
        </Col>
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={`${Style.NavbarColumn} colSection`}
        >
          <Navbar navdetails={navdetails} />
          <Container className={Style.mainContainer}>
            {/* SETTINGS COMPONENTS */}
            {ld ? (
              <Spinner />
            ) : (
              <Row>
                <Col xl={6} md={6} sm={12} className="mt-4">
                  <h5 className={`${Style.headingText} cpactiveText`}>
                    Update project
                  </h5>
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
                <Col xl={6} md={6} sm={12} className="mt-4">
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

            <div className={`${Style.hrLine} mt-4`}></div>

            {/* CRASH FORWARDING */}

            <Row className="mt-4">
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
