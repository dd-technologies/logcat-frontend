import React from "react";
import Style from "./Spinner.module.scss";

export default function Spinner() {
  return (
    <>
      <section className={Style.outerSec}>
        <section className={Style.loader}></section>
      </section>
    </>
  );
}
