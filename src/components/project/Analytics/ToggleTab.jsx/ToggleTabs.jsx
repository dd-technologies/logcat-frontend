import React from "react";
import CardMain from "../../../../Container/CardMain";
import { Row, Col } from "react-bootstrap";
import Style from "./ToggleTabs.module.scss";
import ToggleTabChart from "./charts/ToggleTabsChart";

export default function ToggleTabs() {
  return (
    <>
      <CardMain>
        {/* {toggle menu} */}

        <Row className={`${Style.ToggleTabs}`}>
          <Col className={Style.ToggleTabs_active}>
            <p>Devices</p>
            <h4></h4>
          </Col>
          <Col>
            <p>Operating System</p>
            <h4></h4>
          </Col>
        </Row>

        {/* data from toggle */}
        <Row>
          <Col>
            <section>
              <ToggleTabChart />
            </section>
          </Col>
        </Row>
      </CardMain>
    </>
  );
}
