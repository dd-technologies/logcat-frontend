import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCode,
  faBuilding,
  faProjectDiagram,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
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
          <p>Event Summery</p>
          <setcion className={`${Style.outerSec} p-2`}>
            <section>
              <p>Version</p>
              <p>
                <span>
                  <FontAwesomeIcon icon={faFileCode} />
                </span>
                {rowcreatedAt.split("T")[1]}
              </p>
            </section>

            <section>
              <p>OS architecture</p>
              <p>
                <span>
                  <FontAwesomeIcon icon={faBuilding} />
                </span>
                {rowdid}
              </p>
            </section>

            <section>
              <p>Model name</p>
              <p>
                <span>
                  <FontAwesomeIcon icon={faProjectDiagram} />
                </span>

                {rowdevice_types.split("|")[1]}
              </p>
            </section>

            <section>
              <p>Date</p>
              <p>
                <span>
                  <FontAwesomeIcon icon={faCalendar} />
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
