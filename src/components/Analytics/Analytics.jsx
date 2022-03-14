import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ToggleTabs from "./Componets/ToggleTabs";
import Style from "./Analytics.module.scss";
import { Navbar, SideBar } from "../../utils/NavSideBar";
import AnalyticsEventDataComp from "./Componets/AnalyticsEventDataComp";
import EventByVersion from "./Componets/EventByVersion";
import {
  getLogMsgOccurenceWRTDate,
  getCrashAnalyticsData,
  getCrashFreeUsersData,
} from "../../redux/action/ProjectAction";
import { useDispatch, useSelector } from "react-redux";
import AnalyticeIcon from "../../assets/icons/Analytics.png";

export default function Analytics() {
  const [date, setdate] = useState({
    start: null,
    end: null,
  });

  // SLIDEWINDOW STATE
  const slideWindowReducer = useSelector((state) => state.slideWindowReducer);
  const { data: slideView } = slideWindowReducer;

  var dt = new Date();
  date.end = dt.toISOString().slice(0, 10);
  dt.setDate(dt.getDate() - 90);
  date.start = dt.toISOString().slice(0, 10);

  // const filterOnDate = ({ startDate = null, endDate = null, diff = 15 }) => {
  //   if (diff != null) {
  //     var dt = new Date();
  //     const endd = dt.toISOString().slice(0, 10);
  //     dt.setDate(dt.getDate() - diff);
  //     setdate({ start: dt.toISOString().slice(0, 10), end: endd });
  //   } else {
  //   }
  // };
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const logMsg = urlParams.get("col").split("at ")[0];

  const projectName = urlParams.get("name");
  const projectCodeAnalytics = urlParams.get("projectCodeAnalytics");

  // const navbardetail = {
  //   name: projectName,
  //   dashName: projectName,
  //   link1: {
  //     iconName: faDatabase,
  //     linkName: "Logs",
  //     link: `/logTable?code=${code}&name=${projectName}`,
  //   },
  //   link2: {
  //     iconName: faChartPie,
  //     linkName: "Analytics",
  //     link: `/analytics?code=${code}&name=${projectName}`,
  //   },
  // };

  const sidebarDetails = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: AnalyticeIcon,
      linkName: "Analytics",
      link: "",
    },
    link2: {
      iconName: `./assets/icons/settings.png`,
      linkName: "Settings",
      link: "",
    },
  };

  useEffect(() => {}, []);

  const getCrashFreeUsersDataReducer = useSelector(
    (state) => state.getCrashFreeUsersDataReducer
  );

  // const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  // const { loading: loadingPorjectType, data: projectType } =
  //   getModelCodeReducer;

  const { loading, data } = getCrashFreeUsersDataReducer;
  let users = data && data.response ? data.response.length : 0;
  let totalCount = 0;
  if (data && data.response.length !== 0) {
    data.response.map((e) => (totalCount += e.count));
  }

  const dispatch = useDispatch();

  const dispatchmultiple = () => {
    dispatch(getCrashFreeUsersData(code, logMsg, projectCodeAnalytics));
    dispatch(getCrashAnalyticsData(code, logMsg, projectCodeAnalytics));
    dispatch(
      getLogMsgOccurenceWRTDate({
        code,
        startDate: date.start,
        endDate: date.end,
        logMsg,
        code1: projectCodeAnalytics,
      })
    );
  };
  useEffect(() => {
    dispatchmultiple();
  }, []);
  return (
    <>
      <Row>
        <Col xl={2} lg={2} md={2} sm={2} style={{ padding: "0px" }}>
          <SideBar sidebarDetails={sidebarDetails} />
        </Col>
        <Col
          xl={10}
          lg={10}s
          md={10}
          sm={10}
          style={{ padding: "0px" }}
          className={slideView.show && `${Style.AnalyticsNavigation}`}
        >
          <Navbar navdetails={sidebarDetails} />
          <Container
            className={
              slideView.show
                ? Style.AnalyticsContainer
                : Style.AnalyticsContainerWithputSlide
            }
          >
            {/* data from api */}
            <Col className="my-4">
              {loading ? (
                "Loading"
              ) : (
                <p className={Style.paraTextIssue}>
                  This issue has{" "}
                  <strong style={{ color: "#0099a4" }}>
                    {totalCount} crash
                  </strong>{" "}
                  events affecting
                  <strong style={{ color: "#0099a4" }}> {users} users</strong>
                </p>
              )}
            </Col>
            <Col>
              <Row>
                <Col style={{ paddingLeft: "0" }} xl={8} md={8} sm={12}>
                  <EventByVersion />
                </Col>
                <Col style={{ paddingRight: "0" }} xl={4} md={4} sm={12}>
                  <ToggleTabs />
                </Col>
              </Row>
            </Col>

            <Col className={`${Style.AnalyticsEvents} my-4 mt-5`}>
              <p style={{ fontWeight: "600", letterSpacing: "0.5px" }}>
                Events
              </p>
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
