import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./ToggleTabs.module.scss";
import CustomCard from "../../../Container/CustomCard";
import EventChart from "../charts/EventChart";
import DeviceChart from "../charts/DeviceChart";
import { Line } from "rc-progress";
import { useSelector } from "react-redux";
import Spinner from "../../../Container/Spinner";
import { SetLeftFeature } from "ag-grid-community";

export default function ToggleTabs() {
  // toogling window
  const [devieWindow, setdevieWindow] = useState(true);
  const [opratingSystemWindow, setOpratingSystemWindow] = useState(false);

  const DeviceShowFun = () => {
    setdevieWindow(true);
    setOpratingSystemWindow(false);
  };
  const opratingSystemFun = () => {
    setOpratingSystemWindow(true);
    setdevieWindow(false);
  };

  const getCrashAnalyticsDataReducer = useSelector(
    (state) => state.getCrashAnalyticsDataReducer
  );
  const { loading: ld, data: alldata } = getCrashAnalyticsDataReducer;
  let cnt =
    alldata && alldata.modelNameResponse ? alldata.modelNameResponse : null;
  let adds = 0;
  if (cnt) {
    cnt.map((e) => (adds += e.data));
  }
  if (cnt == null) {
    cnt = [];
  }
  // console.log(alldata);

  const getErrorWRTOSReducer = useSelector(
    (state) => state.getErrorWRTOSReducer
  );
  const { loading, data } = getErrorWRTOSReducer;

  let piCount = data && data.typeWiseCount ? data.typeWiseCount : null;

  // console.log("pieCount", piCount)

  let add = 0;
  if (piCount) {
    piCount.map((e) => (add += e.count));
  }

  return (
    <>
      <CustomCard height="350px">
        {/* {toggle menu} */}

        <Row className={`${Style.ToggleTabs}`}>
          <Col
            xl={6}
            md={6}
            sm={6}
            className={
              devieWindow ? `${Style.ToggleTabs_active}` : `${Style.ToggleTabs}`
            }
            onClick={DeviceShowFun}
          >
            <p className="p-2">Devices</p>
          </Col>
          <Col
            xl={6}
            md={6}
            sm={6}
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
                {/*CHECKING FOR NOW IF NOT HAVING THE VALUE OF MAP */}

                {!ld ? (
                  cnt.map((e) => (
                    <>
                      <p className="mt-4">
                        <span className="p-2">
                          {parseFloat((e.data / adds) * 100).toFixed(2)}%
                        </span>
                        {e._id ? e._id : "Other"}
                      </p>
                      <Line
                        percent={(e.data / adds) * 100}
                        strokeWidth="4"
                        strokeColor="#257d7c"
                      />
                    </>
                  ))
                ) : (
                  <Spinner height="200px" />
                )}
              </section>
            </Col>
          ) : opratingSystemWindow ? (
            // OS MENUS
            <Col className="p-4">
              <section className={Style.DataTogleSection}>
                {!loading ? (
                  piCount.map((e) => (
                    <>
                      <p className="mt-4">
                        <span className="p-2">
                          {parseFloat((e.count / add) * 100).toFixed(2)}%
                        </span>
                        {e._id ? e._id : "Other"}
                      </p>
                      <Line
                        percent={(e.count / add) * 100}
                        strokeWidth="4"
                        strokeColor="#257d7c"
                      />
                    </>
                  ))
                ) : (
                  <Spinner height="200px" />
                )}
              </section>
            </Col>
          ) : null}
        </Row>
      </CustomCard>
    </>
  );
}
