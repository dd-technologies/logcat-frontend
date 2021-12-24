import React from "react";
import { Card } from "react-bootstrap";


export default function EventCard(props) {
  return (
    <Card
      style={{
        height: "auto",
        borderRadius: "10px",
      }}
    >
      {props.children}
    </Card>
  );
}
