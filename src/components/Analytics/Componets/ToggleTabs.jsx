import React from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./ToggleTabs.module.scss";
import CustomCard from "../../../Container/CustomCard";

export default function ToggleTabs() {
  return (
    <>
      <CustomCard>
        {/* {toggle menu} */}

        <Row className={`${Style.ToggleTabs}`}>
          <Col className={Style.ToggleTabs_active}>
            <p className="p-2">Devices</p>
            <h4></h4>
          </Col>
          <Col>
            <p className="p-2">Operating System</p>
            <h4></h4>
          </Col>
        </Row>

        {/* data from toggle */}
        <Row>
          <Col className="p-4">
            <section></section>
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
