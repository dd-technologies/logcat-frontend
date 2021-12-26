import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faDatabase } from "@fortawesome/free-solid-svg-icons";
import Style from "./TrandData.module.scss";
import CarshFreeStaticsGraph from "../charts/CarshFreeStaticsGraph";
import CustomCard from "../../../Container/CustomCard";

export default function TrandData() {
  return (
    <>
      <CustomCard>
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
                <p className="ps-3">Users</p>
                <h3 className="ps-3">0</h3>
                <p className="ps-3">0%</p>
              </section>
            </section>
            <section className={Style.Outsection}>
              <section>
                <p className="ps-3">Non-fatals</p>
                <h3 className="ps-3">0</h3>
              </section>
              <section>
                <p className="ps-3">Users</p>
                <h3 className="h3s-1">0</h3>
              </section>
            </section>
            <section className={Style.Outsection}>
              <section>
                <p className="ps-3">Arns</p>
                <h3 className="ps-3">0</h3>
              </section>
              <section>
                <p className="ps-3">Users</p>
                <h3 className="ps-3">0</h3>
              </section>
            </section>
          </Col>
          <Col>
            <CarshFreeStaticsGraph />
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
