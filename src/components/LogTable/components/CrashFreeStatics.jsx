import React, { useState } from "react";
import Style from "./CrashFreeStatic.module.scss";
import { Row, Col, Card, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CarshFreeStaticsGraph from "../charts/CarshFreeStaticsGraph";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import CustomCard from "../../../Container/CustomCard";
import CustomeDropDown from "../../../Container/DropDown";
export default function CrashFreeStatics() {
  const [showTooltipCrash, setShowTooltipCrash] = useState(false);
  // tooltip in onFocus
  const showToolTips = () => {
    setShowTooltipCrash(true);
  };

  const hidToolTips = () => {
    setShowTooltipCrash(false);
  };

  return (
    <>
      <CustomCard >
        <Row className="p-3">
          <Col xl={12} className={Style.Statics}>
            <h5>Crash free Statics</h5>
            <section className={Style.StaticsSection}>
              <p>Crash free users</p>
              <section className={Style.Tooltip}>
                <FontAwesomeIcon
                  icon={faQuestion}
                  onMouseEnter={showToolTips}
                  onMouseLeave={hidToolTips}
                />
              </section>
            </section>
            {showTooltipCrash ? (
              <CustomeDropDown width="auto">
                <p>this is the tooltip example with no plugin used</p>
              </CustomeDropDown>
            ) : null}
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
