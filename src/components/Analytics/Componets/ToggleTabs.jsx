import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./ToggleTabs.module.scss";
import CustomCard from "../../../Container/CustomCard";
import EventChart from "../charts/EventChart";
import DeviceChart from "../charts/DeviceChart";
import { Line } from "rc-progress";
import { useSelector } from "react-redux";

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

  // const getErrorWRTVersionReducer = useSelector(state => state.getErrorWRTVersionReducer)
  // const {loading:ld,data :alldata} = getErrorWRTVersionReducer;
  // const cnt = alldata && alldata.typeWiseCount ? alldata.typeWiseCount : null;

  const getErrorWRTOSReducer = useSelector(state => state.getErrorWRTOSReducer)
  const { loading, data } = getErrorWRTOSReducer

  const piCount =
    data && data.typeWiseCount
      ? data.typeWiseCount
      : null;
  let add=0;
  if (piCount) {
    piCount.map(e=>add+=e.count);
    piCount.map(e=>console.log((e.count/add)*100))
  }

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

                {/* {
                  cnt.map(e=>(<>
                  <p className="mt-4">
                  <span className="p-2"></span>{e._id ? e._id:'Other'}
                  </p>
                  <Line percent={e.count} strokeWidth="4" strokeColor="#257d7c" />
                  </>))
                } */}

                <p className="mt-4">
                  <span className="p-2"></span>Andorid
                </p>
                <Line percent="10" strokeWidth="4" strokeColor="#257d7c" />
              </section>
            </Col>
          ) : opratingSystemWindow ? (
            // OS MENUS
            <Col className="p-4">
              <section className={Style.DataTogleSection}>
                {
                  !loading ? piCount.map(e=>(<>
                        <p className="mt-4">
                      <span className="p-2">{parseFloat((e.count/add)*100).toFixed(2)}</span>{e._id? e._id:"Other"}
                    </p>
                    <Line percent={(e.count/add)*100} strokeWidth="4" strokeColor="#257d7c" />
                </>
                  )) : 'Loading'
                }
              </section>
            </Col>
          ) : null}
        </Row>
      </CustomCard>
    </>
  );
}
