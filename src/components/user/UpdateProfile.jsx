import React, { useState } from "react";
import {
  faUpload,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row, Button } from "react-bootstrap";
import CustomeDropDown from "../../Container/DropDown";
import Style from "./UpdateProfile.module.css";
import LogICon from "../../assets/icons/log.png";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { passwordChangeAction } from "../../redux/action/UserProfileAction";
import { toast, Toaster } from "react-hot-toast";
import { updateProfile } from "../../redux/action/AdminAction";
import UpdatePassord from "./UpdatePassord";
import SideBar from "../../utils/Sidebar";
import { Navbar } from "../../utils/NavBar";

export default function UpdateProfile() {
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;

  // update profile reducer
  const passwordChangeReducer = useSelector(
    (state) => state.passwordChangeReducer
  );

  const [name, setname] = useState(
    adminInfo && adminInfo.data && adminInfo.data.name
  );

  const [email, setemail] = useState(
    adminInfo && adminInfo.data && adminInfo.data.email
  );

  const [avatar, setAvatar] = useState(
    adminInfo && adminInfo.image && adminInfo.image
  );

  const {
    loading: lnd,
    data: updatepasswordresponseData,
    error: err,
  } = passwordChangeReducer;

  const dispatch = useDispatch();

  const [currentpassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewpassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(null);

  if (
    updatepasswordresponseData &&
    updatepasswordresponseData.success === false
  ) {
    updatepasswordresponseData.success = "";
    toast.error(
      updatepasswordresponseData && updatepasswordresponseData.message
    );
  }
  if (updatepasswordresponseData && updatepasswordresponseData.status === 1) {
    updatepasswordresponseData.status = "";
    toast.success(
      updatepasswordresponseData && updatepasswordresponseData.message
    );
  }

  const [crop, setCrop] = useState();

  // Update profile data
  const handleSubmit = (e) => {
    dispatch(updateProfile(email, name, avatar));
  };

  // Upload Avatar
  const handleUpload = (e) => {
    const file = e.target.files;
    setAvatar(file[0]);
  };

  // Show password
  const [showPassword, setShowPassword] = useState({
    currentpasswordShow: false,
    newPasswordShow: false,
    confirmNewpasswordShow: false,
  });

  const navdetails = {
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

  const sidebarDetails = {
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
      currentpassword === newPassword &&
      currentpassword === confirmNewpassword
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

  return (
    <>
      <Row className="rowSection">
        <Col xl={2} lg={2} md={2} sm={2} className="noSidebar colSection">
          <SideBar sidebarDetails={sidebarDetails} />
        </Col>
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={`${Style.NavbarColumn} colSection`}
        >
          <Navbar navdetails={navdetails} />
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
                        adminInfo &&
                        adminInfo.data &&
                        adminInfo.data.name
                          .split(" ")
                          .map((name) => name[0][0].toUpperCase())
                      )}
                    </section>
                    {/* <section className={Style.editImage}>
                      <label for="image_upload">
                        <FontAwesomeIcon icon={faUpload} size="lg" />
                      </label>
                      <input
                        type="file"
                        id="image_upload"
                        accept=".jpg, .jpeg, .png"
                        style={{ display: "none", visibility: "none" }}
                        onChange={(e) => handleUpload(e)}
                      />
                    </section> */}
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
                          type="email"
                          value={name}
                          className="form-control LoginForminput"
                          id="exampleInputEmail1"
                          placeholder="Enter your email"
                          aria-describedby="emailHelp"
                          onChange={(e) => {
                            setname(e.target.value);
                          }}
                          disabled="disabled"
                        />
                      </div>
                    </section>

                    {/* email field */}
                    <section className="mt-4">
                      <h5 className="darkModeColor">Email</h5>
                      <div
                        className={`${Style.imputFields} darkBgColorSec mt-2 `}
                      >
                        <span className="ms-2">
                          <FontAwesomeIcon icon={faEnvelope} size="lg" />
                        </span>
                        <input
                          type="email"
                          value={email}
                          className="form-control LoginForminput"
                          id="exampleInputEmail1"
                          placeholder="Enter your email"
                          aria-describedby="emailHelp"
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
                <UpdatePassord
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
