import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faCalendar,
  faCaretDown,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import Style from "./LogTable.module.scss";
import { Navbar, SideBar } from "../../utils/NavSideBar";
import "../../css/theme.scss";
import CrashFreeStatics from "./components/CrashFreeStatics";
import TrandData from "./components/TrandData";
import CustomeDropDown from "../../Container/DropDown";
import { useDispatch, useSelector } from "react-redux";
import AgTable from "./components/Table/AgTable";
import TableData from "./components/Table/TableData";
import PieChartSection from "./components/PieChartSection";
import {
  getLogTypeCounts,
  getErrorWRTOS,
  getProjectDetails,
  getErrorWRTVersion,
  getLogByDate,
  getProjectByCode,
  getCrashFreeUsers,
} from "../../redux/action/ProjectAction";
import { getLogCountsReducer } from "../../redux/reducer/ProjectReducer";

export default function LogTable() {
  // filter with crash free statics and trands
  const [dropDownShow, setDropDownShow] = useState(false);
  const [dateDropDown, setDateDropDown] = useState(false);
  const [diffDate, setDiffDate] = useState(10);
  const [date, setdate] = useState({
    start: null,
    end: null,
  });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");

  // navigation

  const sidebarDetails = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: faDatabase,
      linkName: "Logs",
    },
    link2: {
      iconName: faDatabase,
      linkName: "Profile",
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
  const dispatch = useDispatch();
  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );

  const dispatchmultiple = () => {
    // dispatch(getLogTypeCounts(code));
    // dispatch(getErrorWRTOS(code));
    dispatch(getProjectDetails(code));
    // dispatch(getErrorWRTVersion(code));
    // getProjectByCode()

    // dispatch(getLogByDate(code, date));
    // dispatch(getCrashFreeUsers({code,diffDate}));
  };
  useEffect(() => {
    dispatchmultiple();
  }, [date]);

  const multipleDispatchGraph = () => {
    dispatch(getLogTypeCounts({ code, diffDate }));
    dispatch(getLogByDate({ code, diffDate }));
    dispatch(getCrashFreeUsers({ code, diffDate }));
    // dispatch(getLogByDate(code, date));
  };
  useEffect(() => {
    multipleDispatchGraph();
  }, [diffDate]);

  // console.log("diffDate", diffDate);

  return (
    <>
      <Row>
        <Col xl={2} lg={2} md={2} sm={2}>
          <SideBar navdetails={sidebarDetails} />
        </Col>
        <Col xl={10} lg={10} md={10} sm={10}>
          <Navbar navdetails={sidebarDetails} />

          {/* data inhere */}
          <Container style={{ marginTop: "10%", marginBottom: "5%" }}>
            <Row className="mt-4">
              <Col xl={12} className={Style.filterWithDate}>
                <section className={Style.filterwithDate}>
                  <section className={Style.datafilter} onClick={DateFilter}>
                    <FontAwesomeIcon icon={faCalendar} />
                    <p className="ms-2 p-1">
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
                    <FontAwesomeIcon icon={faCaretDown} />
                  </section>
                  <section>
                    {dateDropDown ? (
                      <CustomeDropDown width="100%">
                        {/* <p className="mt-1">10 days</p> */}
                        <p
                          className="mt-1"
                          onClick={() => {
                            setDiffDate(7);
                            setDateDropDown(false);
                          }}
                        >
                          7 days
                        </p>
                        <p
                          className="mt-1"
                          onClick={() => {
                            setDiffDate(15);
                            setDateDropDown(false);
                          }}
                        >
                          15 days
                        </p>

                        <p
                          className="mt-1"
                          onClick={() => {
                            setDiffDate(30);
                            setDateDropDown(false);
                          }}
                        >
                          30 days
                        </p>
                        <p
                          className="mt-1"
                          onClick={() => {
                            setDiffDate(45);
                            setDateDropDown(false);
                          }}
                        >
                          45 days
                        </p>
                        <p
                          className="mt-1"
                          onClick={() => {
                            setDiffDate(60);
                            setDateDropDown(false);
                          }}
                        >
                          60 days
                        </p>
                        <p
                          className="mt-1"
                          onClick={() => {
                            setDiffDate(90);
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
              <Col xl={4} md={4} sm={6}>
                <CrashFreeStatics />
              </Col>

              <Col xl={4} md={4} sm={6}>
                <TrandData />
              </Col>

              <Col xl={4} md={4} sm={6}>
                <PieChartSection />
              </Col>
            </Row>

            {/* Events  */}
            <Row className="mt-5">
              <Col xl={12} className={Style.issuesTable}>
                <p>Issues</p>
                {/* <p className={Style.LinkActiveText}>Search By userId</p> */}
              </Col>
            </Row>

            {/* data table */}

            <Row className="mt-3">
              <Col>
                {/* table with toolkit provider */}
                <TableData code={code}  projectName={projectName}/>

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
