import React from "react";
import Style from "./CrashFreeStatic.module.css";
import { Row, Col } from "react-bootstrap";
import CarshFreeStaticsGraph from "../charts/CarshFreeStaticsGraph";
import CustomCard from "../../../Container/CustomCard";
import { useSelector } from "react-redux";
export default function CrashFreeStatics() {
  
  const getCrashFreeUsersReducer = useSelector(
    (state) => state.getCrashFreeUsersReducer
  );
  const { data } = getCrashFreeUsersReducer;

  return (
    <>
      <CustomCard>
        <Row className="p-3">
          <Col xl={12} className={Style.Statics}>
            <h5
              className="cpactiveText"
              style={{
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              Crash free Users Statistics
            </h5>
            <p className="darkModeColor">Crash free users</p>
            <h4 style={{ fontWeight: 700 }}>{data && data.count}</h4>
          </Col>
          <Col xl={12}>
            <CarshFreeStaticsGraph />
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
