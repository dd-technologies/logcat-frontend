import React from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./TrandData.module.scss";
import CustomCard from "../../../Container/CustomCard";
import TrandDataGraph from "../charts/TrandDataGraph";
import { useSelector } from "react-redux";

export default function TrandData() {
  const getLogCountsByDateReducer = useSelector(
    (state) => state.getLogCountsByDateReducer
  );
  const { data } = getLogCountsByDateReducer;
  const LineCount =
    data && data.data && data.data.response ? data.data.response : null;

  let add = 0;
  if (data && data.data && data.data.response) {
    LineCount.map((sum) => (add += sum.data));
  }

  return (
    <>
      <CustomCard>
        <Row className="p-3">
          <Col xl={12} className={Style.Trand}>
            <h5
              className="cpactiveText"
              style={{
                fontWeight: 700,

                letterSpacing: "0.5px",
              }}
            >
              Trends
            </h5>
          </Col>
          <Col xl={12} className={Style.TrandsDataTable}>
            <section className={Style.Outsection}>
              <section>
                <p className="LTp">Crashes</p>
                <h4 style={{ fontWeight: 700 }}>{add}</h4>
              </section>
              <section className="ms-4">
                <p className="LTp">Users</p>
                {data && data.data && data.data.count ? (
                  <h4 style={{ fontWeight: 700 }}>
                    {data && data.data && data.data.count}
                  </h4>
                ) : (
                  <h4 style={{ fontWeight: 700 }}>0</h4>
                )}
              </section>
              <section></section>
            </section>
          </Col>
          <Col>
            <TrandDataGraph />
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
