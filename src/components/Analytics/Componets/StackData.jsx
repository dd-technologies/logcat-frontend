import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Style from "./StackData.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
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
  const DataINRow = colData.split("at ") && colData.split(")").slice(0, -1);

  var grouped = DataINRow.reduce((result, word) => {
    var letter;
    if (word.split(".").length > 2) {
      // get the first letter. (this assumes no empty words in the list)
      letter = `${word.split(".")[0]}.${word.split(".")[1]}.${
        word.split(".")[2]
      }`;
    } else letter = word.split(".")[0];

    // ensure the result has an entry for this letter
    result[letter] = result[letter] || [];

    // add the word to the letter index
    result[letter].push(word);
    return result;
  }, {});

  // console.log("first", colData);

  const keys = Object.keys(grouped);
  // {
  //   console.log("key", keys);
  // }

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
                  ? `${Style.filterGraphFirstSctionActive}  `
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
          <Col xl={12} className={`${Style.outerDiv} SDbmt-4`}>
            <Text />
          </Col>
        ) : null}

        {/* STACK FILTER STACK ERROR FIELD HERE */}

        {stackErrorFilterTextFormate ? (
          <>
            {!keys.length < 1 ? (
              <Col xl={12} className={`${Style.outerDiv} mt-4`}>
                {
                  // DataINRow.map((items,index)
                  !keys == [] &&
                    keys.map((key, idx) => {
                      const fileName = key.slice(key.indexOf("/") + 1);
                      if (fileName) {
                        var fname = `${fileName.split(".")[0]}.${
                          fileName.split(".")[1]
                        }.${fileName.split(".")[2]}`;
                      }
                      return (
                        <>
                          <section className={Style.outerDivinner}>
                            <section
                              className={
                                innerParaShowDetails[idx]

                                  ? `${Style.StackInfoDiveWithToggle} SDb`
                                  : `${Style.StackInfoDive} SDb`

                            
                              }
                              onClick={() => innerParaShowDetailsFun(idx)}
                            >
                              {idx == 0 ? (
                                <p>
                                  {`${key.slice(key.indexOf("/") + 1)}`}{" "}
                                  
                                  {/* {console.log("key", colData)} */}
                                </p>
                              ) : (
                                <p className={`${Style.index0}`}>
                                  {/* {console.log("key", colData)} */}
                                 
                                  {`${key.slice(key.indexOf("/") + 1)}`}
                                </p>
                              )}

                              <FontAwesomeIcon icon={faCaretDown} />
                            </section>

                            {
                              // grouped[key].foreach((value,index)=>{
                              innerParaShowDetails[idx] && (

                                <section
                                  className={`${Style.detailSection}  SDb1`}
                                >

                                  {grouped[key].map((items, index) => {
                                    return (
                                      <>
                                        {idx == 0 ? (
                                          <p
                                            className={grouped[key].map(
                                              (items, index) => {
                                                return items.includes(
                                                  "Activity"
                                                )
                                                  ? Style.normalPara
                                                  : Style.dynamicPara;
                                              }
                                            )}
                                          >
                                            {DataINRow.includes("Caused by:")
                                              ? items
                                              : items.concat(")")}
                                          </p>
                                        ) : (
                                          <p
                                            className={grouped[key].map(
                                              (items, index) => {
                                                return items.includes(
                                                  "Activity"
                                                )
                                                  ? Style.normalPara
                                                  : Style.dynamicPara;
                                              }
                                            )}
                                          >

                                            {items.includes("at") ? null : "at"}

                                            {DataINRow.includes("Caused by:")
                                              ? items
                                              : items.concat(")")}
                                          </p>
                                        )}
                                      </>
                                    );
                                  })}
                                </section>
                              )
                            }
                          </section>
                        </>
                      );
                    })
                }
              </Col>
            ) : (
              <Col xl={12} className={`${Style.outerDiv} mt-4`}>

                <section className={`${Style.StackInfoDive}`}>

                  <p>{colData}</p>
                </section>
              </Col>
            )}
          </>
        ) : null}
      </Row>
    </>
  );
}
