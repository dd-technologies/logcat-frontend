import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import Style from "./EventDatWithTable.module.scss";

export default function EventDataWithDate() {
  return (
    <>
      <Row className="p-4">
        <Col className={Style.MainDiv}>
          <setcion>
            <p>Event Summery</p>
            <p>
              <span>
                <FontAwesomeIcon icon={faLessThan} />
              </span>
              250c.50800
            </p>
            <p>
              <span>
                <FontAwesomeIcon icon={faLessThan} />
              </span>
              80.080
            </p>
            <p>
              <span>
                <FontAwesomeIcon icon={faLessThan} />
              </span>
              Lenovo
            </p>
            <p>
              <span>
                <FontAwesomeIcon icon={faLessThan} />
              </span>
              Dec 23-08-2021
            </p>
          </setcion>
        </Col>
      </Row>
    </>
  );
}
