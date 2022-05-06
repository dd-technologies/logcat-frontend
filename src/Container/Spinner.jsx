import React from "react";
import Style from "./Spinner.module.scss";
import DDLoader from "../assets/images/ddLoader.gif"
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
        {/* <section className={Style.loader}></section> */}
        <img className={Style.loader} /* style={{height:'100px', width:'100px'}} */ src={DDLoader} alt="loading..." />
      </section>
    </>
  );
}
