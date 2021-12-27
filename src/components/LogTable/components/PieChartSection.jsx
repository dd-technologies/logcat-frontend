import React from "react";
import PieChartDataGraph from "../charts/PieChartDataGraph";
import CustomCard from "../../../Container/CustomCard";
import Style from "./PieChartSection.module.scss";
import { Col, Row } from "react-bootstrap";

export default function PieChartSection() {
  return (
    <>
      <CustomCard>
        <Row className="p-3">
          <Col xl={12} className={Style.PieChartData}>
            <h5>Chart Data</h5>
            <p>Data Info</p>
          </Col>
          <Col>
            <section className={`${Style.Infosection} p-4`}>
              <section className={Style.Outsection}>
                <section>
                  <p>Crashes</p>
                  <h4>3</h4>
                  <p>-40%</p>
                </section>
                <section>
                  <p className="ps-3">Users</p>
                  <h4 className="ps-3">0</h4>
                  <p className="ps-3">0%</p>
                </section>
              </section>
              <section className={Style.Outsection}>
                <section>
                  <p>Crashes</p>
                  <h4>3</h4>
                  <p>-40%</p>
                </section>
                <section>
                  <p className="ps-3">Users</p>
                  <h4 className="ps-3">0</h4>
                  <p className="ps-3">0%</p>
                </section>
              </section>
            </section>
          </Col>
          <Col>
            <PieChartDataGraph />
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
