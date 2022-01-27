import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomCard from "../../Container/CustomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk, faLock } from "@fortawesome/free-solid-svg-icons";
import Style from "./Login.module.scss";
import "../../css/theme.scss";
import { loginWithEmail } from "../../redux/action/AdminAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    isRemeberMe: localStorage.getItem("userIsRemember")
      ? localStorage.getItem("userIsRemember")
      : false,
    email: localStorage.getItem("adminUserName")
      ? JSON.parse(localStorage.getItem("adminUserName"))
      : null,
    password: localStorage.getItem("adminUserCredential")
      ? JSON.parse(localStorage.getItem("adminUserCredential"))
      : null,
  });
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  // const [ispasswordHide, setIspasswordHide] = useState(true);
  const [setErrorPassword, setSetErrorPassword] = useState(null);

  const dispatch = useDispatch();
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { loading, error, adminInfo } = adminLoginReducer;

  // console.log("error", error);

  // console.log("adminLoginReducer", adminLoginReducer)

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("ddAdminToken")) {
      history.push("/home");
    }
  }, [history, adminInfo]);

  const validateEmail = (email) => {
    if (!email) {
      setEmailError("Please enter your email Id");

      // console.log("email validate function " + emailError);
      return false;
    }

    if (email.length) {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        // console.log("patern test " + pattern.test(email));
        setEmailError("Please enter valid email address.");
        return false;
      }
    }
    setLoginForm({
      ...loginForm,
      email,
    });

    // console.log("LoginFormState", loginForm);

    setEmailError(null);
    return true;
  };

  const validatePassword = (password) => {
    // console.log("password validate");

    if (!password) {
      // isValid = false;
      setPasswordError("Please enter your password.");
      return false;
    }
    // console.log("password validate function " + passwordError);
    if (password !== null) {
      var pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      // if (!pattern.test(password)) {
      //     //   isValid = false;
      //     setPasswordError(
      //         "Please enter valid password.",
      //     )
      //     return false
      // }
      // return true
    }

    setLoginForm({
      ...loginForm,
      password: password,
    });
    setPasswordError(null);
    return true;
  };

  const rememberMe = () => {
    localStorage.setItem(
      "adminUserName",
      loginForm.isRemeberMe ? JSON.stringify(loginForm.email) : ""
    );
    localStorage.setItem(
      "adminUserCredential",
      loginForm.isRemeberMe ? JSON.stringify(loginForm.password) : ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginForm.isRemeberMe) {
      rememberMe();
    }
    const email = validateEmail(loginForm.email);
    const password = validatePassword(loginForm.password);

    if (email && password) {
      dispatch(
        loginWithEmail(
          loginForm.email,
          loginForm.password,
          loginForm.isRemeberMe
        )
      );
    }
  };

  useEffect(() => {
    setSetErrorPassword(error);
  }, [error]);

  // console.log("setErrorPassword", setErrorPassword);

  return (
    <>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CustomCard height="400px" width="500px">
          <section className={Style.Login}>
            <div className="Login-title d-flex justify-content-start">
              <p className={Style.headerText}>Login</p>
            </div>
            <div className="Form-card">
              <form>
                <div
                  className={
                    emailError
                      ? `${Style.imputFieldsError}`
                      : `${Style.imputFields} mt-4`
                  }
                >
                  <span>
                    <FontAwesomeIcon icon={faGoogle} />
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
                      ? `${Style.imputFieldsError} mt-4`
                      : `${Style.imputFields} mt-4`
                  }
                >
                  <span>
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type="password"
                    className="form-control LoginForminput "
                    id="exampleInputEmail1"
                    placeholder="Enter your password"
                    aria-describedby="emailHelp"
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    value={loginForm.password}
                  />
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
                      textDecoration: "none",
                      color: "#257d7c",
                    }}
                  >
                    Forget Password?
                  </Link>
                </section>

                <Button
                  style={{ float: "right" }}
                  type="submit"
                  className="mt-4 w-50"
                  onClick={(e) => handleSubmit(e)}
                >
                  {loading ? "Loading..." : "Login"}
                </Button>
              </form>
            </div>
          </section>
        </CustomCard>
      </Container>
    </>
  );
}
