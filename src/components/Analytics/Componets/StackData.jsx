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
  // let array = [];
  // let index = 0;
  // DataINRow.map((items,index)=>{
  //   if(items.includes("com.agvahealthcare.ventilator_ext")){
  //     if(typeof array[index] !== 'undefined'){
  //       let newEle = array.indexOf(index)+" /n" +items;
  //       console.log("new element "+newEle);
  //       array[index] = newEle;
  //       console.log('if',array[index])
  //     }else{
  //       array[index] = items;
  //       console.log('else',array[index])
  //     }
  //   }else{
  //     index++;
  //     array[index] = items;
  //     console.log('outer else',array[index])
  //   }
  // })

  // const fileName =

  var grouped = DataINRow.reduce((result, word) => {
    console.log("word", word);
    // get the first letter. (this assumes no empty words in the list)
    const letter = `${word.split(".")[0]}.${word.split(".")[1]}.${word.split(".")[2]
      }`;

    // ensure the result has an entry for this letter
    console.log("letter " + letter);
    result[letter] = result[letter] || [];

    console.log("result " + result[letter]);

    // add the word to the letter index
    result[letter].push(word);
    return result;
  }, {});
  console.log("groupedd  ", grouped);
  const keys = Object.keys(grouped);
  console.log("keys", keys);

  // console.log("array length  "+array.length)

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
            {
              // DataINRow.map((items,index)
              keys.map((key, idx) => {
                // console.log(`Keys ${grouped[key]} => ${idx}`)
                const fileName = key.slice(key.indexOf("/") + 1);
                if (fileName) {
                  var fname = `${fileName.split(".")[0]}.${fileName.split(".")[1]}.${fileName.split(".")[2]
                    }`;
                }
                return (
                  <>
                    <section className={Style.outerDiv}>
                      <section
                        className={innerParaShowDetails[idx] ? `${Style.StackInfoDiveWithToggle}` : `${Style.StackInfoDive}`}
                        onClick={() => innerParaShowDetailsFun(idx)}
                      >
                        <p>{`${key.slice(key.indexOf("/") + 1)}`}</p>
                        {console.log("items", grouped[key])}
                        <FontAwesomeIcon icon={faCaretDown} />
                      </section>

                      {
                        // grouped[key].foreach((value,index)=>{
                        //   console.log(`inside map ${index} : ${innerParaShowDetails[index]}`);
                        innerParaShowDetails[idx] && (
                          <section className={Style.detailSection}>
                            {console.log("  [key]", grouped[key])}

                            <p
                              className={grouped[key].map((items, index) => {
                                return index == "Activity"
                                  ? Style.dynamicPara
                                  : Style.normalPara;
                              })}
                            >
                              {grouped[key]}
                            </p>
                          </section>
                        )
                        // })
                      }
                    </section>
                  </>
                );

                //  return (
                //    <>
                //      <section className={Style.outerDiv}>
                //        <section
                //          className={Style.StackInfoDive}
                //          onClick={() => innerParaShowDetailsFun(index)}
                //        >
                //          <p>{`${items.slice(items.indexOf("/") + 1)}`}</p>
                //          {console.log("items", items)}
                //          <FontAwesomeIcon icon={faCaretDown} />
                //        </section>
                //        {innerParaShowDetails[index] ? (
                //         <section className={Style.detailSection}>
                //           <p
                //             style={
                //               items.includes("com.agvahealthcare.ventilator_ext")
                //                 ? { color: "#000" }
                //                 : { color: "	#A9A9A9" }
                //             }
                //           >
                //             <span>at </span>
                //             {items}
                //           </p>
                //         </section>
                //       ) : null}
                //      </section>
                //    </>
                //  );
              })
            }
          </Col>
        ) : null}
      </Row>
    </>
  );
}
