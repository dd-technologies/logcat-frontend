import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import CustomCard from "../../../Container/CustomCard";
import EventByVersionChart from "../charts/EventByVersionChart";
import { useSelector } from "react-redux";
import Spinner from "../../../Container/Spinner";

export default function EventByVersion() {
  const getCrashAnalyticsDataReducer = useSelector(
    (state) => state.getCrashAnalyticsDataReducer
  );
  const { loading: ld, data: alldata } = getCrashAnalyticsDataReducer;
  let cnt = alldata && alldata.versionResponse ? alldata.versionResponse : null;

  console.log("cnt", cnt)

  let adds = 0;
  if (cnt) { cnt.map((e) => (adds += e.countLog)); }
  if (cnt == null) { cnt = [] }
  // console.log("alldata", alldata);
  return (
    <>
      <CustomCard>
        <Row className="p-4">
          <Col xl={4}>
            <p>Total events by version</p>


            {/*CHECKING FOR NOW IF NOT HAVING THE VALUE OF MAP */}

            {!ld ? (
              cnt.map((e) => (
                <>
                  <p>{e._id ? e._id : null}</p>
                  <h4>{e.countLog}</h4>
                </>
              ))
            ) : (
              <Spinner height="280px" />
            )}
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
