import React from "react";
import Style from "./Card.module.scss";
import { Card } from "react-bootstrap";

export default function CardMain(props) {
  return (
    <>
      <Card className={Style.card}>{props.children}</Card>
    </>
  );
}
