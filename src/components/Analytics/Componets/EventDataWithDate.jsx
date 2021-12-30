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

  console.log("getAllLogByCodeReducer", getAllLogByCodeReducer);
  const {
    data: {
      data: { logs },
    },
  } = getAllLogByCodeReducer;
  console.log("getAllLogByCodeReducer logs", logs);

  // GETTGIN DATA FROM URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // GETTIN ROW DATA
  const rowcreatedAt = urlParams.get("rowcreatedAt");
  const rowdevice_types = urlParams.get("rowdevice_types");
  const rowdid = urlParams.get("rowdid");
  const rowlogGeneratedDate = urlParams.get("rowlogGeneratedDate");
  const rowlogType = urlParams.get("rowlogType");
  const rowupdatedAt = urlParams.get("rowupdatedAt");

  return (
    <>
      <Row className="pt-4">
        <Col className={`${Style.MainDiv} m-2`}>
          <setcion className={`${Style.outerSec} p-2`}>
            <p>Event Summery</p>
            <section>
              <p>
                <span>
                  <FontAwesomeIcon icon={faLocationArrow} />
                </span>
                {rowcreatedAt.split("T")[1]}
              </p>
            </section>

            <section>
              <p>
                <span>
                  <FontAwesomeIcon icon={faAndroid} />
                </span>
                {rowdid}
              </p>
            </section>

            <section>
              <p>
                <span>
                  <FontAwesomeIcon icon={faMobile} />
                </span>

                {rowdevice_types.split("|")[1]}
              </p>
            </section>

            <section>
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
