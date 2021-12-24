import React from "react";
import { Card } from "react-bootstrap";

export default function CreateCard(props) {
  return (
    <>
      <Card
        style={{
          height: "100%",
          borderRadius: "10px",
          overflow: "hidden",
          padding: "10px",
        }}
      >
        {props.children}
      </Card>
    </>
  );
}
