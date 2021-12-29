import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CustomCard from "../../../Container/CustomCard";
import { getLogMsgOccurenceWRTDate } from "../../../redux/action/ProjectAction";
import EventByVersionChart from "../charts/EventByVersionChart";

export default function EventByVersion() {
  const dispatch = useDispatch();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let code = urlParams.get("code");

  console.log("code", code);
  let logMsg = urlParams.get("col").split("at")[0].trim();

  useEffect(() => {
    dispatch(getLogMsgOccurenceWRTDate(code, null, null, logMsg));
  }, []);

  return (
    <>
      <CustomCard>
        <Row className="p-4">
          <Col xl={4}>
            <p>Total events by version</p>
            <p>2.35.4.55</p>
            <h4>5</h4>
          </Col>
          <Col xl={8}>
            <section>
              <p>from the last 7 days</p>
              <EventByVersionChart code={code} logMsg={logMsg} />
            </section>
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
