import React from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./StackData.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function StackData() {
  return (
    <>
      <Row className="p-4">
        <Col xl={12} className={`${Style.outerDiv} mt-4`}>
          <section className={`${Style.StackInfoDive} p-3`}>
            <section className={Style.ParaWithArrowDown}>
              <h3>lorem ipsum dolor sit amet, consectetur adip</h3>
              <FontAwesomeIcon icon={faCaretDown} />
            </section>
            <p>
              lorem ipsum dolor sit amet, consectetur adiplorem ipsum dolor sit
              amet, consectetur adiplorem ipsum dolor sit amet, consectetur
              adiplorem ipsum dolor sit amet, consectetur adiplorem ipsum dolor
              sit amet, consectetur adiplorem ipsum dolor sit amet, consectetur
              adiplorem ipsum dolor sit amet, consectetur adiplorem ipsum dolor
              sit amet, consectetur adip
            </p>
          </section>
          <section className={`${Style.detailSection} p-3`}>
            <FontAwesomeIcon icon={faCaretDown} />
            <section className={`${Style.lineBrack} ps-4`}>
              <p>
                lorem ipsum dolor sit amet, consectetur adiplorem ipsum dolor
                sit amet, consectetur adiplorem ipsum dolor sit amet,
                consectetur adiplorem ipsum dolor sit amet, consectetur adip
              </p>
              <hr />
              <p>lorem ipsum dolor sit amet, consectetur adip</p>
              <hr />
            </section>
          </section>
        </Col>
      </Row>
    </>
  );
}
