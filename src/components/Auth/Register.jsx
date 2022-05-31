import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomCard from "../../Container/CustomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Style from "./Register.module.css";
import { adminRegister } from "../../redux/action/AdminAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { validateEmailHelper } from "../../helper/Emails";

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    name: null,
    email: null,
    password: null,
    cpassword: null,
  });
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState({
    password: null,
    cpassword: null,
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    cpassword: false,
  });
  const [responseError, setResponseError] = useState(null);

  const dispatch = useDispatch();
  const adminRegisterReducer = useSelector(
    (state) => state.adminRegisterReducer
  );
  const { loading, error, data } = adminRegisterReducer;

  console.log("adminRegisterReducer", adminRegisterReducer);

  // VALIDATE EMAIL
  const validateEmail = (email) => {
    const isEmailValid = validateEmailHelper(email);
    if (isEmailValid.isSuccess) {
      setRegisterForm({
        ...registerForm,
        email,
      });
      setEmailError(null);
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
  const validatePassword = (password, cpassword) => {
    if (!password) {
      setPasswordError({
        ...passwordError,
        password: "Please enter your password.",
      });
      return false;
    } else {
      setPasswordError({ ...passwordError, password: null });
    }
    if (!cpassword) {
      setPasswordError({
        ...passwordError,
        cpassword: "Please enter your Confirm password.",
      });
      return false;
    } else {
      // console.log('cpassword available')
      setPasswordError({ ...passwordError, cpassword: null });
    }
    if (password !== cpassword) {
      setPasswordError({
        password: "Password does not match with confirm password.",
        cpassword: "Confirm password does not match with password.",
      });
      return false;
    } else {
      setPasswordError({ password: null, cpassword: null });
    }

    setRegisterForm({
      ...registerForm,
      password: password,
    });
    setPasswordError({
      password: null,
      cpassword: null,
    });
    return true;
  };

  // HANDLE SUBMIT AND DISPATCH
  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("registerForm", registerForm);
    const email = validateEmail(registerForm.email);
    const password = validatePassword(
      registerForm.password,
      registerForm.cpassword
    );
    if (!registerForm.name) {
      setNameError("Please check user name field");
      return false;
    } else {
      setNameError(null);
      setNameError(null);
    }

    if (email && password) {
      dispatch(
        adminRegister(
          registerForm.name,
          registerForm.email,
          registerForm.password,
          history
        )
      );
    }
  };

  // console.log("registerForm", registerForm);

  useEffect(() => {
    if (localStorage.getItem("ddAdminToken")) {
      history("/");
    }
  }, [history, data]);

  useEffect(() => {
    setResponseError(error);

    // @@ CLEANING UP ALL ERROR RESPONSE AND CUSTOM ERROR WITH API HIT
    return () => {
      setResponseError(null);
      setEmailError(null);
    };
  }, [error]);

  // console.log("error", error);

  return (
    <>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CustomCard height="max-content" width="500px">
          <section className={Style.Login}>
            <div className="Login-title d-flex justify-content-start">
              <p className={Style.headerText}>Register</p>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {data && data.data && data.data.message && (
              <p style={{ color: "#1F99A4" }}>{data.data.message}</p>
            )}

            <div className="Form-card">
              <form>
                <div
                  className={
                    nameError
                      ? `${Style.imputFieldsError} darkModebgColor`
                      : `${Style.imputFields} mt-4 darkModebgColor`
                  }
                >
                  <span className="ms-2">
                    <FontAwesomeIcon size="lg" icon={faUser} />
                  </span>
                  <input
                    type="text"
                    className="form-control registerForminput "
                    id="exampleInputEmail1"
                    placeholder="Enter your full name"
                    aria-describedby="emailHelp"
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, name: e.target.value })
                    }
                    value={registerForm.name}
                  />
                </div>
                {nameError && <p style={{ color: "red" }}>{nameError}</p>}

                <div
                  className={
                    emailError
                      ? `${Style.imputFieldsError} mt-4 darkModebgColor`
                      : `${Style.imputFields} mt-4 darkModebgColor`
                  }
                >
                  <span className="ms-2">
                    <FontAwesomeIcon size="lg" icon={faEnvelope} />
                  </span>
                  <input
                    type="email"
                    className="form-control registerForminput "
                    id="exampleInputEmail1"
                    placeholder="Enter your email"
                    aria-describedby="emailHelp"
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        email: e.target.value,
                      })
                    }
                    value={registerForm.email}
                  />
                </div>
                {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                <div
                  className={
                    passwordError.password
                      ? `${Style.imputFieldsError} mt-4 darkModebgColor`
                      : `${Style.imputFields} mt-4 darkModebgColor`
                  }
                >
                  <span className="ms-2">
                    <FontAwesomeIcon size="lg" icon={faLock} />
                  </span>
                  <input
                    type={showPassword.password ? "text" : "password"}
                    className="form-control registerForminput "
                    id="exampleInputEmail1"
                    placeholder="Enter your password"
                    aria-describedby="emailHelp"
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                    value={registerForm.password}
                  />
                  <span className="px-2" style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon
                      size="lg"
                      icon={showPassword.password ? faEye : faEyeSlash}
                      onClick={() => {
                        setShowPassword({
                          ...showPassword,
                          password: !showPassword.password,
                        });
                      }}
                    />
                  </span>
                </div>
                {passwordError.password && (
                  <p style={{ color: "red" }}>{passwordError.password}</p>
                )}

                <div
                  className={
                    passwordError.cpassword
                      ? `${Style.imputFieldsError} mt-4 darkModebgColor`
                      : `${Style.imputFields} mt-4 darkModebgColor`
                  }
                >
                  <span className="ms-2">
                    <FontAwesomeIcon size="lg" icon={faLock} />
                  </span>
                  <input
                    type={showPassword.cpassword ? "text" : "password"}
                    className="form-control registerForminput "
                    id="exampleInputEmail1"
                    placeholder="Confirm your password"
                    aria-describedby="emailHelp"
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        cpassword: e.target.value,
                      })
                    }
                    value={registerForm.cpassword}
                  />
                  <span className="px-2" style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon
                      size="lg"
                      icon={showPassword.cpassword ? faEye : faEyeSlash}
                      onClick={() => {
                        setShowPassword({
                          ...showPassword,
                          cpassword: !showPassword.cpassword,
                        });
                      }}
                    />
                  </span>
                </div>

                {passwordError.cpassword && (
                  <p style={{ color: "red" }}>{passwordError.cpassword}</p>
                )}
                <section
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to="/"
                    style={{
                      // textDecoration: "none",
                      color: "#257d7c",
                      // textAlign: "center",
                    }}
                  >
                    Already have an account? Click here
                  </Link>
                </section>
                <section
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    style={{ float: "right", width: "30%" }}
                    type="submit"
                    className="mt-4"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {loading ? "Loading..." : "Register"}
                  </Button>
                </section>
              </form>
            </div>
          </section>
        </CustomCard>
      </section>
    </>
  );
};

export default Register;
