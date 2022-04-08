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
import toast, {Toaster } from "react-hot-toast";
import { updateProfile } from "../../redux/action/AdminAction";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
// or scss:
import "react-image-crop/src/ReactCrop.scss";
import UpdatePassord from "./component/UpdatePassord";

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


  const { loading:lnd,data: updatepasswordresponseData,error:err } = passwordChangeReducer;

  const dispatch = useDispatch();

  const [currentpassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewpassword, setConfirmNewPassword] = useState("");
  const [toastMessage, setToastMessage] = useState(null)
  const [error, setError] = useState(null);

  if(updatepasswordresponseData && updatepasswordresponseData.success === false) {
    updatepasswordresponseData.success = ''
    toast.error(updatepasswordresponseData && updatepasswordresponseData.message)
  };
  if(updatepasswordresponseData && updatepasswordresponseData.status === 1) {
    updatepasswordresponseData.status = ''
    toast.success(updatepasswordresponseData && updatepasswordresponseData.message);
  };
  // const [error, setError] = useState({
  //   currentpasswordError: null,
  //   newPasswordError: null,
  //   confirmNewpasswordError: null,
  //   custome: null,
  // });

  const [crop, setCrop] = useState();

  // save update profile data

  const handleSubmit = (e) => {
    // e.preventDefault();
    dispatch(updateProfile(email, name, avatar));
    // setToastMessage(null)
    // setCurrentPassword(null)
    // setNewPassword(null)
    // setConfirmNewPassword(null)
  };

  // Upload Avatar
  const handleUpload = (e) => {
    const file = e.target.files;
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

  // updated password function
  const updatePasswordFun = (e) => {
    e.preventDefault();
  if (!currentpassword || !newPassword || !confirmNewpassword){
    toast.error("Provide all field value to update password!");
    return
  }
    // 1) if current and new password are same
    if (currentpassword === newPassword && currentpassword === confirmNewpassword) {
      // toast.error("Check new password it should not be same to previous");
      toast.error('Check new password it should not be same to previous')
      return;
    }
    // 2) new password match with current password
    if (newPassword !== confirmNewpassword) {
      toast.error('New password and Confirm pass should be same')
      return;
    }
    dispatch(passwordChangeAction(currentpassword, newPassword))
    // setCurrentPassword(null)
    // setNewPassword(null)
    // setConfirmNewPassword(null)

  };

  useEffect(() => {

  }, []);

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
                      className="mb-4 CPp"
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
                      <h5 className="CPp">Name</h5>
                      <div className={`${Style.imputFields} mt-4`}>
                        <span>
                          <FontAwesomeIcon icon={faPersonBooth} />
                        </span>
                        <input
                          type="email"
                          value={
                            // adminInfo && adminInfo.data && adminInfo.data.name
                            name
                          }
                          className="form-control LoginForminput CPp "
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
                      <h5 className="CPp">Email</h5>
                      <div className={`${Style.imputFields} mt-4`}>
                        <span>
                          <FontAwesomeIcon icon={faMailBulk} />
                        </span>
                        <input
                          type="email"
                          value={email}
                          className="form-control LoginForminput CPp "
                          id="exampleInputEmail1"
                          placeholder="Enter your email"
                          aria-describedby="emailHelp"
                          disabled
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

                {/*********************************** password change section ********************************/}
                <UpdatePassord
                  error = {error}
                  currentpassword = {currentpassword}
                  setCurrentPassword ={setCurrentPassword}
                  showPassword = {showPassword}
                  setShowPassword = {setShowPassword}
                  newPassword = {newPassword}
                  setNewPassword = {setNewPassword}
                  confirmNewpassword={confirmNewpassword}
                  setConfirmNewPassword={setConfirmNewPassword}
                  updatePasswordFun={updatePasswordFun}
                />
                {/* <Col xl={6} md={12} sm={12}>
                  <CustomeDropDown
                    padding="30px"
                    marginRight="10px"
                    top="0%"
                    zIndex="8"
                    height="600px"
                  >
                    <h3 className="mb-4 CPp">Change password</h3>
                    {/* password field */}
                    <section className="mt-4">
                      <h5 className="CPp">Current Password</h5>

                      <div
                        className={
                          error
                            ? `${Style.imputFieldsError}`
                            : `${Style.imputFields} mt-4`
                        }
                      >
                        <span>
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                          type={
                            showPassword.currentpasswordShow
                              ? "text"
                              : "password"
                          }
                          value={currentpassword}
                          onChange={(e) => {
                            setCurrentPassword(e.target.value);
                          }}
                          className="form-control LoginForminput  CPp"
                          id="exampleInputEmail1"
                          placeholder="Enter your current password"
                          aria-describedby="emailHelp"
                        />
                        <span style={{ cursor: "pointer" }}>
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
                        {error}
                      </p>
                    </section>
                    {/* new password field ***
                    <section className="mt-4">
                      <h5 className="CPp">New Password</h5>
                      <div
                        className={
                          error
                            ? `${Style.imputFieldsError}`
                            : `${Style.imputFields} mt-4`
                        }
                      >
                        <span>
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                          type={
                            showPassword.newPasswordShow ? "text" : "password"
                          }
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                          className="form-control LoginForminput  CPp"
                          id="exampleInputEmail1"
                          placeholder="Enter your new password"
                          aria-describedby="emailHelp"
                        />
                        <span style={{ cursor: "pointer" }}>
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
                        {error}
                      </p>
                    </section>
                    {/* confirme password field ***
                    <section className="mt-4">
                      <h5 className="CPp">Confirm New Password</h5>
                      <div
                        className={
                          error
                            ? `${Style.imputFieldsError}`
                            : `${Style.imputFields} mt-4`
                        }
                      >
                        <span>
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                          type={
                            showPassword.confirmNewpasswordShow
                              ? "text"
                              : "password"
                          }
                          value={confirmNewpassword}
                          onChange={(e) => {
                            setConfirmNewPassword(e.target.value);
                          }}
                          className="form-control LoginForminput CPp"
                          id="exampleInputEmail1"
                          placeholder="Confirm your new password"
                          aria-describedby="emailHelp"
                        />
                        <span style={{ cursor: "pointer" }}>
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
                        {error}
                      </p>
                    </section>
                    <p
                      className="mt-4"
                      style={{ color: "red", fontSize: ".8rem" }}
                    >
                      {console.log("error", error)}
                      {error}
                    </p>

                    <Row className={Style.buttonbackground}>
                      <Col className={Style.buttonbackground}>
                        <Button
                          className="mt-4 w-50"
                          onClick={(e) => updatePasswordFun(e)}
                        >
                          Update
                        </Button>
                      </Col>
                    </Row>
                  </CustomeDropDown>
                </Col> */}
              </Row>
            </section>
          </Container>
        </Col>
      </Row>
    </>
  );
}
