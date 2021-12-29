import React, { useState, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import Style from "./NavSideBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CustomeDropDown from "../Container/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminLogout } from "../redux/action/AdminAction";

export function Navbar(props) {
  const { navdetails } = props;
  const [sidebar, setSidebar] = useState(false);
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const [navToggle, setNavToggle] = useState(true);
  const { loading, adminInfo } = adminLoginReducer;
  // console.log(adminInfo.data.name);

  // checking if navlink 2 is not avilables

  const showSidebar = () => setSidebar(!sidebar);
  const dispatch = useDispatch();
  let history = useHistory();
  const handlelogout = (e) => {
    e.preventDefault();
    dispatch(adminLogout(history));
  };

  const currentRoute = useHistory().location.pathname.toLowerCase();
  // console.log("currentRoute", currentRoute);

  // navigation toogle
  const navToggleFun = () => {
    if (navToggle) {
      return setNavToggle(false);
    }
    return setNavToggle(true);
  };

  // let history = useHistory();
  // const dispatch = useDispatch();
  // const handlelogout = (e) => {
  //   e.preventDefault();
  //   dispatch(adminLogout(history));
  // };
  // props.navbardetails.dashName.charAt(0).toUpperCase() +
  // props.navbardetails.dashName.slice(1)
  return (
    <>
      <nav className={Style.navbar}>
        <h3 className="px-5">
          {navdetails.dashName.charAt(0).toUpperCase() +
            navdetails.dashName.slice(1)}
        </h3>
        <section className={Style.userInfo}>
          <section className={Style.Avtar}>
            {adminInfo &&
              adminInfo.data &&
              adminInfo.data.name
                .split(" ")
                .map((name) => name[0][0].toUpperCase())}
          </section>
          <section className="m-2">
            {adminInfo &&
              adminInfo.data &&
              adminInfo.data.name
                .split(" ")
                .map(
                  (name) => name.charAt(0).toUpperCase() + name.slice(1) + " "
                )}
          </section>
          <Button
            onClick={(e) => {
              handlelogout(e);
            }}
          >
            Logout
          </Button>
        </section>
      </nav>
    </>
  );
}

export function SideBar(props) {
  const { navdetails } = props;
  const [sidebar, setSidebar] = useState(false);
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const [navToggle, setNavToggle] = useState(true);
  const { loading, adminInfo } = adminLoginReducer;

  // checking if navlink 2 is not avilables

  const showSidebar = () => setSidebar(!sidebar);
  const dispatch = useDispatch();
  let history = useHistory();
  const handlelogout = (e) => {
    e.preventDefault();
    dispatch(adminLogout(history));
  };

  const currentRoute = useHistory().location.pathname.toLowerCase();
  // console.log("currentRoute", currentRoute);

  // navigation toogle
  const navToggleFun = () => {
    if (navToggle) {
      return setNavToggle(false);
    }
    return setNavToggle(true);
  };
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
            <section className={Style.DashBoardTitle}>LogCat</section>
          </Link>
        </section>

        <section className={Style.options}>
          <section className={`${Style.optionItems} ${Style.option_active}`}>
            <Link
              className={`${Style.optionItems} ${Style.option_active}`}
              to={
                navdetails.link1 &&
                navdetails.link1.link &&
                navdetails.link1.link.length === 0
                  ? ""
                  : navdetails.link1.link
              }
            >
              <FontAwesomeIcon icon={faHome} />
              <section>{navdetails.link1.linkName}</section>
            </Link>
          </section>
          <section className={Style.optionItems}>
            <Link
              className={Style.optionItems}
              to={
                navdetails.link1 &&
                navdetails.link1.link &&
                navdetails.link1.link.length === 0
                  ? ""
                  : navdetails.link1.link
              }
            >
              <FontAwesomeIcon icon={faCog} />
              <section>{navdetails.link2.linkName}</section>
            </Link>
          </section>
        </section>
        <section className={Style.brandName}>
          <Image src="/assets/images/DDTECH.png" />
          <p>D&D Technology</p>
        </section>
      </section>
    </>
  );
}
