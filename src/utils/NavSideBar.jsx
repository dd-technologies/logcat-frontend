import React from "react";
import { Col, Row } from "react-bootstrap";
import Style from "./NavSideBar.module.scss";

export default function NavSideBar() {
  return (
    <>
      <Row className={Style.MainNavBarSide}>
        <Col xl={2}>SideBar</Col>
        <Col xl={10}>Navbar</Col>
      </Row>
    </>
  );
}
