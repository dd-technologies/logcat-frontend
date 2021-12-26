import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";
import Style from "./EventDataWithDate.module.scss";

export default function EventDataWithDate() {
  return (
    <>
      <Row className="pt-4">
        <Col className={Style.MainDiv}>
          <setcion>
            <p>Event Summery</p>
            <p>
              <span>
                <FontAwesomeIcon icon={faBarcode} />
              </span>
              23.4334.556
            </p>
            <p>
              <span>
                <FontAwesomeIcon icon={faBarcode} />
              </span>
              80.080
            </p>
            <p>
              <span>
                <FontAwesomeIcon icon={faBarcode} />
              </span>
              Lenovo
            </p>
            <p>
              <span>
                <FontAwesomeIcon icon={faBarcode} />
              </span>
              Dec 23-08-2021
            </p>
          </setcion>
          <hr />
        </Col>
      </Row>
    </>
  );
}
