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

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    isRemeberMe: false,
    email: null,
    password: null,
  });
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [ispasswordHide, setIspasswordHide] = useState(true);

  const dispatch = useDispatch();
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { loading, error, adminInfo } = adminLoginReducer;

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
    localStorage.setItem("rememberMe", "Shaktish");
    localStorage.setItem(
      "adminUserName",
      loginForm.isRemeberMe ? loginForm.email : ""
    );
    localStorage.setItem(
      "adminUserCredential",
      loginForm.isRemeberMe ? loginForm.password : ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (loginForm.isRemeberMe) {
    // rememberMe()
    // }
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
    // console.log("dispatch action working");
  };

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
            <div className="Login-title">
              <p className={Style.headerText}>Login</p>
            </div>
            <div className="Form-card">
              <form>
                <div className={`${Style.imputFields} mt-4`}>
                  <span>
                    <FontAwesomeIcon icon={faMailBulk} />
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
                  {emailError && emailError.length ? (
                    <small style={{ color: "red" }}>{emailError}</small>
                  ) : (
                    ""
                  )}
                </div>

                <div className={`${Style.imputFields} mt-4`}>
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
                  {passwordError != null ? (
                    <small style={{ color: "red" }}>{passwordError}</small>
                  ) : (
                    ""
                  )}
                </div>
                <Row className="mt-3">
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      onChange={() =>
                        setLoginForm({
                          ...loginForm,
                          isRemeberMe: !loginForm.isRemeberMe,
                        })
                      }
                    />
                  </Col>
                  <Col /* style={{paddingRight:'0px'}} */>
                    <Link
                      to="/forgetPassword"
                      style={{ textDecoration: "none", color: "#257d7c" }}
                    >
                      Forget Password?
                    </Link>
                  </Col>
                </Row>

                <Button
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
