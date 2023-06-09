
/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { faEnvelope, faUser, } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row, Button } from "react-bootstrap";
import CustomeDropDown from "../../container/DropDown";
import Style from "../../css/UpdateProfile.module.css";
import LogICon from "../../assets/icons/log.png";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { passwordChangeAction, userInfoActionFn } from "../../store/action/UserProfileAction";
import { toast, Toaster } from "react-hot-toast";
import doctor from "../../assets/images/doctor.png"
// import { updateProfile } from "../../store/action/AdminAction";
// import UpdatePassword from "./UpdatePassword";
import SideBar from "../../utils/Sidebar";
import { Navbar } from "../../utils/NavBar";
import { updateUserInfoAction } from "../../store/action/UpdateUserInfoAction";
import back from "../../assets/images/back.png";
import { Link } from "react-router-dom";
import user from "../../assets/images/man.png"
export default function UpdateProfile() {
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
console.log("adminInfo",adminInfo)
    const userId=adminInfo && adminInfo.data &&adminInfo.data._id
  // const avatar = useState(
  //   adminInfo && adminInfo.image && adminInfo.image && adminInfo.data.token
  // )[0];

  const userInfoReducer = useSelector((state) => state.userInfoReducer);
  const { data } = userInfoReducer;
  const userName = data && data.data && data.data.user && data.data.user.name
  const userEmail = data && data.data && data.data.user && data.data.user.email
  const userAvtar = data && data.data && data.data.user && data.data.user.image

  console.log("data", JSON.stringify(data))
  console.log("userName",userName)
  console.log("userId",userId)
  // uprofile reducer
  const passwordChangeReducer = useSelector(
    (state) => state.passwordChangeReducer
  );

  const { data: updatepasswordresponseData } = passwordChangeReducer;

  const [name, setname] = useState(adminInfo.data.name);

  const [email, setEmail] = useState(userEmail)

  const [avatar, setAvtar] = useState("")



  const dispatch = useDispatch();

  const [currentpassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewpassword, setConfirmNewPassword] = useState("");
  const error = useState(null)[0];

  if (
    updatepasswordresponseData &&
    updatepasswordresponseData.success == false
  ) {
    updatepasswordresponseData.success = "";
    toast.error(
      updatepasswordresponseData && updatepasswordresponseData.message
    );
  }
  if (updatepasswordresponseData && updatepasswordresponseData.status == 1) {
    updatepasswordresponseData.status = "";
    toast.success(
      updatepasswordresponseData && updatepasswordresponseData.message
    );
  }


  // Show password
  const [showPassword, setShowPassword] = useState({
    currentpasswordShow: false,
    newPasswordShow: false,
    confirmNewpasswordShow: false,
  });

  const navigation_details = {
    name: "Update profile",
    dashName: "Update profile",
    link1: {
      iconName: "",
      linkName: "",
    },
    link2: {
      iconName: "",
      linkName: "",
    },
  };

  const sidebar_details = {
    name: "projectName",
    dashName: "projectName",
    link1: {
      iconName: LogICon,
      linkName: "Logs",
      link: ``,
    },
    link2: {
      iconName: `/assets/icons/settings.png`,
      linkName: "Settings",
      link: ``,
    },
    link3: {
      iconName: `/assets/images/AlarmIcon.png`,
      linkName: "Settings",
      link: ``,
    },
  };

  // updated password function
  const updatePasswordFun = (e) => {
    e.preventDefault();
    if (!currentpassword || !newPassword || !confirmNewpassword) {
      toast.error("Provide all field value to update password!");
      return;
    }
    // 1) if current and new password are same
    if (
      currentpassword == newPassword &&
      currentpassword == confirmNewpassword
    ) {
      toast.error("Check new password it should not be same to previous");
      return;
    }
    // 2) new password match with current password
    if (newPassword !== confirmNewpassword) {
      toast.error("New password and Confirm pass should be same");
      return;
    }
    dispatch(passwordChangeAction(currentpassword, newPassword));
  };


  // Update profile data
  const handleSubmit = () => {
    if (!name) {
      return toast.error("Please enter Updated name")
    }
    console.log("userInfo",userId,name,email,avatar)
    toast.success("User name updated..")
    const UpdateName=localStorage.setItem("name",name)
    const getName=localStorage.getItem("name")
    console.log("UpdateName",UpdateName)
    console.log("getName",getName)
    return dispatch(updateUserInfoAction(name,userId,avatar))
   
  };

  useEffect(() => {
    setname(userName)
    setEmail(userEmail)
    setAvtar(userAvtar)
  }, [email])
  const inputRef=useRef(null);

const handleAvtarClick=()=>{
  inputRef.current.click()
}
const handlAvtarChange=(event)=>{
  const file =event.target.files[0];
  console.log("file",file)
  setAvtar(event.target.files[0],event.target.files.name)
}
console.log("window",window)
  return (
    <>
    <Navbar/>
    <SideBar/>
    <div
        className="main-overview"
        style={{ position: "absolute", top: "5rem", left: "8rem" ,width:"100%"}}
      >
        <div
          className="inside-overview"
          style={{ display: "flex", gap: "8rem" }}
        >
            {/* Heading  */}
          <div
            className=""
            style={{ display: "flex", color:"#707070"}}
          >
            <Link  to="/device">
              <img src={back}style={{width:"4rem"}}/>
            </Link>
          </div>
          <div
            style={{gap:"1rem", display: "flex", alignItems: "center",flexDirection:"column", color:"#707070",width:"60%"}}
          >
          <h4 style={{fontSize:"2rem"}}>Profile</h4>
            {/* <section className={Style.OuterDiv}> */}
              <Toaster />
                  <div className={Style.main}
                  >
                    <section className={Style.Avtarunder}>
                      {/* {avatar ? ( */}
                      <div onClick={handleAvtarClick}>
                        {avatar?<img src={URL.createObjectURL(avatar)} alt="Avatar" style={{height:"7rem"}}/>:
                        <>{adminInfo && adminInfo.data && adminInfo.data.userType=="Admin"?<img className="avtar" src={doctor} style={{widt:"0rem",height:"7rem"}}/>:<img className="avtar" src={user} style={{widt:"0rem",height:"6.7rem"}}/>} </>}
                        <input type="file" ref={inputRef} onChange={handlAvtarChange} style={{display:"none"}} />
                        </div>
                      {/* ) : ( */}
                        {/* data && */}
                        {/* data.data && data.data.user && */}
                        {/* data.data.user.name */}
                          {/* .split(" ") */}
                          {/* .map((name) => name[0][0].toUpperCase()) */}
                      
                      {/* <img className="avtar" src={doctor} style={{widt:"0rem",height:"inherit"}}/> */}
                      {/* {adminInfo && adminInfo.data && adminInfo.data.userType=="Admin"?<img className="avtar" src={doctor} style={{widt:"0rem",height:"7rem"}}/>:<img className="avtar" src={user} style={{widt:"0rem",height:"6.7rem"}}/>} */}
                    </section>
                    {/*name field  */}
                    <section>
                      <h6 className="darkModeColor">Name</h6>
                      <div
                        className={`${Style.imputFields} darkBgColorSec mt-2`}
                      >
                        <span className="ms-2">
                          <FontAwesomeIcon icon={faUser} size="lg" />
                        </span>
                        <input
                          style={{ color: "#212529", opacity: ".7" }}
                          type="email"
                          autoComplete="Enter your full name"
                          value={name}
                          autocomplete="on"
                          className="form-control LoginForminput"
                          placeholder="Enter your name"
                          onChange={(e) => {
                            setname(e.target.value);
                          }}

                        />
                      </div>
                    </section>
                    {/* email field */}
                    <section>
                      <h6 className="darkModeColor">Email</h6>
                      <div
                        className={`${Style.imputFields} darkBgColorSec mt-2 `}
                      >
                        <span className="ms-2">
                          <FontAwesomeIcon icon={faEnvelope} size="lg" />
                        </span>
                        <input
                          style={{ opacity: ".6" }}
                          type="email"
                          autoComplete="Enter your email"
                          value={email}
                          className="form-control LoginForminput"
                          placeholder="Enter your email"
                          disabled="disabled"
                        />
                      </div>
                    </section>
                    <div>
                    <button style={{padding:"10px 80px",border:"0px solid black",borderRadius:"15px",backgroundColor:"#cb297b",color:"white"}} onClick={handleSubmit}>
                          UPDATE
                        </button>
                    </div>
                  </div>
                  </div>
                  </div>
          </div>
                {/*password change section*/}
                {/* <UpdatePassword
                  error={error}
                  currentpassword={currentpassword}
                  setCurrentPassword={setCurrentPassword}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  newPassword={newPassword}
                  setNewPassword={setNewPassword}
                  confirmNewpassword={confirmNewpassword}
                  setConfirmNewPassword={setConfirmNewPassword}
                  updatePasswordFun={updatePasswordFun}
                /> */}
            {/* </section> */}
    </>
  );
}
