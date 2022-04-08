import React from "react";
import Style from "./CrashFreeStatic.module.scss";
import { Row, Col } from "react-bootstrap";
import CarshFreeStaticsGraph from "../charts/CarshFreeStaticsGraph";
import CustomCard from "../../../Container/CustomCard";
import { useSelector } from "react-redux";
export default function CrashFreeStatics() {
  // static demoUrl = 'https://codesandbox.io/s/area-chart-in-responsive-container-e6dx0';
  const getCrashFreeUsersReducer = useSelector(
    (state) => state.getCrashFreeUsersReducer
  );

  const { data } = getCrashFreeUsersReducer;
  let totalCount = 0;

  if (data && data.response == []) {
    totalCount = null;
  }

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
              Crash free Statistics
            </h5>
            <p className="LTp">Crash free users</p>
            {/* <section className={Style.StaticsSection}>
              {/* <section className={Style.Tooltip}>
                <FontAwesomeIcon
                  icon={faQuestion}
                  onMouseEnter={showToolTips}
                  onMouseLeave={hidToolTips}
                />
              </section> */}
            {/* </section> */}
            {/* {showTooltipCrash ? (
              <CustomeDropDown width="auto">
                <p>this is the tooltip example with no plugin used</p>
              </CustomeDropDown>
            ) : null} */}
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
