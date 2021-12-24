import React from "react";
import CardMain from "../../../../Container/CardMain";
import { Row, Col } from "react-bootstrap";
import EventChart from "./chart/EventChart";

export default function EventByVersion() {
  return (
    <>
      <CardMain>
        <Row className="p-4">
          <Col xl={4}>
            <p>Total events by version</p>
            <p>2.35.4.55</p>
            <h4>5</h4>
          </Col>
          <Col xl={8}>
            <section>
              <p>from the last 7 days</p>
              <EventChart />
            </section>
          </Col>
        </Row>
      </CardMain>
    </>
  );
}
