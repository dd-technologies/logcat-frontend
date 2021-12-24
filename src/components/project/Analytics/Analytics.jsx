import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import MainNav from "../../navbar/Nav/MainNav";
import SideNav from "../../navbar/Sidebar/SideNav";
import EventData from "./Event/EventData";
import EventByVersion from "./EventByVersion/EventByVersion";
import ToggleTabs from "./ToggleTab.jsx/ToggleTabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";
import Style from "./Analytics.module.scss";

export default function Analytics() {
  return (
    <>
      {/* sideBar */}
      <Row>
        <Col xl={2} lg={2} sm={2}>
          <SideNav />
        </Col>

        {/* withNavbarRow */}
        <Col xl={10} lg={10} sm={10}>
          <MainNav />

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
              <section>
                <FontAwesomeIcon icon={faLessThan} />
                <FontAwesomeIcon icon={faGreaterThan} />
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
