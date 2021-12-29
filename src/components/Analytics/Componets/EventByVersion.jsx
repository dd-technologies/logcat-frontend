import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import CustomCard from "../../../Container/CustomCard";
import EventByVersionChart from "../charts/EventByVersionChart";

export default function EventByVersion() {
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
              <EventByVersionChart />
            </section>
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
