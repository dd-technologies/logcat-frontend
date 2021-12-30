import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./ToggleTabs.module.scss";
import CustomCard from "../../../Container/CustomCard";
import EventChart from "../charts/EventChart";
import DeviceChart from "../charts/DeviceChart";
import { Line } from "rc-progress";

export default function ToggleTabs() {
  // toogling window
  const [devieWindow, setdevieWindow] = useState(true);
  const [opratingSystemWindow, setOpratingSystemWindow] = useState(null);

  const DeviceShowFun = () => {
    setdevieWindow(!devieWindow);
    setOpratingSystemWindow(null);
  };
  const opratingSystemFun = () => {
    setOpratingSystemWindow(!opratingSystemWindow);
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
            onClick={DeviceShowFun}
          >
            <p className="p-2">Devices</p>
          </Col>
          <Col
            className={
              opratingSystemWindow
                ? `${Style.ToggleTabs_active}`
                : `${Style.ToggleTabs}`
            }
            onClick={opratingSystemFun}
          >
            <p className="p-2">Operating System</p>
          </Col>
        </Row>

        {/* data from toggle */}
        <Row>
          {/* DEVICE MENUS */}
          {devieWindow ? (
            <Col className="p-4">
              <section className={Style.DataTogleSection}>
                <p className="mt-4">
                  <span className="p-2">60%</span>Andorid
                </p>
                <Line percent="10" strokeWidth="4" strokeColor="#257d7c" />
              </section>
            </Col>
          ) : opratingSystemWindow ? (
            // OS MENUS
            <Col className="p-4">
              <section className={Style.DataTogleSection}>
                <p className="mt-4">
                  <span className="p-2">60%</span>Andorid
                </p>
                <Line percent="10" strokeWidth="4" strokeColor="#257d7c" />
                <p className="mt-4">
                  <span className="p-2">60%</span>Andorid
                </p>
                <Line percent="30" strokeWidth="4" strokeColor="#257d7c" />
                <p className="mt-4">
                  <span className="p-2">60%</span>Andorid
                </p>
                <Line percent="90" strokeWidth="4" strokeColor="#257d7c" />
              </section>
            </Col>
          ) : null}
        </Row>
      </CustomCard>
    </>
  );
}
