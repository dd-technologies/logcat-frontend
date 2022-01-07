import React from "react";
import { Card } from "react-bootstrap";

export default function CustomeDropDown(props) {
  return (
    <>
      <Card
        style={{
          width: props.width ? props.width : "auto",
          height: props.height ? props.height : "auto",
          zIndex: 8,
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0px 0px 4px -2px rgba(0,0,0,0.75)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.children}
      </Card>
    </>
  );
}
