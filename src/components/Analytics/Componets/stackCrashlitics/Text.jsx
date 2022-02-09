import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Style from "./Text.module.scss";

export default function Text() {
  // GETTGIN DATA FROM URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const colData = urlParams.get("col");
  // HEADING DATA ANALYTIC
  const pattern = /(at).*/gm;
  let DataINRow = colData.split(" at");

  console.log("DataINRow", DataINRow);

  return (
    <>
      {/* FATAL EXCEPTION ------------------------------------------------------- */}
      {/* PAGE EXECEPTION ------------------------------------------------------- */}
      {/* FATAL EXCEPTION ------------------------------------------------------- */}

      {/* COMPLETE STACK */}
      <section className={Style.outerSection}>
            <p>{colData}</p>
            {/* <FontAwesomeIcon icon={faCaretDown} /> */}
          </section>
      {/* {DataINRow.map((data) => {
        // FATAL EXCEPTION -------------------------------------------------------
        return (
          <section className={Style.outerSection}>
            <p>{data}</p>
            <FontAwesomeIcon icon={faCaretDown} />
          </section>
        );
      })} */}
    </>
  );
}
