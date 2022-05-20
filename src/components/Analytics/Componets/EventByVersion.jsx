import React from "react";
import { Row, Col } from "react-bootstrap";
import CustomCard from "../../../Container/CustomCard";
import EventByVersionChart from "../charts/EventByVersionChart";
import { useSelector } from "react-redux";
import SpinnerCustome from "../../../Container/SpinnerCustome";
import Style from "./EventByVersion.module.css";
import { ThemeContext } from "../../../utils/ThemeContext";

export default function EventByVersion() {
  const getCrashAnalyticsDataReducer = useSelector(
    (state) => state.getCrashAnalyticsDataReducer
  );
  const { theme } = React.useContext(ThemeContext);
  const { loading: ld, data: alldata } = getCrashAnalyticsDataReducer;
  // console.log("datafield", getCrashAnalyticsDataReducer);
  let cnt = alldata && alldata.versionResponse ? alldata.versionResponse : null;
  let adds = 0;
  if (cnt) {
    cnt.map((e) => (adds += e.data));
  }
  if (cnt == null) {
    cnt = [];
  }
  return (
    <>
      <CustomCard height="350px">
        <Row className="p-4">
          <Col xl={4} md={4} className={Style.EventByVersion}>
            <h6
              className="cpactiveText mb-1"
              style={{
                fontWeight: "600",
                letterSpacing: "0.5px",
                color: "#0099a4",
              }}
            >
              Total events by version
            </h6>

            {/*CHECKING FOR MAP VALUE */}
            {alldata &&
              alldata.versionResponse &&
              alldata.versionResponse.length == 0 && (
                <p
                  className="mb-1"
                  style={{
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: theme == "dark-content" ? `#fff` : `#000`,
                  }}
                >
                  No data found
                </p>
              )}
            {!ld &&
              cnt.map((e) => (
                <>
                  <p className="darkModeColor mb-1">{e._id ? e._id : null}</p>
                  <h5 className="darkModeColor mb-1">{e.data}</h5>
                </>
              ))}

            {ld && <SpinnerCustome height="270px" />}
          </Col>
          <Col xl={8} md={8} style={{ padding: "0px" }}>
            <p
              style={{
                float: "right",
              }}
              className={`${Style.Last90days} cpactiveText`}
            >
              from the last 90 days
            </p>
            {alldata &&
              alldata.versionResponse[0] &&
              alldata.versionResponse[0].data && (
                <EventByVersionChart height="200px" />
              )}

            {alldata &&
              alldata.versionResponse &&
              alldata.versionResponse.length == 0 && (
                <p
                  style={{
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: theme == "dark-content" ? `#fff` : `#000`,
                  }}
                >
                  No data found
                </p>
              )}

            {ld && <SpinnerCustome height="280px" />}
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
