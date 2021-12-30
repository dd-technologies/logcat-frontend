import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import CustomCard from "../../../Container/CustomCard";
import EventByVersionChart from "../charts/EventByVersionChart";
import { useSelector } from "react-redux";

export default function EventByVersion() {
  const getCrashAnalyticsDataReducer = useSelector(state => state.getCrashAnalyticsDataReducer)
  const {loading:ld,data :alldata} = getCrashAnalyticsDataReducer;
  const cnt = alldata && alldata.versionResponse ? alldata.versionResponse : null;
  let adds=0;
  if (cnt) {
    cnt.map(e=>adds+=e.countLog);
  }
  console.log(alldata)
  return (
    <>
      <CustomCard>
        <Row className="p-4">
          <Col xl={4}>
            <p>Total events by version</p>
            {
              !ld ? cnt.map(e=>(<>
                <p>{e._id}</p>
              <h4>{e.countLog}</h4>
              </>
              )):'Loading'
            }
            
          </Col>
          <Col xl={8}>
            <section>
              <p>from the last 90 days</p>
              <EventByVersionChart />
            </section>
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
