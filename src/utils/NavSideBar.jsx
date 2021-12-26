import React from "react";
import { Image } from "react-bootstrap";
import Style from "./NavSideBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


export function Navbar() {
  return (
    <>
      <nav className={Style.navbar}>
        <section className={Style.userInfo}>
          <section className={Style.Avtar}>AS</section>
          <section>UserName</section>
        </section>
      </nav>
    </>
  );
}

export function SideBar() {
  return (
    <>
      <section className={Style.sideBar}>
        <section className={`${Style.componyDetails} p-2`}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Image src="/assets/images/DD.png" />
            <section>D&D Technology</section>
          </Link>
        </section>

        <section className={Style.options}>
          <section className={`${Style.optionItems} ${Style.option_active}`}>
            <FontAwesomeIcon icon={faHome} />
            <section>Project</section>
          </section>
          <section className={Style.optionItems}>
            <FontAwesomeIcon icon={faCog} />
            <section>Settings</section>
          </section>
        </section>
      </section>
    </>
  );
}
