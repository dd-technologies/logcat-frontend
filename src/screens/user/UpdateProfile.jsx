
/* eslint-disable */
import React, { useEffect, useState } from "react";
import { faEnvelope, faUser, } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row, Button } from "react-bootstrap";
import CustomeDropDown from "../../container/DropDown";
import Style from "../../css/UpdateProfile.module.css";
import LogICon from "../../assets/icons/log.png";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { passwordChangeAction, userInfoActionFn } from "../../store/action/UserProfileAction";
import { toast, Toaster } from "react-hot-toast";
import { updateProfile } from "../../store/action/AdminAction";
import UpdatePassword from "./UpdatePassword";
import SideBar from "../../utils/Sidebar";
import { Navbar } from "../../utils/NavBar";
import { updateUserInfoAction } from "../../store/action/UpdateUserInfoAction";

export default function UpdateProfile() {
  const userInfoReducer = useSelector((state) => state.userInfoReducer);
  const { data } = userInfoReducer;
  const userName = data && data.data && data.data.user && data.data.user.name
  const userEmail = data && data.data && data.data.user && data.data.user.email
  const userAvtar = data && data.data && data.data.user && data.data.user.image

  console.log("data", data)

  // uprofile reducer
  const passwordChangeReducer = useSelector(
    (state) => state.passwordChangeReducer
  );

  const { data: updatepasswordresponseData } = passwordChangeReducer;

  const [name, setname] = useState(userName);

  const [email, setEmail] = useState(userEmail)

  const [avatar, setAvtar] = useState(userAvtar)



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
  const handleSubmit = (e) => {
    // dispatch(updateProfile(email, name, avatar));

    if (!name) {
      return toast.error("Please enter your name")
    }

    toast.success("User name updated..")
    return dispatch(updateUserInfoAction(name))
  };

  useEffect(() => {
    dispatch(updateUserInfoAction())
  }, [name,email])

  useEffect(() => {
    setname(userName)
    setEmail(userEmail)
    setAvtar(userAvtar)
  }, [email])


  return (
    <>
      <Row className="rowSection">
        <Col xl={2} lg={2} md={2} sm={2} className="noSidebar colSection">
          <SideBar sidebar_details={sidebar_details} />
        </Col>
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={`${Style.NavbarColumn} colSection`}
        >
          <Navbar navigation_details={navigation_details} />
          <Container className={Style.mainContainer}>
            <section className={Style.OuterDiv}>
              <Toaster />
              <Row style={{ marginTop: "150px" }}>
                <Col xl={6} md={12} sm={12}>
                  <CustomeDropDown
                    padding="30px"
                    marginRight="10px"
                    top="0%"
                    zIndex="8"
                    height="600px"
                  >
                    <h3 className="mb-4 darkModeColor">Update profile</h3>
                    <section className={Style.Avtarunder}>
                      {avatar ? (
                        <img src={URL.createObjectURL(avatar)} alt="Avatar" />
                      ) : (
                        data &&
                        data.data && data.data.user &&
                        data.data.user.name
                          .split(" ")
                          .map((name) => name[0][0].toUpperCase())
                      )}
                    </section>

                    {/*name field  */}
                    <section className="mt-4">
                      <h5 className="darkModeColor">Name</h5>
                      <div
                        className={`${Style.imputFields} darkBgColorSec mt-2`}
                      >
                        <span className="ms-2">
                          <FontAwesomeIcon icon={faUser} size="lg" />
                        </span>
                        <input
                          style={{ color: "#212529", opacity: ".7" }}
                          type="email"
                          autoComplete="Enter your name"
                          value={name}
                          className="form-control LoginForminput"
                          placeholder="Enter your name"
                          onChange={(e) => {
                            setname(e.target.value);
                          }}

                        />
                      </div>
                    </section>

                    {/* email field */}
                    <section className="mt-4">
                      <h5 className="darkModeColor">Email</h5>
                      <div
                        className={`${Style.imputFields} darkBgColorSec mt-2 `} style={{background: '#d1d1d1'}}
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

                    <Row className={Style.buttonbackground}>
                      <Col className={Style.buttonbackground}>
                        <Button className="mt-4" onClick={handleSubmit}>
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </CustomeDropDown>
                </Col>

                {/*password change section*/}
                <UpdatePassword
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
                />
              </Row>
            </section>
          </Container>
        </Col>
      </Row>
    </>
  );
}
