import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import Style from "./TrandData.module.scss";
import CarshFreeStaticsGraph from "../charts/CarshFreeStaticsGraph";
import CardMain from "../../../Container/CardMain";

export default function TrandData() {
  return (
    <>
      <CardMain>
        <Row className="p-3">
          <Col xl={12} className={Style.Trand}>
            <h5> Trands</h5>
            <p>
              <span className="p-2">
                <FontAwesomeIcon icon={faRocket} />
              </span>
              Letest Release
            </p>
          </Col>
          <Col xl={12} className={Style.TrandsDataTable}>
            <section className={Style.Outsection}>
              <section>
                <p>Crashes</p>
                <h3>3</h3>
                <p>-40%</p>
              </section>
              <section>
                <p>Users</p>
                <h3>0</h3>
                <p>0%</p>
              </section>
            </section>
            <section className={Style.Outsection}>
              <section>
                <p>Non-fatals</p>
                <h3>0</h3>
              </section>
              <section>
                <p>Users</p>
                <p>0</p>
              </section>
            </section>
            <section className={Style.Outsection}>
              <section>
                <p>
                  Arns <span>*icons</span>
                </p>
                <h3>0</h3>
              </section>
              <section>
                <p>Users</p>
                <h3>0</h3>
              </section>
            </section>
          </Col>
          <Col>
            <CarshFreeStaticsGraph />
          </Col>
        </Row>
      </CardMain>
    </>
  );
}
