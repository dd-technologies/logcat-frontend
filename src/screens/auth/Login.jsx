import React, { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import CustomCard from "../../container/CustomCard";
import Style from "../../css/Login.module.css";
import { loginWithEmail } from "../../store/action/AdminAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateEmailHelper } from "../../helper/Emails";
import User from "../../assets/images//user.png";
import lock from "../../assets/images/lock.png";
import ShowPassword from "../../assets/images/ShowPassword.png";
import HidePassword from "../../assets/images/HidePassword.png";
import SpinnerCustom from "../../container/SpinnerCustom";
import { toast, Toaster } from "react-hot-toast";
const cookies = new Cookies();

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: localStorage.getItem("rememberemail"),
    passwordHash: localStorage.getItem("rememberpassword"),
  });
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [setErrorPassword, setSetErrorPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [isRemeberMe, setisRemeberMe] = useState();
  const handleRememberPasswordChange = (e) => {
    setisRemeberMe(e.target.checked);
  };

  const dispatch = useDispatch();
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { loading, error, adminInfo } = adminLoginReducer;
  console.log(adminLoginReducer)
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
  const validatePassword = (passwordHash) => {
    if (!passwordHash) {
      setPasswordError("Please enter your passwordHash.");
      return false;
    }

    setLoginForm({
      ...loginForm,
      passwordHash: passwordHash,
    });
    setPasswordError(null);
    return true;
  };

  // HANDLE SUBMIT AND DISPATCH
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = validateEmail(loginForm.email);
    const passwordHash = validatePassword(loginForm.passwordHash);

    if (email && passwordHash) {
      dispatch(loginWithEmail(loginForm.email, loginForm.passwordHash));
    }
    if (isRemeberMe) {
      localStorage.setItem('rememberemail', loginForm.email.toLowerCase());
      localStorage.setItem('rememberpassword', loginForm.passwordHash);
      localStorage.setItem('rememberMe', isRemeberMe);
    }
    else {
      localStorage.setItem('rememberemail', "");
      localStorage.setItem('rememberpassword', "");
      localStorage.setItem('rememberMe', false);
    }
  };

  useEffect(() => {
    if (cookies.get('ddAdminToken')) {
      if (adminInfo.data.userType === "Admin") {
        navigate("/adminDashboard");
      } else if (adminInfo.data.userType === "Production") {
        navigate('/productionModel')
      }  else if (adminInfo.data.userType === "Service-Engineer") {
        navigate('/service_eng')
      }
      else if (adminInfo.data.userType === "Support") {
        navigate('/support')
      }
      else {
        navigate('/home')
      }
    }
  }, [navigate, adminInfo]);

  useEffect(() => {
    setSetErrorPassword(error);
  }, [error]);
  useEffect(() => {
    const rememberEmail = localStorage.getItem("rememberEmail");
    const rememberPassword = localStorage.getItem("rememberPassword");
    if (isRemeberMe) {
      setLoginForm(rememberEmail);
      setLoginForm(rememberPassword);
      setisRemeberMe(true);
    }
  }, []);
  const userRole = localStorage.getItem('userrole')
  return (
    <>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          margin: "3rem 0rem",
        }}
      >
        <Toaster />
        <CustomCard height="max-content" >
          <section className={Style.Login}>
            <div className={Style.heading}>
              <p className={Style.innertext}>AgVa</p>
            </div>
            <div className="Form-card">
              <form>
                <div className={Style.inputusername}>Email</div>
                <div
                  className={
                    emailError
                      ? `${Style.imputFieldsError} darkBgColorSec`
                      : `${Style.imputFields} mt-4 darkBgColorSec`
                  }
                >
                  <span className="ms-2">
                    <img
                      src={User}
                      style={{ width: "1.2rem", opacity: "59%" }}
                    />
                  </span>
                  <span style={{ color: "black" }}>|</span>
                  <input
                    type="email"
                    className="form-control LoginForminput "
                    placeholder="Enter Your email"
                    autoComplete="Enter your email"
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    value={loginForm.email}
                  />
                </div>
                {emailError != null ? (
                  <div className="error" style={{ textAlign: 'center', padding: '7px' }}>
                    <small style={{ color: "red" }}>{emailError}</small>
                  </div>
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
                    <img
                      src={lock}
                      style={{ width: "1.2rem", opacity: "59%" }}
                    />
                  </span>
                  <span style={{ color: "black" }}>|</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control LoginForminput "
                    placeholder="Enter your password"
                    autoComplete="Enter your password"
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, passwordHash: e.target.value })
                    }
                    value={loginForm.passwordHash}
                  />
                  <span className="px-2" style={{ cursor: "pointer" }}>
                    <img
                      style={{ width: "1.2rem", opacity: "59%" }}
                      src={showPassword ? HidePassword : ShowPassword}
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  </span>
                </div>
                {passwordError != null ? (
                  <div className="error" style={{ textAlign: 'center', padding: '7px' }}>
                    <small style={{ color: "red" }}>{passwordError}</small>
                  </div>
                ) : setErrorPassword ? (
                  <div className="error" style={{ textAlign: 'center', padding: '7px' }}>
                    <small style={{ color: "red" }}>{setErrorPassword}</small>
                  </div>
                ) : (
                  ""
                )}
                <div className={Style.remembersection}>
                  <div
                    style={{
                      color: "#4b4b4b",
                      fontSize: "12px",
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isRemeberMe}
                      onChange={(e) => handleRememberPasswordChange(e)}
                    />
                    <span style={{ color: "black" }}>Remember me</span>
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
                        fontSize: "12px",
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
                        background:
                          "transparent linear-gradient(181deg, #CB297B 0%, #3C3C3C 200%) 0% 0% no-repeat padding-box",
                        boxShadow: "0px 0px 30px #00000029",
                        borderRadius: "10px",
                        opacity: 1,
                        border: "0px solid",
                        color: "white",
                        fontSize: "16px",
                        fontFamily: "Poppins",
                      }}
                      type="submit"
                      className="mt-4"
                      onClick={(e) => handleSubmit(e)}
                    >
                      SIGN IN
                    </button>
                  )}
                </section>
              </form>
            </div>
          </section>
        </CustomCard>
      </section>
    </>
  );
}
