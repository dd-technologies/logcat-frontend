import React from "react";
import { Button, Image } from "react-bootstrap";
import Style from "./NavSideBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CustomeDropDown from "../Container/DropDown";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminLogout } from "../redux/action/AdminAction";

export function Navbar() {
  let history = useHistory();
  const dispatch = useDispatch();
  const handlelogout = (e) => {
    e.preventDefault();
    dispatch(adminLogout(history));
  };
  return (
    <>
      <nav className={Style.navbar}>
        <section className={Style.userInfo}>
          <section className={Style.Avtar}>AS</section>
          <section className="m-2">UserName</section>
          <Button
            onClick={(e) => {
              handlelogout(e);
            }}
          >
            LogOut
          </Button>
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
