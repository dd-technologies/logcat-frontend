import React from "react";
import Style from "./SideNav.module.scss";
import { Image, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCog } from "@fortawesome/free-solid-svg-icons";

export default function SideNav() {
  return (
    <>
      <section className={Style.SideNav}>
        <Row>
          <Col xl={12}>
            <section className={Style.componysec}>
              {/* companoy logo */}
              <Image src="/assets/images/DD.png" />
              <h4>D&D technology</h4>
            </section>
          </Col>
        </Row>

        {/* project section */}

        <Row></Row>

      </section>
    </>
  );
}
