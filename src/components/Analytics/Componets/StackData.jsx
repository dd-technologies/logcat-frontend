import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./StackData.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faFilter } from "@fortawesome/free-solid-svg-icons";

export default function StackData() {
  const [InnerParaShow, setInnerParaShow] = useState(false);
  const [innerParaShowDetails, setInnerParaShowDetails] = useState(true);
  const [stackErrorFilter, setStackErrorFilter] = useState(true);
  const [stackErrorFilterTextFormate, setStackErrorFilterTextFormate] =
    useState(false);

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

  const stackErrorFilterFun = () => {
    setStackErrorFilter(true);
    setStackErrorFilterTextFormate(false);
  };

  const stackErrorFilterTextFormateFun = () => {
    setStackErrorFilterTextFormate(true);
    setStackErrorFilter(false);
  };

  return (
    <>
      <Row className="p-4">
        <Col xl={12}>
          {/* TEXT AND COE TOGGLE SECTION */}
          <section className={Style.filterToggle}>
            <section
              className={Style.filterGraphFirstSction}
              onClick={stackErrorFilterFun}
            >
              <FontAwesomeIcon icon={faFilter} />
            </section>
            <section
              className={Style.filterGraphFirstSction}
              onClick={stackErrorFilterTextFormateFun}
            >
              <p>Text</p>
            </section>
          </section>
        </Col>

        {/* STACK ERRO WITH  FILLTER BUTTON CLICK */}
        {stackErrorFilter ? (
          <Col xl={12} className={`${Style.outerDiv} mt-4`}>
            <section className={`${Style.StackInfoDive} p-3`}>
              <section className={Style.ParaWithArrowDown}>
                <h3 onClick={innerParaShowFun}>Stack Error</h3>
                <FontAwesomeIcon icon={faCaretDown} />
              </section>
            </section>

            <section className={`${Style.detailSection} p-3`}>
              <p className={Style.stackDetails}>Stack Error</p>
              {InnerParaShow ? <p>{colData}</p> : null}
            </section>
          </Col>
        ) : null}

        {/* TEXT FILTER STACK ERROR FIELD HERE */}
        {stackErrorFilterTextFormate ? (
          <Col xl={12} className={`${Style.outerDiv} mt-4`}>
            <section className={`${Style.StackInfoDive} p-3`}>
              <section className={Style.ParaWithArrowDown}>
                <h3 onClick={innerParaShowFun}>Stack Error in text formate</h3>
                <FontAwesomeIcon icon={faCaretDown} />
              </section>
            </section>

            <section className={`${Style.detailSection} p-3`}>
              <p className={Style.stackDetails}>Stack Error</p>
              {InnerParaShow ? <p>{colData}</p> : null}
            </section>
          </Col>
        ) : null}
      </Row>
    </>
  );
}
