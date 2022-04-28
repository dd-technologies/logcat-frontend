import React from "react";
import Style from "./Spinner.module.scss";

export default function Spinner(props) {
  return (
    <>
      <section
        style={{
          width: props.width ? props.width : "100%",
          height: props.height ? props.height : "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <section className={Style.loader}></section>
      </section>
    </>
  );
}
