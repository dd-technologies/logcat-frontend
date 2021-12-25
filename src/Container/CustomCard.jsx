import React from "react";
import { Card } from "react-bootstrap";

export default function CreateCard(props) {
  return (
    <>
      <Card
        style={{
          height: props.height ? props.height : "100%",
          borderRadius: "10px",
          overflow: "hidden",
          padding: props.padding ? props.padding : "0px",
        }}
      >
        {props.children}
      </Card>
    </>
  );
}
