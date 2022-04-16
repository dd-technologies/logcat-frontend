import React from "react";
import Style from "./Text.module.scss";

export default function Text() {
  // GETTGIN DATA FROM URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const colData = urlParams.get("col");
  // HEADING DATA ANALYTIC

  return (
    <section className={`${Style.outerSection} SDb`}>
      <p className="SDb">{colData}</p>
      {/* <FontAwesomeIcon icon={faCaretDown} /> */}
    </section>
  );
}
