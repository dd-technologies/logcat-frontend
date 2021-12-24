import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";
import EventByVersion from "./Componets/EventDataWithDate";
import ToggleTabs from "./Componets/ToggleTabs";
import EventData from "./charts/EventData";
import Style from "./Analytics.module.scss";

export default function Analytics() {
  return (
    <>
      {/* sideBar */}
      <Row>
        {/* withNavbarRow */}
        <Col>
          {/* page Data */}
          <Container>
            {/* data from api */}
            <Col className="my-4">
              This issue has *5 crash events* affecting 2 users
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

            {/*data tables  */}
            <Col xl={12} className="mt-4">
              <EventData />
            </Col>
          </Container>
        </Col>
      </Row>
    </>
  );
}
