import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faDatabase } from "@fortawesome/free-solid-svg-icons";
import Style from "./TrandData.module.scss";
import CustomCard from "../../../Container/CustomCard";
import TrandDataGraph from "../charts/TrandDataGraph";
import { useDispatch, useSelector } from "react-redux";

export default function TrandData() {
  const getLogCountsByDateReducer = useSelector(
    (state) => state.getLogCountsByDateReducer
  );
  const { loading, data } = getLogCountsByDateReducer;
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
              style={{
                fontWeight: 700,
                color: JSON.parse(localStorage.getItem("darkMood"))
                  ? "#fff"
                  : "#535353",
                letterSpacing: "0.5px",
              }}
            >
              Trends
            </h5>
            {/* <p>
              <span className="p-2">
                <FontAwesomeIcon icon={faRocket} />
              </span>
              Letest Release
            </p> */}
          </Col>
          <Col xl={12} className={Style.TrandsDataTable}>
            <section className={Style.Outsection}>
              <section>
                <p
                  style={{
                    color: JSON.parse(localStorage.getItem("darkMood"))
                      ? "#fff"
                      : "#535353",
                  }}
                >
                  Crashes
                </p>
                <h4 style={{ fontWeight: 700 }}>{add}</h4>
              </section>
              <section className="ms-4">
                <p
                  style={{
                    color: JSON.parse(localStorage.getItem("darkMood"))
                      ? "#fff"
                      : "#535353",
                  }}
                >
                  Users
                </p>
                {data && data.data && data.data.count ? (
                  <h4 style={{ fontWeight: 700 }}>
                    {data && data.data && data.data.count}
                  </h4>
                ) : (
                  <h4 style={{ fontWeight: 700 }}>0</h4>
                )}
              </section>
              <section>
                {/* <p className="ps-3">Users</p>
                <h4 className="ps-3">0</h4>
                <p className="ps-3">0%</p> */}
              </section>
            </section>
            {/* <section className={Style.Outsection}>
              <section>
                <p className="ps-3">Non-fatals</p>
                <h4 className="ps-3">0</h4>
              </section>
              <section>
                <p className="ps-3">Users</p>
                <h4 className="h3s-1">0</h4>
              </section>
            </section> */}
            {/* <section className={Style.Outsection}>
              <section>
                <p className="ps-3">Arns</p>
                <h4 className="ps-3">0</h4>
              </section>
              <section>
                <p className="ps-3">Users</p>
                <h4 className="ps-3">0</h4>
              </section>
            </section> */}
          </Col>
          <Col>
            <TrandDataGraph />
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
