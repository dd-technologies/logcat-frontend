import React, { useState } from "react";
import Style from "./CrashFreeStatic.module.scss";
import { Row, Col, Card, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CarshFreeStaticsGraph from "../charts/CarshFreeStaticsGraph";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import CustomCard from "../../../Container/CustomCard";
import CustomeDropDown from "../../../Container/DropDown";
import { useSelector } from "react-redux";
export default function CrashFreeStatics() {
  const [showTooltipCrash, setShowTooltipCrash] = useState(false);
  // tooltip in onFocus
  const showToolTips = () => {
    setShowTooltipCrash(true);
  };

  const hidToolTips = () => {
    setShowTooltipCrash(false);
  };

  // static demoUrl = 'https://codesandbox.io/s/area-chart-in-responsive-container-e6dx0';
  const getCrashFreeUsersReducer = useSelector(
    (state) => state.getCrashFreeUsersReducer
  );

  const { loading, data } = getCrashFreeUsersReducer;
  let totalCount = 0;
  if (data && data.response) {
    data.response.map((items) => (totalCount += items.countLog));
  }
  if (data && data.response == []) {
    totalCount = null;
  }

  return (
    <>
      <CustomCard>
        <Row className="p-3">
          <Col xl={12} className={Style.Statics}>
            <h5>Crash free Statistics </h5>
            <section className={Style.StaticsSection}>
              <p>Crash free users</p>
              {/* <section className={Style.Tooltip}>
                <FontAwesomeIcon
                  icon={faQuestion}
                  onMouseEnter={showToolTips}
                  onMouseLeave={hidToolTips}
                />
              </section> */}
            </section>
            {showTooltipCrash ? (
              <CustomeDropDown width="auto">
                <p>this is the tooltip example with no plugin used</p>
              </CustomeDropDown>
            ) : null}
            <h4>{totalCount}</h4>
          </Col>
          <Col xl={12}>
            <CarshFreeStaticsGraph />
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
