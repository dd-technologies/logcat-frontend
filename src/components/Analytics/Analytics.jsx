import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";
import ToggleTabs from "./Componets/ToggleTabs";
import Style from "./Analytics.module.scss";
import { Navbar, SideBar } from "../../utils/NavSideBar";
import AnalyticsEventDataComp from "./Componets/AnalyticsEventDataComp";
import EventByVersion from "./Componets/EventByVersion";

export default function Analytics() {
  return (
    <>
      <Row>
        <Col xl={2} lg={2} md={2} sm={2}>
          <SideBar />
        </Col>
        <Col xl={10} lg={10} md={10} sm={10}>
          <Navbar />
          <Container style={{ marginTop: "9%", marginBottom: "3%" }}>
            {/* data from api */}
            <Col className="my-4">
              This issue has <strong>5</strong> crash events affecting
              <strong> 2 </strong> users
            </Col>

            <Col>
              <Row>
                <Col xl={8}>
                  <EventByVersion />
                </Col>
                <Col xl={4}>
                  <ToggleTabs />
                </Col>
              </Row>
            </Col>

            <Col className={`${Style.AnalyticsEvents} my-4`}>
              <p>Events</p>
              <section className={Style.PrevNext}>
                <section>
                  <FontAwesomeIcon icon={faLessThan} />
                </section>
                <section>
                  <FontAwesomeIcon icon={faGreaterThan} />
                </section>
              </section>
            </Col>

            {/* data tables   */}
            <Col xl={12} className="mt-4">
              <AnalyticsEventDataComp />
            </Col>
          </Container>
        </Col>
      </Row>
    </>
  );
}
