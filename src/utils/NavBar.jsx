
/* eslint-disable */
import React, { useState } from "react";
import CustomeDropDown from "../container/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminLogout } from "../store/action/AdminAction";
import Style from "../css/NavBar.module.css";
// import DarkLightMood from "./DarkLightMood";
import { ThemeContext } from "./ThemeContext";
import doctor from "../assets/images/doctor.png"
import user from "../assets/images/man.png"
// import Bell from "../assets/images/BellIcon.png";

export function Navbar(props) {
  const { navigation_details } = props;
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  let { sideMenu } = React.useContext(ThemeContext);
  // console.log("sidemene", sideMenu);
  const { adminInfo } = adminLoginReducer;

  const avatar = useState(
    adminInfo && adminInfo.image && adminInfo.image && adminInfo.data.token
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

const Updatedname=localStorage.getItem("name")
const Updatedemail=localStorage.getItem("email")
console.log("Updatedemail",Updatedemail)
console.log("Updatedname",Updatedname)
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
              {/* {adminInfo &&
                adminInfo.data &&
                adminInfo.data.name
                .split(" ")[0].split("")[0]
                } */}
                {adminInfo && adminInfo.data && adminInfo.data.userType=="Admin"?<img className="avtar" src={doctor} style={{widt:"0rem",height:"2rem"}}/>:<img className="avtar" src={user} style={{widt:"0rem",height:"2.5rem"}}/>}
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
              {/* {avatar ? (
                <img src={URL.createObjectURL(avatar)} alt="Avatar" />
              ) : (
                adminInfo &&
                adminInfo.data &&
                adminInfo.data.name
                .split(" ")[0].split("")[0]
              )} */}
              {/* <img className="avtar" src={doctor} style={{widt:"0rem",height:"3rem"}}/> */}
              {adminInfo && adminInfo.data && adminInfo.data.userType=="Admin"?<img className="avtar" src={doctor} style={{widt:"0rem",height:"3rem"}}/>:<img className="avtar" src={user} style={{widt:"0rem",height:"4rem"}}/>}
            </section>

            <p
              style={{
                fontSize: "1.3rem",
                color:"#707070"
              }}
              className="darkModeColor"
            >
              {/* {localStorage.getItem("name")} */}
              {adminInfo && adminInfo.data && adminInfo.data.userType=="Admin"?<> Dr. {Updatedname}</>:adminInfo && adminInfo.data && Updatedname}
            </p>
            <p
              style={{
                fontSize: "1rem",
                color:"#707070",
              }}
              className="darkModeColor"
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
              style={{ border: "1px solid #fff", marginTop: "5px"}}
              className={`${Style.logoutAccount} darkModeColor`}
              onClick={(e) => {
                handlelogout(e);
              }}
            >
              Logout
            </section>
            <section className={Style.privacyPolicy}>
              <Link to="/privacyPolicy" style={{textDecoration:"none",color:"#CB297B"}}>
              <h6 style={{fontSize:"0.8rem"}}>Privacy policy</h6>
              </Link>
              <Link to="/termsOfServices" style={{textDecoration:"none",color:"#CB297B"}}>
              <h6 style={{fontSize:"0.8rem"}}>Terms of service</h6>
              </Link>
            </section>
          </CustomeDropDown>
        )}
      </section>
    </>
  );
}
