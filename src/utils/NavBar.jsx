
/* eslint-disable */
import React, { useState } from "react";
import CustomeDropDown from "../container/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminLogout } from "../store/action/AdminAction";
import Style from "../css/NavBar.module.css";
import { ThemeContext } from "./ThemeContext";
import doctor from "../assets/images/doctor.png"
import user from "../assets/images/man.png"
import dispatchIcon from "../assets/images/dispatch.png"

export function Navbar(props) {
  const { navigation_details } = props;
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  let { sideMenu } = React.useContext(ThemeContext);
  const { adminInfo } = adminLoginReducer;

  const avatar = useState(
    adminInfo && adminInfo.image && adminInfo.image && adminInfo.data.token
  )[0];

  // SHOW ACCOUNT DETAILS

  const [userInfo, setUserInfo] = useState(false);
  const userRole = adminInfo && adminInfo.data && adminInfo.data.userType
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handlelogout = (e) => {
    e.preventDefault();
    dispatch(adminLogout(navigate));
    localStorage.setItem('userrole', userRole)
  };
  console.log("adminInfo000", userRole)
  const showUserInfoFun = () => {
    setUserInfo(!userInfo);
  };
  console.log("admininfo", adminInfo.statusCode)
  const Updatedname = localStorage.getItem("name")
  const Updatedemail = localStorage.getItem("email")
  return (
    <>
      <section className={`${Style.NavbarOuter}`}>
        <nav className={Style.Navbar}>
          <h5 style={{ color: "#fff" }}>
            {navigation_details && navigation_details.dashName && navigation_details.dashName.charAt(0).toUpperCase() +
              navigation_details.dashName.slice(1)}
          </h5>
          <section className={sideMenu == "sidebar" ? `${Style.detailSection}` : `navBarDetails`}>
            <section
              className={
                sideMenu == "sidebar"
                  ? `${Style.AvatarSection}`
                  : `AvatarSectionSidbar`
              }
              onClick={showUserInfoFun}
            >
              {adminInfo && adminInfo.data && adminInfo.data.userType == "Admin" ?
                <img className={Style.adminAvtar} src={doctor} /> :
                adminInfo && adminInfo.data && adminInfo.data.userType == "User" ?
                  <img src={user} style={{ widt: "1rem", height: "3rem" }} /> :
                  <img src={dispatchIcon} style={{ widt: "0rem", height: "2.5rem" }} />}
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
              {adminInfo && adminInfo.data && adminInfo.data.userType == "Admin" ?
                <img className="avtar" src={doctor} style={{ widt: "0rem", height: "3rem" }} /> :
                adminInfo && adminInfo.data && adminInfo.data.userType == "User" ?
                  <img className="avtar" src={user} style={{ widt: "0rem", height: "4rem" }} /> :
                  <img className="avtar" src={dispatchIcon} style={{ widt: "1rem", height: "3.5rem" }} />}
            </section>
            <p
            className={Style.UpdateNameText}
            >
              {/* {localStorage.getItem("name")} */}
              {adminInfo && adminInfo.data && adminInfo.data.userType == "Admin" ? <> Dr. {Updatedname}</> : adminInfo && adminInfo.data && Updatedname}
            </p>
            <p
              className={Style.updateEmailText}
            >
              {Updatedemail}
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
              <Link to="/privacyPolicy" style={{ textDecoration: "none", color: "#CB297B" }}>
                <h6 style={{ fontSize: "0.8rem" }}>Privacy policy</h6>
              </Link>
              <Link to="/termsOfServices" style={{ textDecoration: "none", color: "#CB297B" }}>
                <h6 style={{ fontSize: "0.8rem" }}>Terms of service</h6>
              </Link>
            </section>
          </CustomeDropDown>
        )}
      </section>
    </>
  );
}
