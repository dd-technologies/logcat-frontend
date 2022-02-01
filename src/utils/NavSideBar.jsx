import React, { useState, useEffect, useRef } from "react";
import { Button, Image } from "react-bootstrap";
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
import Log from "../assets/icons/log.png";
import settigns from "../assets/icons/settings.png";

export function Navbar(props) {
  const { navdetails } = props;
  const [sidebar, setSidebar] = useState(false);
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const [navToggle, setNavToggle] = useState(true);
  // SWIPE NAVBAR STATE
  const [swipe, setSwipe] = useState({
    show: true,
  });

  // SHOW ACCOUNT DETAILS
  // const [showTableDropDown, setShowTableDropDown] = useState(false);

  const [userInfo, setUserInfo] = useState(false);
  const ref = useRef();

  const { loading, adminInfo } = adminLoginReducer;

  // SLIDEWINDOW STATE
  const slideWindowReducer = useSelector((state) => state.slideWindowReducer);
  const { data } = slideWindowReducer;
  // console.log("slideWindowReducer", data);

  // console.log(adminInfo.data.name);

  // checking if navlink 2 is not avilables

  const showSidebar = () => setSidebar(!sidebar);
  const dispatch = useDispatch();
  let history = useHistory();
  const handlelogout = (e) => {
    // console.log('logout click');
    e.preventDefault();
    dispatch(adminLogout(history));
    // console.log("handleclose", "handle close button pressed");
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
    // console.log("slideWindowReducer", "useEffect Run");
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
            style={{ fontSize: "1.5rem", marginBottom: "-3px" }}
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
          <section className="m-2">
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
          right="4%"
          top="7%"
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

export function SideBar(props) {
  const { sidebarDetails } = props;
  // console.log("sidebarDetails", props);
  const [sidebar, setSidebar] = useState(false);
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const [navToggle, setNavToggle] = useState(true);
  const { loading, adminInfo } = adminLoginReducer;

  // SLIDEWINDOW STATE
  const slideWindowReducer = useSelector((state) => state.slideWindowReducer);
  const { data } = slideWindowReducer;
  // console.log("slideWindowReducer", data);

  // checking if navlink 2 is not avilables

  const dispatch = useDispatch();

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
              {data.show ? "LC" : "LogCat"}
            </section>
          </Link>
        </section>

        <section
          className={data.show ? `${Style.SwipeOption}` : `${Style.options}`}
        >
          <section className={`${Style.optionItems} ${Style.option_active}`}>
            <Link
              className={`${Style.optionItems} ${Style.option_active}`}
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
          <section className={Style.optionItems}>
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
              <Image src={settigns} />
              <section className={Style.optionName}>
                {sidebarDetails.link2.linkName}
              </section>
            </Link>
          </section>
        </section>

        <section className={Style.brandName}>
          <Image src={logo} />
          <p>Technologies</p>
        </section>
      </section>
    </>
  );
}
