import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomCard from "../../Container/CustomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import Style from "./Login.module.css";
import { loginWithEmail } from "../../redux/action/AdminAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { validateEmailHelper } from "../../helper/Emails";

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: localStorage.getItem("adminUserName")
      ? JSON.parse(localStorage.getItem("adminUserName"))
      : null,
    password: localStorage.getItem("adminUserCredential")
      ? JSON.parse(localStorage.getItem("adminUserCredential"))
      : null,
  });
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [setErrorPassword, setSetErrorPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { loading, error, adminInfo } = adminLoginReducer;
  // console.log("adminLoginReducer", adminLoginReducer);

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
    if (password !== null) {
      var pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
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
    if (localStorage.getItem("ddAdminToken")) {
      navigate("/home");
    }
  }, [navigate, adminInfo]);

  useEffect(() => {
    setSetErrorPassword(error);
  }, [error]);

  return (
    <>
      <CustomCard height="max-content" width="500px">
        <section className={Style.Login}>
          <div className="Login-title d-flex justify-content-start">
            <p className={Style.headerText}>Login</p>
          </div>
          <div className="Form-card">
            <form>
              <div
                className={
                  emailError
                    ? `${Style.imputFieldsError} darkBgColorSec`
                    : `${Style.imputFields} mt-4 darkBgColorSec`
                }
              >
                <span className="ms-2">
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                </span>
                <input
                  type="email"
                  className="form-control LoginForminput "
                  id="exampleInputEmail1"
                  placeholder="Enter your email"
                  aria-describedby="emailHelp"
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  value={loginForm.email}
                />
              </div>
              {emailError != null ? (
                <small style={{ color: "red" }}>{emailError}</small>
              ) : (
                ""
              )}
              <div
                className={
                  passwordError
                    ? `${Style.imputFieldsError} mt-4 darkBgColorSec`
                    : `${Style.imputFields} mt-4 darkBgColorSec`
                }
              >
                <span className="ms-2">
                  <FontAwesomeIcon icon={faLock} size="lg" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control LoginForminput "
                  id="exampleInputEmail1"
                  placeholder="Enter your password"
                  aria-describedby="emailHelp"
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  value={loginForm.password}
                />
                <span className="px-2" style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                </span>
              </div>
              {passwordError != null ? (
                <small style={{ color: "red" }}>{passwordError}</small>
              ) : setErrorPassword ? (
                <small style={{ color: "red" }}>{setErrorPassword}</small>
              ) : (
                ""
              )}
              <section
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "end ",
                }}
              >
                <Link
                  to="/forgetPassword"
                  style={{
                    // textDecoration: "none",
                    color: "#257d7c",
                    fontWeight: 500,
                  }}
                  className="cpactiveText"
                >
                  Forget Password?
                </Link>
              </section>
              <section
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center ",
                }}
              >
                <Link
                  to="/register"
                  style={{
                    // textDecoration: "none",
                    color: "#257d7c",
                    fontWeight: 500,
                  }}
                  className="cpactiveText"
                >
                  Register
                </Link>
              </section>
              <section
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{
                    width: "30%",
                    fontWeight: 700,
                  }}
                  type="submit"
                  className="mt-4"
                  onClick={(e) => handleSubmit(e)}
                >
                  {loading ? "Loading..." : "Login"}
                </Button>
              </section>
            </form>
          </div>
        </section>
      </CustomCard>
    </>
  );
}
