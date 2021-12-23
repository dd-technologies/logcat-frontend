import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardMain from "../../../../Container/CardMain";
import Style from "./CreateProject.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch,
  faPlus,
  faCity,
} from "@fortawesome/free-solid-svg-icons";
export default function CreateProject() {
  return (
    <>
      <section className={Style.backgroundSection}></section>
      <Container className={Style.MainContantainer}>
        <p className={Style.para}>Your Projects</p>
        <Row>
          <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
            <CardMain>
              <section className={Style.addProject}>
                <section>
                  <p>
                    <FontAwesomeIcon icon={faPlus} />
                  </p>
                  <p>Add Project</p>
                </section>
              </section>
            </CardMain>
          </Col>

          {/* dynamic projects */}

          <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
            <CardMain>
              <Row>
                <Col xl={12} className={Style.InfoColumn}>
                  <h4>Agva Advanced</h4>
                  <p>agva Advanced</p>
                </Col>
                <Col xl={12} className={Style.InfoDetails}>
                  <p>
                    <FontAwesomeIcon icon={faCodeBranch} />
                  </p>
                  <p>
                    <span>
                      <FontAwesomeIcon icon={faCity} />
                    </span>
                    agvaadvanced.com
                  </p>
                </Col>
              </Row>
            </CardMain>
          </Col>
        </Row>
      </Container>
    </>
  );
}
