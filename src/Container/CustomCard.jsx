import React from "react";
import { Card } from "react-bootstrap";
import Style from "./CustomeCard.module.scss";

export default function CustomCard(props) {
  return (
    <>
      <Card
        className={Style.CardCustomeOuter}
        style={{
          height: props.height ? props.height : "100%",
          width: props.width ? props.width : "100%",
          borderRadius: "10px",
          overflow: "hidden",
          padding: props.padding ? props.padding : "0px",
          position: props.position ? props.position : "relative",
          right: props.right ? props.right : "",
          boxShadow: props.boxShadow ? props.boxShadow : "",
          top: props.top ? props.top : "",
          zIndex: props.zIndex ? props.zIndex : "1",
        }}
      >
        {props.children}
      </Card>
    </>
  );
}
