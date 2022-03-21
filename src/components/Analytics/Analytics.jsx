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
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

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

  // URL STRING
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  // const logMsg = urlParams.get("col").split("at ");
  // console.log("logMsg", logMsg);

  const projectName = urlParams.get("name");
  const projectCodeAnalytics = urlParams.get("projectCodeAnalytics");
  // const analyticsURL = urlParams.get("pagetype") || "";
  let stackArray = urlParams.get("col") || "";
  let stackArrayNew = stackArray.split(" at ");
  console.log("stackArrayNew", stackArrayNew);

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

  let mappedArraywithKey = stackArrayNew.map((val, index) => {
    return val;
  });

  // console.log("mappedArraywithKey", mappedArraywithKey);

  //  when error has caused by -- function

  const stackErrorLine = () => {
    var causedError, noCousedError;

    if (mappedArraywithKey.length == 1) {
      setTitle(mappedArraywithKey[0]);
      setSubTitle("");
    } else {
      for (let key in mappedArraywithKey) {
        if (mappedArraywithKey[key].includes("Caused by:")) {
          causedError = mappedArraywithKey[parseInt(key) + 1];
          // console.log("causedError", causedError);
          setTitle(
            causedError.split("(")[1].replace(":", " line ").split(")")[0]
          );
          setSubTitle(causedError.split("(")[0]);
        }
      }

      if (!stackArray.includes("Caused by:")) {
        noCousedError = mappedArraywithKey[1]
          .split("(")[1]
          .replace(":", " ")
          .split(")")[0];
        setTitle(noCousedError);
        setSubTitle(mappedArraywithKey[1].split("(")[0]);
        console.log(
          "mappedArraywithKey",
          mappedArraywithKey[1]
            .split("(")[1]
            .replace(":", " line ")
            .split(")")[0]
        );
      }
    }
  };

  useEffect(() => {
    stackErrorLine();
  }, []);

  // var headingTitle, headingTitleNew;
  // useEffect(() => {
  //   console.log("complete arr", mappedArraywithKey);
  //   for (let i = 0; i < mappedArraywithKey.length; i++) {
  //     console.log("test", mappedArraywithKey[1]);
  //     if (mappedArraywithKey[i].includes(" Caused by: ")) {
  //       console.log("test", mappedArraywithKey[i + 1]);
  //     }
  //   }
  //   for (const key in mappedArraywithKey) {
  //     console.log(`stackArrayNew`, mappedArraywithKey[key]);
  //     if (mappedArraywithKey[key].indexOf("Caused by: ") == 1) {
  //       headingTitle = mappedArraywithKey[parseInt(key) + 1];
  //       console.log("headingTitle", headingTitle);
  //       headingTitleNew = headingTitle.split("(")[1];
  //       console.log("headingTitleNew", headingTitleNew);
  //       setTitle(headingTitleNew.split(")"));
  //       console.log("titile condition", title);
  //     } else {
  //       console.log("else part");
  //     }
  //   }
  //   setTitle(headingTitleNew);
  // }, []);

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
    dispatch(
      getCrashFreeUsersData(code, stackArrayNew[0], projectCodeAnalytics)
    );
    dispatch(
      getCrashAnalyticsData(code, stackArrayNew[0], projectCodeAnalytics)
    );
    dispatch(
      getLogMsgOccurenceWRTDate({
        code,
        startDate: date.start,
        endDate: date.end,
        logMsg: stackArrayNew[0],
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
          lg={10}
          s
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
            <Col>
              {console.log("title render", title)}
              <h2 style={{ fontWeight: "600" }}>{title}</h2>
              <p style={{ fontWeight: "600" }}>{subTitle}</p>
            </Col>

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
              <p
                style={{
                  color: "black",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                }}
              >
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
