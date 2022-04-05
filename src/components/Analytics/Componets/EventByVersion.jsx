import React from "react";
import { Row, Col } from "react-bootstrap";
import CustomCard from "../../../Container/CustomCard";
import EventByVersionChart from "../charts/EventByVersionChart";
import { useSelector } from "react-redux";
import Spinner from "../../../Container/Spinner";
import Style from "./EventByVersion.module.scss";

export default function EventByVersion() {
  const getCrashAnalyticsDataReducer = useSelector(
    (state) => state.getCrashAnalyticsDataReducer
  );
  const { loading: ld, data: alldata } = getCrashAnalyticsDataReducer;
  console.log("first", getCrashAnalyticsDataReducer);

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
              style={{
                fontWeight: "600",
                letterSpacing: "0.5px",
                color: JSON.parse(localStorage.getItem("darkMood"))
                  ? "#fff"
                  : "#000",
              }}
            >
              Total events by version
            </h6>

            {/*CHECKING FOR NOW IF NOT HAVING THE VALUE OF MAP */}
            {console.log("cnt", cnt)}

            {!ld ? (
              cnt.map((e) => (
                <>
                  <p
                    style={{
                      color: JSON.parse(localStorage.getItem("darkMood"))
                        ? "#fff"
                        : "#666",
                    }}
                  >
                    {e._id ? e._id : null}
                  </p>
                  <h5
                    style={{
                      color: JSON.parse(localStorage.getItem("darkMood"))
                        ? "#fff"
                        : "#000",
                    }}
                  >
                    {e.data}
                  </h5>
                </>
              ))
            ) : (
              <Spinner height="280px" />
            )}
          </Col>
          <Col xl={8} md={8} style={{ padding: "0px" }}>
            <p
              style={{
                float: "right",
                color: JSON.parse(localStorage.getItem("darkMood"))
                  ? "#fff"
                  : "#666",
              }}
              className={Style.Last90days}
            >
              from the last 90 days
            </p>
            <EventByVersionChart height="200px" />
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
