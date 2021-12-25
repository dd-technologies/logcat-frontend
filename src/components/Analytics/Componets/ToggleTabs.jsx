import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./ToggleTabs.module.scss";
import CustomCard from "../../../Container/CustomCard";
import EventChart from "../charts/EventChart";

export default function ToggleTabs() {
  // toogling window
  const [devieWindow, setdevieWindow] = useState(true);
  const [opratingSystemWindow, setOpratingSystemWindow] = useState(null);

  const DeviceShowFun = () => {
    setdevieWindow(true);
    setOpratingSystemWindow(null);
  };
  const opratingSystemFun = () => {
    setOpratingSystemWindow(true);
    setdevieWindow(null);
  };

  return (
    <>
      <CustomCard>
        {/* {toggle menu} */}

        <Row className={`${Style.ToggleTabs}`}>
          <Col
            className={
              devieWindow ? `${Style.ToggleTabs_active}` : `${Style.ToggleTabs}`
            }
          >
            <p className="p-2" onClick={DeviceShowFun}>
              Devices
            </p>
          </Col>
          <Col
            className={
              opratingSystemWindow
                ? `${Style.ToggleTabs_active}`
                : `${Style.ToggleTabs}`
            }
          >
            <p className="p-2" onClick={opratingSystemFun}>
              Operating System
            </p>
            <h3></h3>
          </Col>
        </Row>

        {/* data from toggle */}
        <Row>
          {devieWindow ? (
            <Col className="p-4">
              <section className={Style.DataTogleSection}>
                Device Window
              </section>
            </Col>
          ) : opratingSystemWindow ? (
            <Col className="p-4">
              <section className={Style.DataTogleSection}>
                <EventChart />
              </section>
            </Col>
          ) : null}
        </Row>
      </CustomCard>
    </>
  );
}
