import React, { useState } from "react";
import { Card } from "react-bootstrap";

export default function TableCard1(props) {
  // dark mode state
  const darkMode = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  )[0];
  return (
    <>
      <Card
        style={{
          // height: props.height ? props.height : "100%",
          width: props.width ? props.width : "130%",
          borderRadius: props.borderRadius ? props.borderRadius : "20px",
          padding: props.padding ? props.padding : "0px",
          position: props.position ? props.position : "relative",
          right: props.right ? props.right : "",
          boxShadow: props.boxShadow ? props.boxShadow : "",
          top: props.top ? props.top : "",
          backgroundColor: darkMode ? "#202940" : null,
          boxShadow:"0px 5px 10px 0px rgba(0, 0, 0, 0.5)"
        }}
      >
        {props.children}
      </Card>
    </>
  );
}
