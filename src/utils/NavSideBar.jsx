import React, { useState, useEffect, useRef } from "react";
import { Image } from "react-bootstrap";
import Style from "./NavSideBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CustomeDropDown from "../Container/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminLogout } from "../redux/action/AdminAction";
import { slideShow } from "../redux/action/SlideAction";
import logo from "../assets/images/DDTECH.png";
import Logcat from "../assets/images/lgnewsmall.png";
import LogcatLarge from "../assets/images/logcatlargewhite.png";

import settigns from "../assets/icons/settings.png";

export function Navbar(props) {
  const { navdetails } = props;
  const [sidebar, setSidebar] = useState(false);
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  // const [navToggle, setNavToggle] = useState(true);
  // SWIPE NAVBAR STATE
  const [swipe, setSwipe] = useState({
    show: true,
  });

  // SHOW ACCOUNT DETAILS
  // const [showTableDropDown, setShowTableDropDown] = useState(false);

  const [userInfo, setUserInfo] = useState(false);
  const ref = useRef();

  const { adminInfo } = adminLoginReducer;

  // SLIDEWINDOW STATE
  const slideWindowReducer = useSelector((state) => state.slideWindowReducer);
  const { data } = slideWindowReducer;

  // checking if navlink 2 is not avilables

  const showSidebar = () => setSidebar(!sidebar);
  const dispatch = useDispatch();
  let history = useHistory();
  const handlelogout = (e) => {
    e.preventDefault();
    dispatch(adminLogout(history));
  };

  // const currentRoute = useHistory().location.pathname.toLowerCase();

  // navigation toogle
  // const navToggleFun = () => {
  //   if (navToggle) {
  //     return setNavToggle(false);
  //   }
  //   return setNavToggle(true);
  // };

  // let history = useHistory();
  // const dispatch = useDispatch();
  // const handlelogout = (e) => {
  //   e.preventDefault();
  //   dispatch(adminLogout(history));
  // };
  // props.navbardetails.dashName.charAt(0).toUpperCase() +
  // props.navbardetails.dashName.slice(1)

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
    dispatch(slideShow(swipe));
  }, [swipe]);

  const showUserInfoFun = () => {
    setUserInfo(!userInfo);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (userInfo && ref.current && !ref.current.contains(e.target)) {
        setUserInfo(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [userInfo]);

  return (
    <>
      <nav
        className={data.show ? Style.navbarWihoutSlide : Style.navbar}
        // ref={ref}
      >
        <section className={Style.NavbarSectionWithMenu}>
          <section className={Style.Icon}>
            <FontAwesomeIcon
              icon={faBars}
              onClick={siwpeSideBarFun}
              size="lg"
            />
          </section>
          <h3
            className="p-3"
            style={{
              fontSize: "1.5rem",
              marginBottom: "-3px",
              letterSpacing: "0.5px",
            }}
          >
            {navdetails.dashName.charAt(0).toUpperCase() +
              navdetails.dashName.slice(1)}
          </h3>
        </section>
        <section className={Style.userInfo} onClick={showUserInfoFun}>
          <section className={Style.Avtar}>
            {adminInfo &&
              adminInfo.data &&
              adminInfo.data.name
                .split(" ")
                .map((name) => name[0][0].toUpperCase())}
          </section>
          <section style={{ fontWeight: "500" }} className="m-2">
            {adminInfo &&
              adminInfo.data &&
              adminInfo.data.name
                .split(" ")
                .map(
                  (name) => name.charAt(0).toUpperCase() + name.slice(1) + " "
                )}
          </section>
        </section>
      </nav>
      {userInfo && (
        <CustomeDropDown
          position="fixed"
          right="0%"
          top="6%"
          width="200px"
          zIndex="10"
        >
          <p className="mt-2" className={Style.userInfoDropDown}>
            Account
          </p>
          <p
            className="mt-2"
            className={Style.userInfoDropDown}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              handlelogout(e);
            }}
          >
            Logout
          </p>
        </CustomeDropDown>
      )}
    </>
  );
}

// =========================================sidebar starts here=======================================

export function SideBar(props) {
  const { sidebarDetails } = props;
  const [sidebar, setSidebar] = useState(false);
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  // const [navToggle, setNavToggle] = useState(true);
  const { loading, adminInfo } = adminLoginReducer;

  // SLIDEWINDOW STATE
  const slideWindowReducer = useSelector((state) => state.slideWindowReducer);
  const { data } = slideWindowReducer;

  // URL STRING
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const settingUrl = urlParams.get("pagename") || "";
  const logURLName = urlParams.get("pagename") || "";

  // checking if navlink 2 is not avilables

  const dispatch = useDispatch();

  // const currentRoute = useHistory().location.pathname.toLowerCase();

  // navigation toogle
  // const navToggleFun = () => {
  //   if (navToggle) {
  //     return setNavToggle(false);
  //   }
  //   return setNavToggle(true);
  // };

  return (
    <>
      <section
        className={data.show ? `${Style.sideBarSwipe}` : `${Style.sideBar}`}
      >
        {/* SWIPE WITH LOGCAT NAME */}
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
              {data.show ? (
                <Image className={Style.logologcat} src={Logcat} alt="logcat" />
              ) : (
                <Image
                  className={Style.logologcat}
                  src={LogcatLarge}
                  alt="logcat"
                />
              )}
            </section>
          </Link>
        </section>

        <section
          className={data.show ? `${Style.SwipeOption}` : `${Style.options}`}
        >
          {/* LINK FIRST  */}

          <section
            className={
              logURLName.includes("logpage") || logURLName.includes("analytics")
                ? `${Style.option_active}`
                : `${Style.optionItems} `
            }
          >
            <Link
              className={Style.optionItems}
              to={
                sidebarDetails.link1 &&
                sidebarDetails.link1.link &&
                sidebarDetails.link1.link.length === 0
                  ? ""
                  : sidebarDetails.link1.link
              }
            >
              <Image src={sidebarDetails.link1.iconName} />
              <section className={Style.optionName}>
                {sidebarDetails.link1.linkName}
              </section>
            </Link>
          </section>

          {/* LINK SECOND  */}
          {adminInfo && adminInfo.data && adminInfo.data.isSuperAdmin && (
            <section
              className={
                settingUrl.includes("settings")
                  ? `${Style.option_active}`
                  : `${Style.optionItems} `
              }
            >
              <Link
                className={Style.optionItems}
                to={
                  sidebarDetails.link2 &&
                  sidebarDetails.link2.link &&
                  sidebarDetails.link2.link.length === 0
                    ? ""
                    : sidebarDetails.link2.link
                }
              >
                <Image src={settigns} />
                <section className={Style.optionName}>
                  {sidebarDetails.link2.linkName}
                </section>
              </Link>
            </section>
          )}
        </section>

        <section className={Style.brandName}>
          <Image src={logo} />
          <p>Technologies</p>
        </section>
      </section>
    </>
  );
}
