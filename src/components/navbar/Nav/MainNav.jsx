import React from "react";
import { Dropdown, Row, Col } from "react-bootstrap";
import Style from "./MainNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faQuestion } from "@fortawesome/free-solid-svg-icons";

export default function MainNav() {
  return (
    <>
      <Row>
        <Col xl={12} className={Style.MainNav}>
          {/* project avilables */}
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">AgvaProject</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <section className={Style.OuterInfoSection}>
            <p>Go to Docs</p>
            <FontAwesomeIcon icon={faBell} />
            <section className={Style.Avtar}>
              <p>AS</p>
            </section>
          </section>
        </Col>
      </Row>

      {/* project details */}
      <Row className="mt-4">
        <Col xl={12} className={Style.projectDetails}>
          {/*project Name  */}
          <seciton className={Style.projectDetailsInner}>
            <h1>Agva Pro</h1>
            <Dropdown className="ms-4">
              <Dropdown.Toggle id="dropdown-basic">AgvaProject</Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </seciton>
          <section className={Style.questionSection}>
            <FontAwesomeIcon icon={faQuestion} />
          </section>
        </Col>
      </Row>
    </>
  );
}
