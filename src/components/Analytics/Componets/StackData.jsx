import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./StackData.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faFilter,
  faTasks,
  faTextHeight,
} from "@fortawesome/free-solid-svg-icons";
import Text from "./stackCrashlitics/Text";

export default function StackData() {
  const [InnerParaShow, setInnerParaShow] = useState(true);
  const [innerParaShowDetails, setInnerParaShowDetails] = useState({});
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

  // HEADING DATA ANALYTIC
  const pattern = /(at).*/gm;
  const DataINRow = colData.split(" at");

  // console.log("Col", DataINRow);
  // let arrA = []
  // DataINRow.map((e) => {
  //   console.log("ArrayMap",e);

  //   if(e.includes("androidx.")){
  //     arrA.push(e)
  //   }

  // })
  // console.log("arrA",arrA);
  // console.log("DataInRow", DataINRow);

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

  // FILTER FUNCTION FOR TOGGLE BUTTON

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

  // INNER PARA DETAIL SECTION FUNCTION
  const innerParaShowDetailsFun = (index) => {
    // setInnerParaShowDetails();
    let idx = index;

    if (innerParaShowDetails.hasOwnProperty(idx)) {
      setInnerParaShowDetails({
        ...innerParaShowDetails,
        [idx]: !innerParaShowDetails[idx],
      });
    } else {
      setInnerParaShowDetails({ ...innerParaShowDetails, [idx]: true });
    }
  };

  return (
    <>
      <Row className="p-4">
        <Col xl={12}>
          {/* TEXT AND COE TOGGLE SECTION */}
          <section className={Style.filterToggle}>
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
            <section
              className={
                activeClassToggle.text
                  ? `${Style.filterGraphFirstSctionActive} `
                  : `${Style.filterGraphFirstSction} `
              }
              onClick={stackErrorFilterFun}
            >
              <FontAwesomeIcon icon={faTextHeight} />
            </section>
          </section>
        </Col>

        {/* TEXT ERROR  WITH  FILLTER BUTTON CLICK */}
        {stackErrorFilter ? (
          <Col xl={12} className={`${Style.outerDiv} mt-4`}>
            <Text />
          </Col>
        ) : null}

        {/* STACK FILTER STACK ERROR FIELD HERE */}
        {stackErrorFilterTextFormate ? (
          <Col xl={12} className={`${Style.outerDiv} mt-4`}>
            {/* stack error section */}
            {DataINRow.map((items, index) => {
              return (
                <>
                  <section className={Style.outerDiv}>
                    <section
                      className={Style.StackInfoDive}
                      onClick={() => innerParaShowDetailsFun(index)}
                    >
                      <p>{items}</p>
                      {console.log("items", items)}
                      <FontAwesomeIcon icon={faCaretDown} />
                    </section>
                    {innerParaShowDetails[index] ? (
                      <section className={Style.detailSection}>
                        <p>
                          <span>at </span>
                          {/* {items.includes("androidx.fragment.app")
                            ? items
                            : null}
*/}{" "}
                          {
                            // items.startsWith("Fatal Exception")
                          }
                          {items}
                        </p>
                      </section>
                    ) : null}
                  </section>
                </>
              );
            })}
          </Col>
        ) : null}
      </Row>
    </>
  );
}
