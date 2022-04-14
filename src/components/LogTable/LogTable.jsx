import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faDatabase,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import Style from "./LogTable.module.scss";
import { Navbar, SideBar } from "../../utils/NavSideBar";
import "../../css/theme.scss";
import CrashFreeStatics from "./components/CrashFreeStatics";
import TrandData from "./components/TrandData";
import CustomeDropDown from "../../Container/DropDown";
import { useDispatch, useSelector } from "react-redux";
import TableData from "./components/Table/TableData";
import PieChartSection from "./components/PieChartSection";
import {
  getProjectByCode,
  getProjectByCodeSetting,
} from "../../redux/action/ProjectAction";
import {
  getLogTypeCounts,
  getLogByDate,
  getDeviceModelCode,
  getCrashFreeUsers
} from "../../redux/action/LogsAction";
import { useHistory } from "react-router-dom";
import Spinner from "../../Container/Spinner";
import DateIcons from "../../assets/icons/date.png";
import LogICon from "../../assets/icons/log.png";
import TypeDropDown from "./components/Table/TypeDropDown";
import "../../utils/Theme.scss";

export default function LogTable() {
  const history = useHistory();
  const [dateDropDown, setDateDropDown] = useState(false);
  const [diffDate, setDiffDate] = useState(
    localStorage.getItem("diffDate") || 90
  );
  const [tableDataState, setTableDataState] = useState({});

  // dark mood state

  const [darkMood, setDarkMood] = useState(
    JSON.parse(localStorage.getItem("darkMood"))
  );

  // SLIDEWINDOW STATE
  const slideWindowReducer = useSelector((state) => state.slideWindowReducer);
  const { data } = slideWindowReducer;

  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  const { data: projectType } = getModelCodeReducer;

  var projectCode = {
    code: localStorage.getItem("project_type")
      ? JSON.parse(localStorage.getItem("project_type")).typeCode
      : projectType &&
        projectType.modelList &&
        projectType.modelList[0].typeCode,
    name: localStorage.getItem("project_type")
      ? JSON.parse(localStorage.getItem("project_type")).typeName
      : projectType &&
        projectType.modelList &&
        projectType.modelList[0].typeName,
  };
  const ref = useRef();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");

  // navigation
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
    },
    link2: {
      iconName: `/assets/icons/settings.png`,
      linkName: "Settings",
      link: `/settings?code=${code}&name=${projectName}&pagename=settings`,
    },
  };

  // Filter crashfree stastics & Trend wrt to date
  const DateFilter = () => {
    setDateDropDown(true);
    if (dateDropDown) {
      setDateDropDown(false);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeviceModelCode(code));
    dispatch(getProjectByCodeSetting(code));
    const checkIfClickedOutside = (e) => {
      if (dateDropDown && ref.current && !ref.current.contains(e.target)) {
        setDateDropDown(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  const multipleDispatchGraph = () => {
    dispatch(
      getLogTypeCounts({
        code,
        diffDate,
        code1: projectCode.code,
      })
    );
    dispatch(
      getLogByDate({
        code,
        diffDate,
        code1: projectCode.code,
      })
    );
    dispatch(
      getCrashFreeUsers({
        code,
        diffDate,
        code1: projectCode.code,
      })
    );
  };

  let filedate = new Date();
  const endDate = filedate.toISOString().slice(0, 10);
  filedate.setDate(filedate.getDate() - diffDate);
  const startDate = filedate.toISOString().slice(0, 10);

  localStorage.setItem(
    "selected_date",
    JSON.stringify({ start: startDate, end: endDate })
  );

  useEffect(() => {
    multipleDispatchGraph();
  }, [diffDate, projectCode.code]);

  // CHECKING IF USER IS LOGIN OR NOT
  useEffect(() => {
    if (!localStorage.getItem("ddAdminToken")) {
      history.push("/");
    }
    return () => {
      <Spinner />;
    };
  }, [history]);

  // REFRESH ONLY TABLE
  const RefreshTableOnlyFun = () => {
    let logType = JSON.parse(localStorage.getItem("selected_log"));
    let record = JSON.parse(localStorage.getItem("selected_record"));
    let start = JSON.parse(localStorage.getItem("selected_date")).start;
    let end = JSON.parse(localStorage.getItem("selected_date")).end;
    let pgNo = JSON.parse(localStorage.getItem("page_no"));

    dispatch(
      getProjectByCode(
        code,
        { start, end },
        logType,
        pgNo,
        record,
        projectCode.code
      )
    );
  };

  const tableDataStateFun = (
    code,
    date,
    logtype,
    pageNo,
    records,
    projectType
  ) => {
    setTableDataState({
      code,
      date,
      logtype,
      pageNo,
      records,
      projectType,
    });
  };

  return (
    <>
      <div>
        <Row>
          <Col
            xl={2}
            lg={2}
            md={2}
            sm={2}
            className={data.show && `${Style.SidebarLogTable}`}
            style={{ padding: "0px" }}
          >
            <SideBar sidebarDetails={sidebarDetails} />
          </Col>
          <Col xl={10} lg={10} md={10} sm={10} style={{ padding: "0px" }}>
            <Navbar navdetails={navdetails} />

            {/* data here */}
            <Container
              className={
                data.show
                  ? Style.LogtableContaininer
                  : Style.LogtableContaininerWithoutSlide
              }
            >
              <Row className="mt-4">
                <Col xl={10} md={9} sm={9}>
                  <TypeDropDown
                    tableDataState={tableDataState}
                    diffDate={diffDate}
                    codeReducer={getModelCodeReducer}
                  />
                </Col>

                <Col xl={2} md={3} sm={3} className={Style.filterWithDate}>
                  <section className={Style.filterwithDate} ref={ref}>
                    <section className={Style.datafilter} onClick={DateFilter}>
                      <Image src={DateIcons} />
                      <p
                        style={{
                          fontSize: "1rem",
                        }}
                        className="mm-2 LTp"
                      >
                        {diffDate == 10
                          ? `last 10 days`
                          : diffDate == 7
                          ? `last 7 days`
                          : diffDate == 15
                          ? `last 15 days`
                          : diffDate == 30
                          ? `last 30 days`
                          : diffDate == 45
                          ? `last 45 days`
                          : diffDate == 60
                          ? `last 60 days`
                          : diffDate == 90
                          ? `last 90 days`
                          : null}
                      </p>
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        color="#2A9AA4"
                        style={{
                          width: "10px",
                          height: "20px",
                          marginBottom: "2px",
                        }}
                      />
                    </section>

                    <section>
                      {dateDropDown ? (
                        <CustomeDropDown
                          width="100%"
                          zIndex="8"
                          boxShadow={
                            darkMood ? "1px 1px 10px 2px rgba(0,0,0,0.45)" : ""
                          }
                        >
                          <p
                            style={{}}
                            className={`${Style.productVersion} mt-1 LTp `}
                            onClick={() => {
                              setDiffDate(7);
                              localStorage.setItem("diffDate", 7);
                              setDateDropDown(false);
                            }}
                          >
                            7 days
                          </p>
                          <p
                            style={{}}
                            className={`${Style.productVersion} mt-1 LTp`}
                            onClick={() => {
                              setDiffDate(15);
                              localStorage.setItem("diffDate", 15);
                              setDateDropDown(false);
                            }}
                          >
                            15 days
                          </p>

                          <p
                            style={{}}
                            className={`${Style.productVersion} mt-1 LTp`}
                            onClick={() => {
                              setDiffDate(30);
                              localStorage.setItem("diffDate", 30);
                              setDateDropDown(false);
                            }}
                          >
                            30 days
                          </p>
                          <p
                            style={{}}
                            className={`${Style.productVersion} mt-1 LTp`}
                            onClick={() => {
                              setDiffDate(45);
                              localStorage.setItem("diffDate", 45);
                              setDateDropDown(false);
                            }}
                          >
                            45 days
                          </p>
                          <p
                            style={{}}
                            className={`${Style.productVersion} mt-1 LTp`}
                            onClick={() => {
                              setDiffDate(60);
                              localStorage.setItem("diffDate", 60);
                              setDateDropDown(false);
                            }}
                          >
                            60 days
                          </p>
                          <p
                            style={{}}
                            className={`${Style.productVersion} mt-1 LTp`}
                            onClick={() => {
                              setDiffDate(90);
                              localStorage.setItem("diffDate", 90);
                              setDateDropDown(false);
                            }}
                          >
                            90 days
                          </p>
                        </CustomeDropDown>
                      ) : null}
                    </section>
                  </section>
                </Col>
              </Row>

              {/* Data chart */}
              <Row className="mt-3">
                {/*toggle menus  */}
                <Col xl={4} md={6} sm={12}>
                  <CrashFreeStatics />
                </Col>

                <Col xl={4} md={6} sm={12}>
                  <PieChartSection />
                </Col>
                <Col className="trends-container" xl={4} md={12} sm={12}>
                  <TrandData />
                </Col>
              </Row>

              {/* Events  */}
              <Row className="mt-5">
                <Col xl={6} md={6} sm={6} className={Style.issuesTable}>
                  <p
                    className="LTp"
                    style={{
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      lineHeight: "2.2rem",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Issues
                  </p>
                </Col>
                <Col
                  xl={6}
                  md={6}
                  sm={6}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <section
                    className={Style.filterGraphFirstSction}
                    onClick={RefreshTableOnlyFun}
                  >
                    <FontAwesomeIcon icon={faSync} />
                  </section>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  {/* Table with toolkit provider */}
                  <TableData
                    code={code}
                    projectName={projectName}
                    diffDate={diffDate}
                    tableDataStateFun={tableDataStateFun}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </>
  );
}
