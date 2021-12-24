import React from "react";
import { Dropdown, Row, Col, Container } from "react-bootstrap";
import Style from "./MainNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faQuestion } from "@fortawesome/free-solid-svg-icons";
import "../../../css/theme.scss";

export default function MainNav() {
  return (
    <>
      <nav className={Style.MainNav}>
        <section className={Style.UserDetails}>
          <section className={Style.avatar}>
            <p>ss</p>
          </section>
          <div className={Style.UserDetailsInfo}>
            <h3>UserName</h3>
          </div>
        </section>
      </nav>
    </>
  );
}
