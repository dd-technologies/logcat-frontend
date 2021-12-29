import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./StackData.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function StackData() {
  const [InnerParaShow, setInnerParaShow] = useState(false);
  const [innerParaShowDetails, setInnerParaShowDetails] = useState(true);

  // GETTGIN DATA FROM URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const colData = urlParams.get("col");

  // console.log("Col", colData);

  // HEADING DATA ANALYTIC
  const pattern = /(at).*/gm;
  const DataINRow = colData.split(" at");

  // console.log("DataINRow", DataINRow);

  // INNER PARA SHOW FUNCTION
  const innerParaShowFun = () => {
    if (!InnerParaShow) {
      setInnerParaShow(true);
    }
    if (InnerParaShow) {
      setInnerParaShow(false);
    }
  };

  // INNER PARA DETAIL SECTION FUNCTION
  const innerParaShowDetailsFun = () => {
    setInnerParaShowDetails(!innerParaShowDetails);
  };

  return (
    <>
      <Row className="p-4">
        <Col xl={12} className={`${Style.outerDiv} mt-4`}>
          <section className={`${Style.StackInfoDive} p-3`}>
            <section className={Style.ParaWithArrowDown}>
              <h3 onClick={innerParaShowFun}>Stack Error</h3>
              <FontAwesomeIcon icon={faCaretDown} />
            </section>
            {InnerParaShow ? <p>{colData}</p> : null}
          </section>
          <section className={`${Style.detailSection} p-3`}>
            <FontAwesomeIcon icon={faCaretDown} />
            <section className={`${Style.lineBrack} ps-4`}>
              <p onClick={innerParaShowDetailsFun}>Errors Row</p>

              {innerParaShowDetails ? (
                <section>
                  <p>{DataINRow}</p>
                </section>
              ) : null}
            </section>
          </section>
        </Col>
      </Row>
    </>
  );
}
