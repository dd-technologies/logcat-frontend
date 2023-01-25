import React from "react";
import { Card } from "react-bootstrap";
import Style from "../css/CustomeCard.module.css";

export default function CustomCard(props) {
  // dark mode state
  return (
    <>
      <Card
        className={Style.CardCustomeOuter}
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          height: props.height ? props.height : "100%",
          width: props.width ? props.width : "100%",
          padding: props.padding ? props.padding : "0px",
          position: props.position ? props.position : "",
          right: props.right ? props.right : "0%",
          top: props.top ? props.top : "0%",
          zIndex: props.zIndex ? props.zIndex : "1",
        }}
      >
        {props.children}
        
      </Card>
    </>
  );
}
