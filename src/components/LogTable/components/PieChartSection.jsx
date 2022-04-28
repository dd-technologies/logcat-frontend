import React from "react";
import PieChartDataGraph from "../charts/PieChartDataGraph";
import CustomCard from "../../../Container/CustomCard";
import Style from "./PieChartSection.module.scss";
import { Col, Row } from "react-bootstrap";

export default function PieChartSection(props) {
  return (
    <>
      <CustomCard>
        <Row className="p-3">
          <Col xl={12} md={12} className={Style.PieChartData}>
            <h5
              className="cpactiveText"
              style={{
                fontWeight: 700,
              }}
            >
              Chart Data
            </h5>
          </Col>
          <Col xl={12} md={12}>
            <PieChartDataGraph />
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
