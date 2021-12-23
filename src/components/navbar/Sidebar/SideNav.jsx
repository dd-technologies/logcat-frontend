import React from "react";
import Style from "./SideNav.module.scss";
import { Row } from "react-bootstrap";

export default function SideNav() {
  return (
    <>
      <Row className={Style.SideNav}>
        {/* companoy logo */}
        <section className={Style.Logo}>
          <img src="/assets/images/DD.png" />
        </section>

        <section className={Style.SideNavMain}>
          <p>Project</p>
          <section>
            <p>PorjectName</p>
            <p>Settings</p>
          </section>
        </section>
      </Row>
    </>
  );
}
