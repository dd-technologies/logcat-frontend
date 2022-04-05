import React, { useEffect, useState } from "react";
import {
  faDatabase,
  faUpload,
  faMailBulk,
  faLock,
  faPersonBooth,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import CustomeDropDown from "../../Container/DropDown";
import { Navbar, SideBar } from "../../utils/NavSideBar";
import Style from "./UpdateProfile.module.scss";
import LogICon from "../../assets/icons/log.png";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { passwordChangeAction } from "../../redux/action/UserProfileAction";
import { persistor } from "../../redux/Store";
import { toast, Toaster } from "react-hot-toast";
import { updateProfile } from "../../redux/action/AdminAction";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
// or scss:
import "react-image-crop/src/ReactCrop.scss";

export default function UpdateProfile() {
  // SLIDEWINDOW STATE
  const slideWindowReducer = useSelector((state) => state.slideWindowReducer);
  const { data } = slideWindowReducer;

  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  // const [navToggle, setNavToggle] = useState(true);
  const { loading, adminInfo } = adminLoginReducer;

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

  console.log(`image ${avatar && avatar.name}`);

  const { data: updatepasswordresponseData } = passwordChangeReducer;
  // console.log("updatepasswordresponseData", updatepasswordresponseData);
  // console.log("message", updatepasswordresponseData);

  const dispatch = useDispatch();

  const [currentpassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewpassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState({
    currentpasswordError: null,
    newPasswordError: null,
    confirmNewpasswordError: null,
    custome: null,
  });

  const [crop, setCrop] = useState();

  // save update profile data

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(email, name, avatar));
  };

  // Upload Avatar
  const handleUpload = (e) => {
    // e.preventDefault();
    const file = e.target.files;
    // const formData = new FormData();
    // formData.append(file[0].name,file[0])
    setAvatar(file[0]);
  };

  // status sucess
  const [statusSucess, setStatusSucess] = useState("");

  // show password state

  const [showPassword, setShowPassword] = useState({
    currentpasswordShow: false,
    newPasswordShow: false,
    confirmNewpasswordShow: false,
  });

  const history = useHistory();

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
    },
    link2: {
      iconName: `/assets/icons/settings.png`,
      linkName: "Settings",
      link: ``,
    },
  };

  // after dispatch function callback
  const afterDispatchFun = async () => {
    const success =
      (await updatepasswordresponseData) && !updatepasswordresponseData.status;
    const message =
      (await updatepasswordresponseData) && updatepasswordresponseData.message;
    // console.log("first");
    if (!success == 1) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  // updated password function
  const updatePasswordFun = (afterDispatchFun) => {
    // console.log("first1");
    // if current password is empty
    if (!currentpassword) {
      setError({
        currentpasswordError: "Current password  can not be empty",
      });
      return;
    }
    // if new password is empty
    if (!newPassword) {
      setError({
        newPasswordError: "New password  can not be empty",
      });
      return;
    }
    // if newconfirme password is empty
    if (!confirmNewpassword) {
      setError({
        confirmNewpasswordError: "Confirm password can not be empty",
      });
      return;
    }

    // 1) if current and new password are same
    if (currentpassword == newPassword) {
      toast.error("Current and new password can not be same");
      return;
    }

    // 2) new password match with current password
    if (
      newPassword.length > 0 &&
      confirmNewpassword.length > 0 &&
      newPassword !== confirmNewpassword
    ) {
      setError({ custome: "New password and Confirm pass should be same" });
      return;
    }

    dispatch(passwordChangeAction(currentpassword, newPassword));
    afterDispatchFun();
    // after dispach need to push url to the home
    // console.log("dispatch", updatepasswordresponseData);
    // if (updatepasswordresponseData && updatepasswordresponseData.status) {
    // } else {
    //   toast.error(updatepasswordresponseData.message);
    // }
    // localStorage.removeItem("ddAdminToken");
    // localStorage.removeItem("selected_date");
    // localStorage.removeItem("page_no");
    // history.push("/");
  };

  return (
    <>
      <Row>
        <Col
          xl={2}
          lg={2}
          md={2}
          sm={2}
          className={data.show && `${Style.SidebarLogTable}`}
          style={{ padding: "0px" }}
        >
          <SideBar sidebarDetails={sidebarDetails} />
        </Col>
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={data.show && `${Style.NavbarLogTable}`}
          style={{ padding: "0px" }}
        >
          <Navbar navdetails={navdetails} />
          <Container
            className={
              data.show
                ? Style.LogtableContaininer
                : Style.LogtableContaininerWithoutSlide
            }
          >
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
                    <h3
                      className="mb-4"
                      style={{
                        color: JSON.parse(localStorage.getItem("darkMood"))
                          ? "#fff"
                          : "#000",
                      }}
                    >
                      Update profile
                    </h3>
                    <section className={Style.Avtarunder}>
                      <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                        {avatar ? (
                          <img src={URL.createObjectURL(avatar)} alt="Avatar" />
                        ) : (
                          adminInfo &&
                          adminInfo.data &&
                          adminInfo.data.name
                            .split(" ")
                            .map((name) => name[0][0].toUpperCase())
                        )}
                      </ReactCrop>
                      {/* src={URL.createObjectURL(image)} */}
                    </section>
                    <section className={Style.editImage}>
                      {/* <FontAwesomeIcon icon={faMailBulk} /> */}
                      <label for="image_upload">
                        <FontAwesomeIcon icon={faUpload} />
                      </label>
                      <input
                        type="file"
                        id="image_upload"
                        accept=".jpg, .jpeg, .png"
                        style={{ display: "none", visibility: "none" }}
                        onChange={(e) => handleUpload(e)}
                      />
                    </section>
                    {/*name field  */}
                    <section className="mt-4">
                      <h5
                        style={{
                          color: JSON.parse(localStorage.getItem("darkMood"))
                            ? "#fff"
                            : "#000",
                        }}
                      >
                        Name
                      </h5>
                      <div className={`${Style.imputFields} mt-4`}>
                        <span>
                          <FontAwesomeIcon icon={faPersonBooth} />
                        </span>
                        <input
                          style={{
                            color: JSON.parse(localStorage.getItem("darkMood"))
                              ? "#fff"
                              : "#000",
                          }}
                          type="email"
                          value={
                            // adminInfo && adminInfo.data && adminInfo.data.name
                            name
                          }
                          className="form-control LoginForminput "
                          id="exampleInputEmail1"
                          placeholder="Enter your email"
                          aria-describedby="emailHelp"
                          onChange={(e) => {
                            setname(e.target.value);
                          }}
                        />
                      </div>
                    </section>

                    {/* email field */}
                    <section className="mt-4">
                      <h5
                        style={{
                          color: JSON.parse(localStorage.getItem("darkMood"))
                            ? "#fff"
                            : "#000",
                        }}
                      >
                        Email
                      </h5>
                      <div className={`${Style.imputFields} mt-4`}>
                        <span>
                          <FontAwesomeIcon icon={faMailBulk} />
                        </span>
                        <input
                          style={{
                            color: JSON.parse(localStorage.getItem("darkMood"))
                              ? "#fff"
                              : "#000",
                          }}
                          type="email"
                          value={email}
                          className="form-control LoginForminput "
                          id="exampleInputEmail1"
                          placeholder="Enter your email"
                          aria-describedby="emailHelp"
                          // disabled
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </div>
                    </section>

                    <Row className={Style.buttonbackground}>
                      <Col className={Style.buttonbackground}>
                        <Button className="mt-4 w-50" onClick={handleSubmit}>
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </CustomeDropDown>
                </Col>

                {/* password change section */}

                <Col xl={6} md={12} sm={12}>
                  <CustomeDropDown
                    padding="30px"
                    marginRight="10px"
                    top="0%"
                    zIndex="8"
                    height="600px"
                  >
                    <h3
                      className="mb-4"
                      style={{
                        color: JSON.parse(localStorage.getItem("darkMood"))
                          ? "#fff"
                          : "#000",
                      }}
                    >
                      Change password
                    </h3>
                    {/* password field */}
                    <section className="mt-4">
                      <h5
                        style={{
                          color: JSON.parse(localStorage.getItem("darkMood"))
                            ? "#fff"
                            : "#000",
                        }}
                      >
                        Current Password
                      </h5>

                      <div
                        className={
                          error.currentpasswordError
                            ? `${Style.imputFieldsError}`
                            : `${Style.imputFields} mt-4`
                        }
                      >
                        <span>
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                          style={{
                            color: JSON.parse(localStorage.getItem("darkMood"))
                              ? "#fff"
                              : "#000",
                          }}
                          type={
                            showPassword.currentpasswordShow
                              ? "text"
                              : "password"
                          }
                          value={currentpassword}
                          onChange={(e) => {
                            setCurrentPassword(e.target.value);
                          }}
                          className="form-control LoginForminput "
                          id="exampleInputEmail1"
                          placeholder="Enter your current password"
                          aria-describedby="emailHelp"
                        />
                        <span>
                          <FontAwesomeIcon
                            icon={
                              showPassword.currentpasswordShow
                                ? faEye
                                : faEyeSlash
                            }
                            onClick={() =>
                              setShowPassword({
                                ...showPassword,
                                currentpasswordShow:
                                  !showPassword.currentpasswordShow,
                              })
                            }
                          />
                        </span>
                      </div>
                      <p style={{ color: "red", fontSize: ".8rem" }}>
                        {error.currentpasswordError}
                      </p>
                    </section>
                    {/* new password field */}
                    <section className="mt-4">
                      <h5
                        style={{
                          color: JSON.parse(localStorage.getItem("darkMood"))
                            ? "#fff"
                            : "#000",
                        }}
                      >
                        New Password
                      </h5>
                      <div
                        className={
                          error.newPasswordError
                            ? `${Style.imputFieldsError}`
                            : `${Style.imputFields} mt-4`
                        }
                      >
                        <span>
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                          style={{
                            color: JSON.parse(localStorage.getItem("darkMood"))
                              ? "#fff"
                              : "#000",
                          }}
                          type={
                            showPassword.newPasswordShow ? "text" : "password"
                          }
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                          className="form-control LoginForminput "
                          id="exampleInputEmail1"
                          placeholder="Enter your new password"
                          aria-describedby="emailHelp"
                        />
                        <span>
                          <FontAwesomeIcon
                            icon={
                              showPassword.newPasswordShow ? faEye : faEyeSlash
                            }
                            onClick={() =>
                              setShowPassword({
                                ...showPassword,
                                newPasswordShow: !showPassword.newPasswordShow,
                              })
                            }
                          />
                        </span>
                      </div>
                      <p style={{ color: "red", fontSize: ".8rem" }}>
                        {error.newPasswordError}
                      </p>
                    </section>
                    {/* confirme password field */}
                    <section className="mt-4">
                      <h5
                        style={{
                          color: JSON.parse(localStorage.getItem("darkMood"))
                            ? "#fff"
                            : "#000",
                        }}
                      >
                        Confirm New Password
                      </h5>
                      <div
                        className={
                          error.confirmNewpasswordError
                            ? `${Style.imputFieldsError}`
                            : `${Style.imputFields} mt-4`
                        }
                      >
                        <span>
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                          style={{
                            color: JSON.parse(localStorage.getItem("darkMood"))
                              ? "#fff"
                              : "#000",
                          }}
                          type={
                            showPassword.confirmNewpasswordShow
                              ? "text"
                              : "password"
                          }
                          value={confirmNewpassword}
                          onChange={(e) => {
                            setConfirmNewPassword(e.target.value);
                          }}
                          className="form-control LoginForminput "
                          id="exampleInputEmail1"
                          placeholder="Confirm your new password"
                          aria-describedby="emailHelp"
                        />
                        <span>
                          <FontAwesomeIcon
                            icon={
                              showPassword.confirmNewpasswordShow
                                ? faEye
                                : faEyeSlash
                            }
                            onClick={() =>
                              setShowPassword({
                                ...showPassword,
                                confirmNewpasswordShow:
                                  !showPassword.confirmNewpasswordShow,
                              })
                            }
                          />
                        </span>
                      </div>
                      <p style={{ color: "red", fontSize: ".8rem" }}>
                        {error.confirmNewpasswordError}
                      </p>
                    </section>
                    <p
                      className="mt-4"
                      style={{ color: "red", fontSize: ".8rem" }}
                    >
                      {console.log("error", error.custome)}
                      {error.custome}
                    </p>

                    <Row className={Style.buttonbackground}>
                      <Col className={Style.buttonbackground}>
                        <Button
                          className="mt-4 w-50"
                          onClick={() => updatePasswordFun(afterDispatchFun)}
                        >
                          Update
                        </Button>
                      </Col>
                    </Row>
                  </CustomeDropDown>
                </Col>
              </Row>
            </section>
          </Container>
        </Col>
      </Row>
    </>
  );
}
