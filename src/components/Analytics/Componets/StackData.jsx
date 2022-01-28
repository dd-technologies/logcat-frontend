import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./StackData.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faFilter,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";

export default function StackData() {
  const [InnerParaShow, setInnerParaShow] = useState(true);
  const [innerParaShowDetails, setInnerParaShowDetails] = useState(true);
  const [stackErrorFilter, setStackErrorFilter] = useState(false);
  const [stackErrorFilterTextFormate, setStackErrorFilterTextFormate] =
    useState(true);

  // ACTIVE CLASS FOR TOGGLE TEXT AND STACK BUTTON
  const [activeClassToggle, setactiveClassToggle] = useState({
    text: false,
    stack: true,
  });

  // GETTGIN DATA FROM URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const colData = urlParams.get("col");

  // console.log("Col", colData);

  // HEADING DATA ANALYTIC
  const pattern = /(at).*/gm;
  const DataINRow = colData.split(" at");

  console.log("DataInRow", DataINRow);

  // const DataINRow = colData.match(pattern);

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
    setactiveClassToggle({ text: true, stack: false });
  };

  const stackErrorFilterTextFormateFun = () => {
    setStackErrorFilterTextFormate(true);
    setStackErrorFilter(false);
    setactiveClassToggle({ text: false, stack: true });
  };

  // console.log("colData", colData);

  return (
    <>
      <Row className="p-4">
        <Col xl={12}>
          {/* TEXT AND COE TOGGLE SECTION */}
          <section className={Style.filterToggle}>
            <section
              className={
                activeClassToggle.text
                  ? `${Style.filterGraphFirstSctionActive} `
                  : `${Style.filterGraphFirstSction} `
              }
              onClick={stackErrorFilterFun}
            >
              <p>TXT</p>
            </section>
            <section
              className={
                activeClassToggle.stack
                  ? `${Style.filterGraphFirstSctionActive} `
                  : `${Style.filterGraphFirstSction} `
              }
              onClick={stackErrorFilterTextFormateFun}
            >
              <FontAwesomeIcon icon={faTasks} />
            </section>
          </section>
        </Col>

        {/* STACK ERRO WITH  FILLTER BUTTON CLICK */}
        {stackErrorFilter ? (
          <Col xl={12} className={`${Style.outerDiv} mt-4`}>
            <section className={`${Style.StackInfoDive} p-3`}>
              <section
                className={Style.ParaWithArrowDown}
                onClick={innerParaShowFun}
              >
                <section>
                  <p style={{ fontWeight: 600 }}>{DataINRow[0]}</p>
                  <p>{DataINRow[1]}</p>
                </section>
                <FontAwesomeIcon icon={faCaretDown} />
              </section>
            </section>

            <section className={`${Style.detailSection} p-3`}>
              {InnerParaShow ? <p>{colData}</p> : null}
            </section>
          </Col>
        ) : null}

        {/* TEXT FILTER STACK ERROR FIELD HERE */}
        {stackErrorFilterTextFormate ? (
          <Col xl={12} className={`${Style.outerDiv} mt-4`}>
            <section className={`${Style.StackInfoDive} p-3`}>
              <section
                className={Style.ParaWithArrowDown}
                onClick={innerParaShowFun}
              >
                <section>
                  <p style={{ fontWeight: 600 }}>{DataINRow[0]}</p>
                </section>

                <FontAwesomeIcon icon={faCaretDown} />
              </section>
            </section>

            {/* stack error section */}

            <section className={`${Style.detailSection} py-3`}>
              {InnerParaShow ? (
                <section className="ps-2">
                  {/* FATAIL EXCEPTIPN */}
                  {/* {console.log("hi", DataINRow.startsWith("Exception"))} */}
                  {DataINRow.map((itmes, index) => {
                    return (
                      <>
                        <p className={Style.pText}>
                          {index == 0 ? null : (
                            <span style={{ fontWeight: "bold" }}>at</span>
                          )}

                          {itmes}
                        </p>
                      </>
                    );
                  })}
                </section>
              ) : null}
            </section>
          </Col>
        ) : null}
      </Row>
    </>
  );
}
