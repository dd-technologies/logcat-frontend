import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./ToggleTabs.module.scss";
import CustomCard from "../../../Container/CustomCard";
import { Line } from "rc-progress";
import { useSelector } from "react-redux";
import Spinner from "../../../Container/Spinner";

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
  let modelNamecnt =
    alldata && alldata.modelNameResponse ? alldata.modelNameResponse : null;
  let modelNameAdds = 0;
  if (modelNamecnt) {
    modelNamecnt.map((e) => (modelNameAdds += e.data));
  }
  if (modelNamecnt == null) {
    modelNamecnt = [];
  }

  let osNamecnt =
    alldata && alldata.osArchitectureResponse
      ? alldata.osArchitectureResponse
      : null;
  let osNameAdds = 0;
  if (osNamecnt) {
    osNamecnt.map((e) => (osNameAdds += e.data));
  }
  if (osNamecnt == null) {
    osNamecnt = [];
  }

  const getErrorWRTOSReducer = useSelector(
    (state) => state.getErrorWRTOSReducer
  );
  const { data } = getErrorWRTOSReducer;

  let piCount = data && data.typeWiseCount ? data.typeWiseCount : null;

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
            <p
              style={{ fontWeight: "600", letterSpacing: "0.5px" }}
              className="p-2"
            >
              Devices
            </p>
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
            <p
              style={{ fontWeight: "600", letterSpacing: "0.5px" }}
              className="p-2"
            >
              Operating System
            </p>
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
                  modelNamecnt.map((e) => (
                    <>
                      <p
                        className="mt-4 AYp"
                        style={{
                          color: JSON.parse(localStorage.getItem("darkMood"))
                            ? "#fff"
                            : "#000",
                        }}
                      >
                        <span className="p-2">
                          {parseFloat((e.data / modelNameAdds) * 100).toFixed(
                            2
                          )}
                          %
                        </span>
                        {e._id ? e._id : "Other"}
                      </p>
                      <Line
                        percent={(e.data / modelNameAdds) * 100}
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
                {!ld ? (
                  osNamecnt.map((e) => (
                    <>
                      <p
                        className="mt-4 AYp"
                        style={{
                          color: JSON.parse(localStorage.getItem("darkMood"))
                            ? "#fff"
                            : "#666",
                        }}
                      >
                        <span className="p-2">
                          {parseFloat((e.data / osNameAdds) * 100).toFixed(2)}%
                        </span>
                        {e._id ? e._id : "Other"}
                      </p>
                      <Line
                        percent={(e.data / osNameAdds) * 100}
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
