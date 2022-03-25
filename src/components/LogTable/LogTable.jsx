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
  getLogTypeCounts,
  getLogByDate,
  getProjectByCode,
  getDeviceModelCode,
  getCrashFreeUsers,
} from "../../redux/action/ProjectAction";
import { useHistory } from "react-router-dom";
import Spinner from "../../Container/Spinner";
import DateIcons from "../../assets/icons/date.png";
import LogICon from "../../assets/icons/log.png";
import TypeDropDown from "./components/Table/TypeDropDown";

export default function LogTable() {
  const history = useHistory();
  // filter with crash free statics and trands
  const [dropDownShow, setDropDownShow] = useState(false);
  const [dateDropDown, setDateDropDown] = useState(false);
  const [productDropDown, seProductDropDown] = useState(false);
  const [projectCodeDropDown, setProjectCodeDropDown] = useState(false);
  const [diffDate, setDiffDate] = useState(
    localStorage.getItem("diffDate") || 90
  );
  const [tableDataState, setTableDataState] = useState({});

  // SLIDEWINDOW STATE
  const slideWindowReducer = useSelector((state) => state.slideWindowReducer);
  const { data } = slideWindowReducer;

  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  const { loading, data: projectType } = getModelCodeReducer;
  const { loading: ld, data: dt } = getModelCodeReducer;

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

  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );

  const { data: getallCode } = getAllLogByCodeReducer;

  const recordavilable =
    getallCode && getallCode.data && getallCode.data.pageLimit;

  const ref = useRef();

  const [date, setdate] = useState({
    start: null,
    end: null,
  });

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

  const dropDownShowFun = () => {
    setDropDownShow(true);
    if (dropDownShow) {
      setDropDownShow(false);
    }
  };

  // filter crashfree statcis and trands with data filter
  const DateFilter = () => {
    setDateDropDown(true);
    if (dateDropDown) {
      setDateDropDown(false);
    }
  };

  let modelList;
  const ProjectTypeFilter = () => {
    setProjectCodeDropDown(true);
    if (projectCodeDropDown) {
      setProjectCodeDropDown(false);
    }
  };

  const dispatch = useDispatch();

  //   const getModelCodeReducer = useSelector(
  //     (state) => state.getModelCodeReducer
  //   );

  // let modelList;
  //   if (getModelCodeReducer && getModelCodeReducer.data) {
  //     modelList = getModelCodeReducer.data.modelList
  //   }

  // const dispatchmultiple = () => {
  //   // dispatch(getLogTypeCounts(code));
  //   // dispatch(getErrorWRTOS(code));
  //   // dispatch(getProjectDetails(code));
  //   // dispatch(getErrorWRTVersion(code));
  //   // getProjectByCode()

  //   // dispatch(getLogByDate(code, date));
  //   // dispatch(getCrashFreeUsers({code,diffDate}));
  // };
  // useEffect(() => {
  //   dispatchmultiple();
  // }, [date]);

  useEffect(() => {
    dispatch(getDeviceModelCode(code));
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (dateDropDown && ref.current && !ref.current.contains(e.target)) {
        setDateDropDown(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
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

    // dispatch(getLogByDate(code, date));
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

  // CHECKING IF USER IS NOT LOGIN AND REDIRECTION USER OT LOGIN PAGE
  useEffect(() => {
    if (!localStorage.getItem("ddAdminToken")) {
      history.push("/");
    }
    return () => {
      <Spinner />;
    };
  }, [history]);

  // dateDropDown : was dependency for the above useeffect

  // REFRESH ONLY TABLE
  const RefreshTableOnlyFun = () => {
    let logType = JSON.parse(localStorage.getItem("selected_log"));
    let record = JSON.parse(localStorage.getItem("selected_record"));
    let start = JSON.parse(localStorage.getItem("selected_date")).start;
    let end = JSON.parse(localStorage.getItem("selected_date")).end;
    let pgNo = JSON.parse(localStorage.getItem("page_no"));

    // let date = JSON.parse(localStorage.getItem("selected_date"));

    // // 1) code, logtype , start date, end date, records, page==null
    // if (code && logType && date && record) {
    //   return dispatch(getProjectByCode(code, logType, date, record));
    // }

    // // 2) code, logtype , start date, end date,
    // if (code && logType && date) {
    //   return dispatch(getProjectByCode(code, logType, date));
    // }
    // // 3) code, logtype
    // if (code && logType) {
    //   return dispatch(getProjectByCode(code, null, logType, null, record));
    // }

    // // --1) only logType
    // if (code && logType) {
    //   return dispatch(getProjectByCode(code, logType, null, null));
    // }

    // // --2) only date
    // if (code && date) {
    //   return dispatch(getProjectByCode(code, null, date, null));
    // }
    // // --3) only records
    // if (code && record) {
    //   return dispatch(getProjectByCode(code, null, null, record));
    // }

    // *) code
    // let filedate = new Date();
    // const endDate = filedate.toISOString().slice(0, 10);
    // filedate.setDate(filedate.getDate() - diffDate);
    // const startDate = filedate.toISOString().slice(0, 10);
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
    // dispatch(getProjectByCode({ code: code, date: { startDate, endDate } }));
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
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={data.show && `${Style.NavbarLogTable}`}
          style={{ padding: "0px" }}
        >
          <Navbar navdetails={navdetails} />

          {/* data inhere */}
          <Container
            className={
              data.show
                ? Style.LogtableContaininer
                : Style.LogtableContaininerWithoutSlide
            }
          >
            <Row className="mt-4">
              <Col xl={10} md={9} sm={9} /* className={Style.filterWithDate} */>
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
                    <p style={{ fontSize: "1rem" }} className="mm-2">
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
                      <CustomeDropDown width="100%" zIndex="9">
                        {/* <p className="mt-1">10 days</p> */}
                        <p
                          style={{ fontSize: "1rem" }}
                          className={`${Style.productVersion} mt-1`}
                          onClick={() => {
                            setDiffDate(7);
                            localStorage.setItem("diffDate", 7);
                            setDateDropDown(false);
                          }}
                        >
                          7 days
                        </p>
                        <p
                          className={`${Style.productVersion} mt-1`}
                          onClick={() => {
                            setDiffDate(15);
                            localStorage.setItem("diffDate", 15);
                            setDateDropDown(false);
                          }}
                        >
                          15 days
                        </p>

                        <p
                          className={`${Style.productVersion} mt-1`}
                          onClick={() => {
                            setDiffDate(30);
                            localStorage.setItem("diffDate", 30);
                            setDateDropDown(false);
                          }}
                        >
                          30 days
                        </p>
                        <p
                          className={`${Style.productVersion} mt-1`}
                          onClick={() => {
                            setDiffDate(45);
                            localStorage.setItem("diffDate", 45);
                            setDateDropDown(false);
                          }}
                        >
                          45 days
                        </p>
                        <p
                          className={`${Style.productVersion} mt-1`}
                          onClick={() => {
                            setDiffDate(60);
                            localStorage.setItem("diffDate", 60);
                            setDateDropDown(false);
                          }}
                        >
                          60 days
                        </p>
                        <p
                          className={`${Style.productVersion} mt-1`}
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

            {/* data chart and informantions */}
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
                  style={{
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    lineHeight: "2.2rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  Issues
                </p>
                {/* <p className={Style.LinkActiveText}>Search By userId</p> */}
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

            {/* data table */}

            <Row className="mt-3">
              <Col>
                {/* table with toolkit provider */}
                <TableData
                  code={code}
                  projectName={projectName}
                  diffDate={diffDate}
                  tableDataStateFun={tableDataStateFun}
                />

                {/*Ag table  */}
                {/* <AgTable /> */}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
}
