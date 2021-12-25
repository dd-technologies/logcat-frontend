import React from "react";
import { Card } from "react-bootstrap";

export default function CardMain(props) {
  return (
    <>
      <Card
        style={{
          height: "350px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {props.children}
      </Card>
    </>
  );
}
