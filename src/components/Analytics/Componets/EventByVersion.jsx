import React, { useEffect } from "react";
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
  let cnt = alldata && alldata.versionResponse ? alldata.versionResponse : null;

  // console.log("cnt", cnt)

  let adds = 0;
  if (cnt) {
    cnt.map((e) => (adds += e.data));
  }
  if (cnt == null) {
    cnt = [];
  }
  // console.log("alldata", alldata);
  return (
    <>
      <CustomCard height="350px">
        <Row className="p-4">
          <Col xl={4} className={Style.EventByVersion}>
            <h6 style={{ fontWeight : '600'}}>Total events by version</h6>

            {/*CHECKING FOR NOW IF NOT HAVING THE VALUE OF MAP */}

            {!ld ? (
              cnt.map((e) => (
                <>
                  <p style={{color: "#666"}}>{e._id ? e._id : null}</p>
                  <h5>{e.data}</h5>
                </>
              ))
            ) : (
              <Spinner height="280px" />
            )}
          </Col>
          <Col xl={8}>
            <p className={Style.Last90days}>from the last 90 days</p>
            <EventByVersionChart height="200px" />
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
