import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Style from "./NavSideBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCog,
  faLessThan,
  faGreaterThan,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CustomeDropDown from "../Container/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminLogout } from "../redux/action/AdminAction";
import { slideShow } from "../redux/action/SlideAction";

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
        <h3 >
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

  // SWIPE NAVBAR STATE
  const [swipe, setSwipe] = useState({
    show: false,
  });

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

  // SWIPE SIDEBAR SECTION START HERE
  // DISPATCHING ACTION OF SLIDEMENU
  const siwpeSideBarFun = () => {
    if (!swipe.show)
      setSwipe({
        show: true,
      });
    if (swipe.show) {
      setSwipe({
        show: false,
      });
    }
  };

  useEffect(() => {
    console.log("slideWindowReducer", "useEffect Run");
    dispatch(slideShow(swipe));
  }, [swipe]);

  return (
    <>
      <section
        className={swipe.show ? `${Style.sideBarSwipe}` : `${Style.sideBar}`}
      >
        <section className={`${Style.componyDetails} p-2`}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <section className={Style.DashBoardTitle}>
              {swipe.show ? "LG" : "LogCate"}
            </section>
          </Link>
        </section>

        <section
          className={swipe.show ? `${Style.SwipeOption}` : `${Style.options}`}
        >
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
              <section className={Style.optionName}>
                {navdetails.link1.linkName}
              </section>
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
              <section className={Style.optionName}>
                {navdetails.link2.linkName}
              </section>
            </Link>
          </section>
        </section>

        <section className={`${Style.SwipeNavbar} pt-2`}>
          <FontAwesomeIcon
            icon={swipe.show ? faGreaterThan : faLessThan}
            onClick={siwpeSideBarFun}
          />
        </section>
        <section className={Style.brandName}>
          <img src="/assets/images/DDTECH.png" />
          <p>Technologies</p>
        </section>
      </section>
    </>
  );
}
