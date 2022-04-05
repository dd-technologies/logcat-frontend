import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Style from "./CustomeCard.module.scss";

const defaultStyle = {
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "4px 5px 18px 1px rgba(0, 0, 0, 0.07) !important",
};

const darkmood = localStorage.getItem("darkMood");
// console.log("darkmood", JSON.parse(darkmood));

export default function CustomCard(props) {
  // dark mood state

  const [darkMood, setDarkMood] = useState(
    JSON.parse(localStorage.getItem("darkMood"))
  );

  return (
    <>
      <Card
        className={
          darkMood ? `${Style.CardCustomeDark}` : `${Style.CardCustomeOuter}`
        }
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          // boxShadow: props.boxShadow
          //   ? props.boxShadow
          //   : "4px 5px 18px 1px rgba(0, 0, 0, 0.07)",
          height: props.height ? props.height : "100%",
          width: props.width ? props.width : "100%",
          padding: props.padding ? props.padding : "0px",
          position: props.position ? props.position : "relative",
          right: props.right ? props.right : "inherit",
          top: props.top ? props.top : "inherit",
          zIndex: props.zIndex ? props.zIndex : "1",
        }}
      >
        {props.children}
      </Card>
    </>
  );
}
