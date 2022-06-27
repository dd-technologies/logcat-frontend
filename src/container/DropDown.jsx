import React, { useState } from "react";
import { Card } from "react-bootstrap";

export default function CustomeDropDown(props) {
  // dark mood state

  const darkMode = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  )[0];

  return (
    <>
      <Card
        style={{
          borderRadius: "10px",
          width: props.width ? props.width : "auto",
          height: props.height ? props.height : "auto",
          padding: props.padding ? props.padding : "10px",
          boxShadow: props.boxShadow
            ? props.boxShadow
            : "0px 0px 4px -2px rgba(0,0,0,0.75)",
          display: "flex",
          justifyContent: props.justifyContent
            ? props.justifyContent
            : "center",
          alignItems: props.alignItems ? props.alignItems : "center",
          marginTop: props.marginTop && "",
          position: props.position ? props.position : "",
          top: props.top ? props.top : "",
          right: props.right ? props.right : "",
          marginRight: props.marginRight ? props.marginRight : "",
          zIndex: props.zIndex ? props.zIndex : "",
          backgroundColor: darkMode ? "#202940" : null,
        }}
      >
        {props.children}
      </Card>
    </>
  );
}
