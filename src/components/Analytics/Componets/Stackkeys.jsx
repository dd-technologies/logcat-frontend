import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./Stackkeys.module.scss";

export default function Stackkeys() {
  const [eventOne, setEventOne] = useState({
    event1: true,
    event2: false,
    event3: false,
    event4: false,
  });

  const EventOne = () => {
    setEventOne({
      event1: true,
      event2: false,
      event3: false,
      event4: false,
    });
  };
  const EventTwo = () => {
    setEventOne({ event1: false, event2: true, event3: false, event4: false });
  };
  const EventThree = () => {
    setEventOne({ event1: false, event2: false, event3: true, event4: false });
  };
  const EventFour = () => {
    setEventOne({ event1: false, event2: false, event3: false, event4: true });
  };

  return (
    <>
      <Row className="pt-2">
        <Col>
          <setcion className={Style.MainDiv}>
            <p
              className={
                eventOne.event1 ? `${Style.activeOpt}` : `${Style.nonActive}`
              }
              onClick={EventOne}
            >
              Event Summery
            </p>
            <p
              className={
                eventOne.event2 ? `${Style.activeOpt}` : `${Style.nonActive}`
              }
              onClick={EventTwo}
            >
              250c.50800
            </p>
            <p
              className={
                eventOne.event3 ? `${Style.activeOpt}` : `${Style.nonActive}`
              }
              onClick={EventThree}
            >
              80.080
            </p>
            <p
              className={
                eventOne.event4 ? `${Style.activeOpt}` : `${Style.nonActive}`
              }
              onClick={EventFour}
            >
              Lenovo
            </p>
          </setcion>
          <hr />
        </Col>
      </Row>
    </>
  );
}
