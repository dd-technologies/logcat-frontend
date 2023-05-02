
/* eslint-disable */
import React, { useState } from "react";
import CustomeDropDown from "../container/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../store/action/AdminAction";
import Style from "../css/NavBar.module.css";
import DarkLightMood from "./DarkLightMood";
import { ThemeContext } from "./ThemeContext";
// import Bell from "../assets/images/BellIcon.png";

export function Navbar(props) {
  const { navigation_details } = props;
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  let { sideMenu } = React.useContext(ThemeContext);
  // console.log("sidemene", sideMenu);
  const { adminInfo } = adminLoginReducer;

  const avatar = useState(
    adminInfo && adminInfo.image && adminInfo.image
  )[0];

  // SHOW ACCOUNT DETAILS

  const [userInfo, setUserInfo] = useState(false);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handlelogout = (e) => {
    e.preventDefault();
    dispatch(adminLogout(navigate));
  };

  const showUserInfoFun = () => {
    setUserInfo(!userInfo);
  };


  return (
    <>
      <section className={`${Style.NavbarOuter}`}>
        <nav className={Style.Navbar}>
          <h5 style={{ color: "#fff" }}>
            {navigation_details && navigation_details.dashName && navigation_details.dashName.charAt(0).toUpperCase() +
              navigation_details.dashName.slice(1)}
          </h5>

          <section className={sideMenu == "sidebar" ? `${Style.detailSection}` : `navBarDetails`}>
            {/* light and dark mood */}
            <DarkLightMood />
            {/* <img
              style={{
                width: "20%",
                filter: "invert(1)",
              }}
              src={Bell}
              alt="bell-icon"
            /> */}

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
                adminInfo.data.name.split(" ")[0].split("")[0]}
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
                adminInfo.data.name.split(" ")[0].split("")[0]
              )}
            </section>

            <p
              style={{
                fontSize: "1.3rem",
              }}
              className="darkModeColor"
            >
              {adminInfo && adminInfo.data && adminInfo.data.name}
              {/* {console.log(adminInfo.data.name)} */}
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
