import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faBuilding,
  faMobile,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { faAndroid } from "@fortawesome/free-brands-svg-icons";
import Style from "./EventDataWithDate.module.scss";
import { useSelector } from "react-redux";

export default function EventDataWithDate() {
  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );

  // console.log("getAllLogByCodeReducer", getAllLogByCodeReducer);
  const {
    data: {
      data: { logs },
    },
  } = getAllLogByCodeReducer;
  // console.log("getAllLogByCodeReducer logs", logs);

  // GETTGIN DATA FROM URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // GETTIN ROW DATA
  const rowdevice_types = urlParams.get("rowdevice_types");
  const rowdid = urlParams.get("rowdid");
  const rowlogGeneratedDate = urlParams.get("rowlogGeneratedDate");
  const version = urlParams.get("version");
  const osArchitecture = urlParams.get("osArchitecture");
  const modelName = urlParams.get("modelName");

  // console.log("version", version);

  return (
    <>
      <Row className="pt-4">
        <Col className={`${Style.MainDiv} m-2`}>
          <setcion className={`${Style.outerSec} p-2`}>
            <p>Event Summery</p>
            {version !== "null" ? (
              <section className="px-4">
                <p>
                  <span>
                    <FontAwesomeIcon icon={faLocationArrow} />
                  </span>
                  {version}
                </p>
              </section>
            ) : null}

            {osArchitecture !== "null" ? (
              <section className="px-4">
                <p>
                  <span>
                    <FontAwesomeIcon icon={faAndroid} />
                  </span>
                  {osArchitecture}
                </p>
              </section>
            ) : null}

            {modelName !== "null" ? (
              <section className="px-4">
                <p>
                  <span>
                    <FontAwesomeIcon icon={faMobile} />
                  </span>
                  {modelName}
                </p>
              </section>
            ) : null}

            <section className="px-4">
              <p>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                {rowlogGeneratedDate.split("T")[0]}
              </p>
            </section>
          </setcion>
        </Col>
        <hr />
      </Row>
    </>
  );
}
