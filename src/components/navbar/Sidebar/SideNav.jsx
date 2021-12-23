import React from "react";
import Style from "./SideNav.module.scss";
import { Image, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHome, faCog } from "@fortawesome/free-solid-svg-icons";

export default function SideNav() {
  return (
    <>
      <section className={Style.SideNav}>
        <Row>
          <Col xl={12}>
            <section className={Style.componysec}>
              {/* companoy logo */}
              <Image src="/assets/images/DD.png" />
              <p>D&D technology</p>
            </section>
          </Col>
        </Row>

        {/* project section */}

        <Row className={`${Style.projectSection} mt-4`}>
          <Col xl={12}>
            <Row cla>
              <Col xl={12} className={`${Style.projectSectionCardOuter} mt-4`}>
                <FontAwesomeIcon icon={faHome} />
                <p>Project</p>
                <FontAwesomeIcon icon={faCog} />
              </Col>
              <Col xl={12} className={Style.projectSectionCard}>
                <FontAwesomeIcon icon={faHome} />
                <p>Project</p>
              </Col>
              <Col xl={12} className={Style.projectSectionCard}>
                <FontAwesomeIcon icon={faHome} />
                <p>Project</p>
              </Col>
            </Row>
          </Col>
          {/* project details */}
        </Row>
      </section>
    </>
  );
}
