import React from "react";
import Style from "./CrashFreeStatic.module.scss";
import { Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CarshFreeStaticsGraph from "../charts/CarshFreeStaticsGraph";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import CustomCard from "../../../Container/CustomCard";
export default function CrashFreeStatics() {
  return (
    <>
      <CustomCard>
        <Row className="p-3">
          <Col xl={12} className={Style.Statics}>
            <h5>Crash free Statics</h5>
            <section className={Style.StaticsSection}>
              <p>Crash free users</p>
              <section>
                <FontAwesomeIcon icon={faQuestion} />
              </section>
            </section>
            <h4>86.21%</h4>
          </Col>
          <Col xl={12}>
            <CarshFreeStaticsGraph />
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
