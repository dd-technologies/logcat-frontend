import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGreaterThan,
  faLessThan,
  faDatabase,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import ToggleTabs from "./Componets/ToggleTabs";
import Style from "./Analytics.module.scss";
import { Navbar, SideBar } from "../../utils/NavSideBar";
import AnalyticsEventDataComp from "./Componets/AnalyticsEventDataComp";
import EventByVersion from "./Componets/EventByVersion";
import {
  getLogTypeCounts,
  getLogByDate,
  getErrorWRTOS,
  getErrorWRTVersion,
  getProjectDetails,
  getLogMsgOccurenceWRTDate,
  getCrashAnalyticsData,
  getCrashFreeUsersData,
} from "../../redux/action/ProjectAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DateFilter } from "ag-grid-community";

export default function Analytics() {
  const [date, setdate] = useState({
    start: null,
    end: null,
  });

  var dt = new Date();
  date.end = dt.toISOString().slice(0, 10);
  dt.setDate(dt.getDate() - 90);
  date.start = dt.toISOString().slice(0, 10);

  console.log(date)

  const filterOnDate = ({ startDate = null, endDate = null, diff = 15 }) => {
    // console.log(diff);
    if (diff != null) {
      var dt = new Date();
      const endd = dt.toISOString().slice(0, 10);
      // console.log(date);
      dt.setDate(dt.getDate() - diff);
      setdate({ start: dt.toISOString().slice(0, 10), end: endd });
      // console.log(date);
    } else {
      // console.log("Does not execute");
    }
  };
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const logMsg = urlParams.get("col").split("at")[0];

  console.log(logMsg)

  const projectName = urlParams.get("name");

  const navbardetail = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: faDatabase,
      linkName: "Logs",
      link: `/logTable?code=${code}&name=${projectName}`,
    },
    link2: {
      iconName: faChartPie,
      linkName: "Analytics",
      link: `/analytics?code=${code}&name=${projectName}`,
    },
  };

  const sidebarDetails = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: faDatabase,
      linkName: "Analytics",
    },
    link2: {
      iconName: faDatabase,
      linkName: "Profile",
      link: "",
    },
  };

  // console.log("data", date);

  const dispatch = useDispatch();

  const dispatchmultiple = () => {
    console.log('dispatch multiple executed!!')
    dispatch(getCrashFreeUsersData(code,logMsg))
    dispatch(getCrashAnalyticsData(code,logMsg))
    dispatch(getErrorWRTOS(code));
    dispatch(getErrorWRTVersion(code));
    getLogMsgOccurenceWRTDate({code, startDate:date.start, endDate:date.end, logMsg});
  };
  useEffect(() => {
    dispatchmultiple();
    console.log('hello useEffect')
    // dispatch(getLogMsgOccurenceWRTDate({code, startDate:date.start, endDate:date.end, logMsg}));
    
  }, []);
  return (
    <>
      <Row>
        <Col xl={2} lg={2} md={2} sm={2}>
          <SideBar navdetails={sidebarDetails} />
        </Col>
        <Col xl={10} lg={10} md={10} sm={10}>
          <Navbar navdetails={sidebarDetails} />
          <Container style={{ marginTop: "12%", marginBottom: "3%" }}>
            {/* data from api */}
            <Col className="my-4">
              This issue has <strong>5</strong> crash events affecting
              <strong> 2 </strong> users
            </Col>

            <Col>
              <Row>
                <Col xl={8}>
                  <EventByVersion />
                </Col>
                <Col xl={4}>
                  <ToggleTabs />
                </Col>
              </Row>
            </Col>

            <Col className={`${Style.AnalyticsEvents} my-4`}>
              <p>Events</p>
              <section className={Style.PrevNext}>
                <section>
                  <FontAwesomeIcon icon={faLessThan} />
                </section>
                <section>
                  <FontAwesomeIcon icon={faGreaterThan} />
                </section>
              </section>
            </Col>

            {/* data tables   */}
            <Col xl={12} className="mt-4">
              <AnalyticsEventDataComp />
            </Col>
          </Container>
        </Col>
      </Row>
    </>
  );
}
