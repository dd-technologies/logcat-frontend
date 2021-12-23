import React from "react";
import Style from "./SideNav.module.scss";
import { Row } from "react-bootstrap";

export default function SideNav() {
  return (
    <>
      <Row className={Style.SideNav}></Row>
    </>
  );
}
