import React from "react";
import { Card } from "react-bootstrap";

export default function TableCard(props) {
  return (
    <>
      <Card
        style={{
          height: props.height ? props.height : "100%",
          width: props.width ? props.width : "100%",
          borderRadius: "10px",
          padding: props.padding ? props.padding : "0px",
          position: props.position ? props.position : "relative",
          right: props.right ? props.right : "",
          boxShadow: props.boxShadow ? props.boxShadow : "",
          top: props.top ? props.top : "",
        }}
      >
        {props.children}
      </Card>
    </>
  );
}
