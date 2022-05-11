import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import CustomeDropDown from "../Container/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../redux/action/AdminAction";
import Style from "./NavBar.module.css";
import DarkLightMood from "./DarkLightMood";
import { ThemeContext } from "./ThemeContext";

export function Navbar(props) {
  const { navdetails } = props;
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  let { sideMenu } = React.useContext(ThemeContext);
  // console.log("sidemene", sideMenu);
  const { adminInfo } = adminLoginReducer;

  const [avatar, setAvatar] = useState(
    adminInfo && adminInfo.image && adminInfo.image
  );

  // SHOW ACCOUNT DETAILS

  const [userInfo, setUserInfo] = useState(false);
  const ref = useRef();

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handlelogout = (e) => {
    e.preventDefault();
    dispatch(adminLogout(navigate));
  };

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
      <section className={`${Style.NavbarOuter}`}>
        <nav className={Style.Navbar}>
          <h3 style={{ color: "#fff", fontWeight: "500" }}>
            {navdetails.dashName.charAt(0).toUpperCase() +
              navdetails.dashName.slice(1)}
          </h3>

          <section
            className={
              sideMenu == "sidebar" ? `${Style.detailSection}` : `navBarDetails`
            }
          >
            {/* light and dark mood */}
            <DarkLightMood />
            <section>
              <FontAwesomeIcon icon={faBell} size="2x" color="#fff" />
            </section>

            <section
              className={
                sideMenu == "sidebar"
                  ? `${Style.AvatarSection}`
                  : `AvatarSectionSidbar`
              }
              onClick={showUserInfoFun}
            >
              {adminInfo &&
                adminInfo.data &&
                adminInfo.data.name
                  .split(" ")
                  .map((name) => name[0][0].toUpperCase())}
            </section>
          </section>
        </nav>
        {userInfo && (
          <CustomeDropDown
            position="fixed"
            right="0%"
            top="6%"
            width="400px"
            zIndex="10"
            marginRight="10px"
          >
            <section
              className={Style.AvatarSectionDropDown}
              onClick={showUserInfoFun}
            >
              {avatar ? (
                <img src={URL.createObjectURL(avatar)} alt="Avatar" />
              ) : (
                adminInfo &&
                adminInfo.data &&
                adminInfo.data.name
                  .split(" ")
                  .map((name) => name[0][0].toUpperCase())
              )}
            </section>

            <p
              style={{
                fontSize: "1.3rem",
              }}
              className="darkModeColor"
            >
              {adminInfo && adminInfo.data && adminInfo.data.name}
            </p>
            <p
              style={{
                fontSize: "1rem",
              }}
              className="darkModeColor"
            >
              {adminInfo && adminInfo.data && adminInfo.data.email}
            </p>
            <section
              onClick={() => navigate("/update")}
              className={`${Style.manageAccount} darkModeColor`}
              style={{ border: "1px solid #fff" }}
            >
              Manage your account
            </section>

            <section
              style={{ border: "1px solid #fff", marginTop: "5px" }}
              className={`${Style.logoutAccount} darkModeColor`}
              onClick={(e) => {
                handlelogout(e);
              }}
            >
              Logout
            </section>

            <section className={Style.privacyPolicy}>
              <p className="darkModeColor">Privacy policy</p>
              <p className="darkModeColor">Terms of service</p>
            </section>
          </CustomeDropDown>
        )}
      </section>
    </>
  );
}
