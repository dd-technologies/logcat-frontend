import React from "react";
import Style from "./StackData.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function StackDataNew() {
  // GETTGIN DATA FROM URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const colData = urlParams.get("col");

  return (
    <>
      <section className={`${Style.StackInfoDive} p-3`}>
        <section className={Style.ParaWithArrowDown}>
          <section>
            <p style={{ fontWeight: 600 }}>fff</p>
          </section>

          <FontAwesomeIcon icon={faCaretDown} />
        </section>
      </section>
    </>
  );
}
