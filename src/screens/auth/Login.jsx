import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import CustomCard from "../../container/CustomCard";
import Style from "../../css/Login.module.css";
import { loginWithEmail } from "../../store/action/AdminAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateEmailHelper } from "../../helper/Emails";
import SpinnerCustom from "../../container/SpinnerCustom";
import User from "../../assets/images//user.png"
import lock from "../../assets/images/lock.png"
import ShowPassword from "../../assets/images/ShowPassword.png"
import HidePassword from "../../assets/images/HidePassword.png"
const cookies = new Cookies();

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: localStorage.getItem("adminUserName")
      ? JSON.parse(localStorage.getItem("adminUserName"))
      : "",
    password: localStorage.getItem("adminUserCredential")
      ? JSON.parse(localStorage.getItem("adminUserCredential"))
      : "",
  });
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [setErrorPassword, setSetErrorPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { loading, error, adminInfo } = adminLoginReducer;
  console.log("adminLoginReducer",adminLoginReducer);
  const navigate = useNavigate();

  // VALIDATE EMAIL
  const validateEmail = (email) => {
    const isEmailValid = validateEmailHelper(email);
    if (isEmailValid.isSuccess) {
      setLoginForm({
        ...loginForm,
        email,
      });

      return isEmailValid.isSuccess;
    }
    if (!isEmailValid.isSuccess && !isEmailValid.isEmail) {
      setEmailError(isEmailValid.message);
      return isEmailValid.isSuccess;
    }
    if (!isEmailValid.isSuccess && isEmailValid.isEmail) {
      setEmailError(isEmailValid.message);
      return isEmailValid.isSuccess;
    }
    setEmailError(null);
    return true;
  };

  // PASSWORD VALIDATE
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Please enter your password.");
      return false;
    }

    setLoginForm({
      ...loginForm,
      password: password,
    });
    setPasswordError(null);
    return true;
  };

  // HANDLE SUBMIT AND DISPATCH
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = validateEmail(loginForm.email);
    const password = validatePassword(loginForm.password);

    if (email && password) {
      dispatch(loginWithEmail(loginForm.email, loginForm.password));
    }
  };

  // console.log("error", error);

  useEffect(() => {
    if (cookies.get('ddAdminToken')) {
      navigate("/home");
    }
  }, [adminInfo,navigate]);

  useEffect(() => {
    setSetErrorPassword(error);
  }, [error]);

  return (
    <>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          margin:"3rem 0rem",
        }}
      >
        <CustomCard height="max-content">
          <section className={Style.Login}>
            <div className={Style.heading}>
              <h2 className={Style.innertext}>AgVa</h2>
            </div>
            <div className="Form-card">
              <form>
                <div className={Style.inputusername}>Username</div>
                <div
                  className={
                    emailError
                      ? `${Style.imputFieldsError} darkBgColorSec`
                      : `${Style.imputFields} mt-4 darkBgColorSec`
                  }
                >
                  <span className="ms-2">
                  <img src={User} style={{width:"1.2rem", opacity:"59%"}} />
                  </span>
                  <span style={{color:"black"}}>|</span>
                  <input
                    type="email"
                    className="form-control LoginForminput "
                    autoComplete="Enter your email"
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    value={loginForm.email}
                  />
                </div>
                {emailError != null ? (
                  <small style={{ color: "red" ,paddingLeft:"1rem"}}>{emailError}</small>
                ) : (
                  ""
                )}
                <div className={Style.inputusername}>Password</div>
                <div
                  className={
                    passwordError
                      ? `${Style.imputFieldsError} mt-4 darkBgColorSec`
                      : `${Style.imputFields} mt-4 darkBgColorSec`
                  }
                >
                  <span className="ms-2">
                    <img src={lock} style={{width:"1.2rem",opacity:"59%"}} />
                  </span>
                  <span style={{color:"black"}}>|</span>
                  
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control LoginForminput "
                    autoComplete="Enter your password"
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    value={loginForm.password}
                  />
                  <span className="px-2" style={{ cursor: "pointer" }}>
                    <img style={{width:"1.2rem", opacity:"59%"}}
                      src={showPassword ? HidePassword : ShowPassword}
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  </span>
                </div>
                {passwordError != null ? (
                  <small style={{ color: "red", paddingLeft:"1rem" }}>{passwordError}</small>
                ) : setErrorPassword ? (
                  <small style={{ color: "red",paddingLeft:"1rem" }}>{setErrorPassword}</small>
                ) : (
                  ""
                )}
                <div className={Style.remembersection} >
                  <div style={{
                      color: "#4b4b4b",
                      fontSize:"12px",
                      display:"flex",
                      gap:"0.5rem"
                    }}>
                    <input type="radio"/>
                    <span style={{color:"black"}}>Remember me</span>
                  </div>
                <section
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Link
                    to="/forgetPassword"
                    style={{
                      textDecoration: "none",
                      color: "#4b4b4b",
                      fontSize:"12px",
                    }}
                    className="cpactiveText"
                  >
                    Forget Password?
                  </Link>
                </section>
                </div>
                <section
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop:"1rem"
                  }}
                >
                  {loading ? (
                    <SpinnerCustom height="5%" />
                  ) : (
                    <button
                      style={{
                        width: "50%",
                        height: "2.8rem",
                        backgroundColor: "#CB297B",
                        background: "transparent linear-gradient(181deg, #CB297B 0%, #3C3C3C 200%) 0% 0% no-repeat padding-box",
                        boxShadow: "0px 0px 30px #00000029",
                        borderRadius: "10px",
                        opacity: 1,
                        border: "0px solid",
                        color: "white",
                        fontSize:"16px",
                        fontFamily:"Poppins"
                      }}
                      type="submit"
                      className="mt-4"
                      onClick={(e) => handleSubmit(e)}
                    >
                      SIGN IN
                    </button>
                  )}
                </section>
                <section
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    textAlign:"center",
                    alignItems:"center",
                    flexDirection:"column"
                  }}
                >
                  <Link
                      to="/register"
                      style={{
                        textDecoration: "none",
                        width:"50%"
                      }}
                      className="cpactiveText"
                    >
                  <button
                    style={{
                      width: "100%",
                      height: "2.8rem",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      boxShadow: "0px 0px 30px #00000029",
                      border: "0px",
                      borderRadius: "10px",
                      marginBottom:"2rem",
                      color:"#CB297B",
                      fontSize:"16px",
                      fontFamily:"Poppins"
                    }}
                    type="submit"
                    className="mt-4"
                  >
                      SIGN UP
                  </button>
                  </Link>
                </section>
              </form>
            </div>
          </section>
        </CustomCard>
      </section>
    </>
  );
}
