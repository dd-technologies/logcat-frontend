import React from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./Stack_keys.module.scss";

export default function Stack_keys() {
  return (
    <>
      <Row className="p-4">
        <Col>
          <setcion className={Style.MainDiv}>
            <p>Event Summery</p>
            <p>250c.50800</p>
            <p>80.080</p>
            <p>Lenovo</p>
          </setcion>
        </Col>
      </Row>
    </>
  );
}
