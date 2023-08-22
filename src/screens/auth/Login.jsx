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
import User from "../../assets/images//user.png";
import lock from "../../assets/images/lock.png";
import ShowPassword from "../../assets/images/ShowPassword.png";
import HidePassword from "../../assets/images/HidePassword.png";
import { toast, Toaster } from "react-hot-toast";
const cookies = new Cookies();

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: localStorage.getItem("rememberemail"),
    passwordHash: localStorage.getItem("rememberpassword"),
  });
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isRemeberMe, setisRemeberMe] = useState();
  console.log("email",loginForm.email)
  const handleRememberPasswordChange = (e) => {
    setisRemeberMe(e.target.checked);
    console.log("rememberme1", isRemeberMe)
  };
  // console.log("email password",loginForm.email.toLowerCase(),loginForm.passwordHash)
  const dispatch = useDispatch();
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { loading, error, adminInfo} = adminLoginReducer;
  console.log("adminLoginReducer", adminLoginReducer);
  const navigate = useNavigate();
  console.log("error",error)
  console.log("adminInfo",adminInfo)
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
      setEmailError();
      return isEmailValid.isSuccess;
    }
    if (!isEmailValid.isSuccess && isEmailValid.isEmail) {
      setEmailError();
      return isEmailValid.isSuccess;
    }
    setEmailError(null);
    return true;
  };

  // PASSWORD VALIDATE
  const validatePassword = (passwordHash, email) => {
    if (!passwordHash && !email) {
      // setPasswordError(toast.error("Please Fill all details"));
      return false;
    }
    setLoginForm({
      ...loginForm,
      passwordHash: passwordHash,
    });
    setPasswordError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = validateEmail(loginForm.email);
    const passwordHash = validatePassword(loginForm.passwordHash);
    if (!email&& !passwordHash) {
      toast.error("Enter Details");
    }
    else if (!email && passwordHash) {
      toast.error(adminLoginReducer.error);
    }
    else if (email && !passwordHash) {
      toast.error(adminLoginReducer.error);
    }
    else if (email && passwordHash) {
      toast.error(adminLoginReducer.error)
      setTimeout(() => {
        dispatch(loginWithEmail(loginForm.email.toLowerCase(), loginForm.passwordHash, isRemeberMe))
      }, 500);
    }
    if (isRemeberMe) {
      localStorage.setItem('rememberemail', loginForm.email.toLowerCase());
      localStorage.setItem('rememberpassword', loginForm.passwordHash);
      localStorage.setItem('rememberMe', isRemeberMe);
    }
     else {
      localStorage.setItem('rememberemail',"");
      localStorage.setItem('rememberpassword',"");
      localStorage.setItem('rememberMe',false);
    }
  }
  useEffect(() => {
    if (cookies.get("ddAdminToken")) {
      toast.success(adminLoginReducer.error);
      if (adminInfo.data.userType === "Admin") {
        navigate("/adminDashboard");
      } else {
        navigate("/home");
      }
    }
  }, (4000)[(navigate, adminInfo)]);
  useEffect(() => {
    const rememberEmail = localStorage.getItem("rememberEmail");
    const rememberPassword = localStorage.getItem("rememberPassword");
    if (isRemeberMe) {
      setLoginForm(rememberEmail);
      setLoginForm(rememberPassword);
      setisRemeberMe(true);
    }
  }, []);
  // useEffect(() => {
  //   if (isRemeberMe) {
  //     setisRemeberMe(true);
  //   }
  //   else{
  //     setisRemeberMe(false);
  //   }
  // });
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
        <CustomCard height="max-content">
          <section className={Style.Login}>
            <div className={Style.heading}>
              <h2 className={Style.innertext}>AgVa</h2>
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
                    autoComplete="Enter your email"
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    value={loginForm.email}
                  />
                </div>
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
                    autoComplete="Enter your passwordHash"
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        passwordHash: e.target.value,
                      })
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
                    marginTop: "1rem",
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
                <section
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Link
                    to="/register"
                    style={{
                      textDecoration: "none",
                      width: "50%",
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
                        marginBottom: "2rem",
                        color: "#CB297B",
                        fontSize: "16px",
                        fontFamily: "Poppins",
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
