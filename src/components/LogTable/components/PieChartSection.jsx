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
            <h5 style={{ fontWeight: 700, color: "#535353", letterSpacing: "0.5px" }}>Chart Data</h5>
            {/* <p>Data Info</p> */}
          </Col>
          <Col xl={12} md={12}>
            <PieChartDataGraph />
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
