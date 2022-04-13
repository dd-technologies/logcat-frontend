import React, { useState } from "react";
import { Card } from "react-bootstrap";

export default function CustomeDropDown(props) {
  // dark mood state

  const [darkMood, setDarkMood] = useState(
    JSON.parse(localStorage.getItem("darkMood"))
  );

  return (
    <>
      <Card
        style={{
          width: props.width ? props.width : "auto",
          height: props.height ? props.height : "auto",
          zIndex: props.zIndex ? props.zIndex : 8,
          borderRadius: props.borderRadius ? props.borderRadius : "0px",
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
          backgroundColor: darkMood ? "#202940" : null,
        }}
      >
        {props.children}
      </Card>
    </>
  );
}
