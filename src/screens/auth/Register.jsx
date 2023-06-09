import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
// import CustomCard from "../../container/CustomCard";
import Style from "../../css/Register.module.css";
import { adminRegister } from "../../store/action/AdminAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateEmailHelper } from "../../helper/Emails";
import SpinnerCustom from "../../container/SpinnerCustom";
import User from "../../assets/images/user.png"
import hospital from "../../assets/images/hospital.png"
import email from "../../assets/images/email.png"
import lock from "../../assets/images/lock.png"
import ShowPassword from "../../assets/images/ShowPassword.png"
import HidePassword from "../../assets/images/HidePassword.png"
import { toast, Toaster } from "react-hot-toast";
// import Swal from 'sweetalert2/src/sweetalert2.js'

const cookies = new Cookies();

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName:"",
    email: "",
    hospitalName:"",
    passwordHash: "",
    confirmPassword: "",
  });
  const [fnameError, setFNameError] = useState(null);
  const [lnameError, setLNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [hospitalError, setHospitalError]=useState(null);
  const [passwordError, setPasswordError] = useState({
    passwordHash: null,
    confirmPassword: null,
  });
  const [showPassword, setShowPassword] = useState({
    passwordHash: false,
    confirmPassword: false,
  });
  const setResponseError = useState(null)[1];

  const dispatch = useDispatch();
  const adminRegisterReducer = useSelector(
    (state) => state.adminRegisterReducer
  );
  const { loading, error, data } = adminRegisterReducer;
  // console.log("adminRegisterReducer", adminRegisterReducer);
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
  const validatePassword = (passwordHash, confirmPassword) => {
    if (!passwordHash) {
      setPasswordError({
        ...passwordError,
        passwordHash: toast.error("*Please enter your Password."),
      });
      return false;
    } else {
      setPasswordError({ ...passwordError, passwordHash: null });
    }
    if (!confirmPassword) {
      setPasswordError({
        ...passwordError,
        confirmPassword: toast.error("Please enter your Confirm Password."),
      });
      return false;
    } else {
      setPasswordError({ ...passwordError, confirmPassword: null });
    }
    if (passwordHash !== confirmPassword) {
      setPasswordError({
        passwordHash: "Password does not match with confirm passwordHash.",
        confirmPassword: "Confirm passwordHash does not match with passwordHash.",
      });
      return false;
    } else {
      setPasswordError({ passwordHash: null, confirmPassword: null });
    }

    setRegisterForm({
      ...registerForm,
      passwordHash: passwordHash,
    });
    setPasswordError({
      passwordHash: null,
      confirmPassword: null,
    });
    return true;
  };

  // HANDLE SUBMIT AND DISPATCH
  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = validateEmail(registerForm.email);
    const passwordHash = validatePassword(
      registerForm.passwordHash,
      registerForm.confirmPassword
    );
    console.log("hospitalError",hospitalError)
    console.log("registerForm",registerForm)
    if (!registerForm.firstName) {
      setFNameError(toast.error("*Please fill Full name field"));
      return false;
    } 
    else {
      setFNameError(null);
    }
    if (!registerForm.lastName) {
      setLNameError(toast.error("Please enter last name"));
      return false;
    } 
    else {
      setLNameError(null);
    }
    if (!registerForm.hospitalName) {
      setHospitalError(toast.error("Please fill Hospital name field"));
      return false;
    } 
    else {
      setHospitalError(null);
    }
    if (email && passwordHash) {
      dispatch(
        adminRegister(
          registerForm.firstName,
          registerForm.lastName,
          registerForm.email,
          registerForm.hospitalName,
          registerForm.passwordHash,
          history("/")
        )
      );
    }
    }
    // console.log("adminRegister",adminRegister)

  useEffect(() => {
    setResponseError(error);

    // @@ CLEANING UP ALL ERROR RESPONSE AND CUSTOM ERROR WITH API HIT
    return () => {
      setResponseError(null);
      setEmailError(null);
    };
  }, [error]);

  return (
    <>
    <Toaster/>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin:"auto",
          padding:"4rem",
          width:"80%"
        }}
      >
        <div style={{
          display:"flex",
          flexDirection:"row",
          overflow: "hidden",
          background: "#FFFFFF 0% 0% no-repeat padding-box",
          boxShadow: "0px 0px 50px #00000029",
          borderRadius: "15px",
          opacity: 1,
          width:"100%"
        }}>
          <div
            className="left-content"
            style={{ width: "40%", margin: "auto 0" }}
          >
            <div className={Style.leftContent}>
              <div className={Style.heading}>
                <h2 className={Style.innertext}>AgVa</h2>
              </div>
              <div style={{width:"70%"}}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#257d7c",
                  textAlign: "center",
                  width:"100%"
                }}
              >
                <button
                  style={{
                    width: "50%",
                    height: "2.8rem",
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    boxShadow: "0px 0px 30px #00000029",
                    border: "0px",
                    borderRadius: "10px",
                    marginBottom: "2rem",
                    color: "#CB297B",
                    fontSize: "19px",
                    fontFamily: "Poppins",
                  }}
                >
                  SIGN IN
                </button>
              </Link>
              </div>
            </div>
          </div>
          <section className={Style.Login}>
            {data && data.data && data.data.message && (
              <p style={{ color: "#1F99A4" }}>{data.data.message}</p>
            )}
            <div className="Form-card">
              <form>
                {/* First Name Section */}
                <div className="d-flex" style={{gap:"2rem", marginTop:"1rem"}}>
                <div className="d-flex" style={{flexDirection:"column"}}>
                <div className={Style.inputusername}>First Name</div>
                <div
                  className={
                    fnameError
                      ? `${Style.imputFieldsError} darkModebgColor`
                      : `${Style.imputFields}  darkModebgColor`
                  }
                  style={{width:"294px"}}
                >
                  <span className="ms-2">
                  <img src={User} style={{width:"1.2rem"}} />
                  </span>
                  <span style={{color:"black"}}>|</span>
                  <input
                    type="text"
                    className="form-control registerForminput "
                    // autoComplete="Enter your full name"
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, firstName: e.target.value })
                    }
                    value={registerForm.firstName}
                  />
                </div>
                {/* {fnameError && <p style={{ color: "red",fontSize:"14px" }}>{fnameError}</p>} */}

                </div>
                {/* Second Name Section */}
                <div className="d-flex" style={{flexDirection:"column"}}>
                <div className={Style.inputusername}>Last Name</div>
                <div
                  className={
                    lnameError
                      ? `${Style.imputFieldsError} darkModebgColor`
                      : `${Style.imputFields}  darkModebgColor`
                  }
                  style={{width:"294px"}}
                >
                  <span className="ms-2">
                  <img src={User} style={{width:"1.2rem"}} />
                  </span>
                  <span style={{color:"black"}}>|</span>
                  <input
                    type="text"
                    className="form-control registerForminput "
                    // autoComplete="Enter your full name"
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, lastName: e.target.value })
                    }
                    value={registerForm.lastName}
                  />
                </div>
                {/* {lnameError && <p style={{ color: "red", fontSize:"14px" }}>{lnameError}</p>} */}
                </div>
                </div>
                {/* Email Section */}
                <div style={{gap:"2rem", marginTop:"1rem"}}>
                <div className={Style.inputusername}>Email Id</div>
                <div
                  className={
                    emailError
                      ? `${Style.imputFieldsError}  darkModebgColor`
                      : `${Style.imputFields}  darkModebgColor`
                  }
                >
                   <span className="ms-2">
                  <img src={email} style={{width:"1.2rem"}} />
                  </span>
                  <span style={{color:"black"}}>|</span>
                  <input
                    type="email"
                    className="form-control registerForminput "
                    autoComplete="Enter your Email"
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        email: e.target.value,
                      })
                    }
                    value={registerForm.email}
                  />
                </div>
                </div>
                {/* {emailError && <p style={{ color: "red",fontSize:"14px" }}>{emailError}</p>} */}
                {/* Hospital Section */}
                <div style={{gap:"2rem", marginTop:"1rem"}}>
                <div className={Style.inputusername}>Hospital Name</div>
                <div
                  className={
                    emailError
                      ? `${Style.imputFieldsError}  darkModebgColor`
                      : `${Style.imputFields}  darkModebgColor`
                  }
                >
                   <span className="ms-2">
                  <img src={hospital} style={{width:"1.2rem"}} />
                  </span>
                  <span style={{color:"black"}}>|</span>
                  <input
                    type="text"
                    className="form-control registerForminput "
                    autoComplete="Enter Hospital Name"
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        hospitalName: e.target.value,
                      })
                    }
                    value={registerForm.hospitalName}
                  />
                </div>
                </div>
                {/* {hospitalError && <p style={{ color: "red",fontSize:"14px" }}>{hospitalError}</p>} */}
                {/* Password */}
                <div  className="d-flex" style={{gap:"2rem", marginTop:"1rem"}}>
                <div className="d-flex" style={{flexDirection:"column"}}>
                <div className={Style.inputusername}>Password</div>
                <div
                  className={
                    passwordError.passwordHash
                      ? `${Style.imputFieldsError}  darkModebgColor`
                      : `${Style.imputFields}  darkModebgColor`
                  }
                  style={{width:"294px"}}
                >
                   <span className="ms-2">
                  <img src={lock} style={{width:"1.2rem"}} />
                  </span>
                  <span style={{color:"black"}}>|</span>
                  <input
                    type={showPassword.passwordHash ? "text" : "passwordHash"}
                    className="form-control registerForminput "
                    // placeholder="Enter your passwordHash"
                    // autoComplete="Enter your passwordHash"
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        passwordHash: e.target.value,
                      })
                    }
                    value={registerForm.passwordHash}
                  />
                  <span className="px-2" style={{ cursor: "pointer" }}>
                    <img
                    style={{width:"1.2rem", opacity:"59%"}}
                      size="lg"
                      src={showPassword.passwordHash ? HidePassword : ShowPassword}
                      onClick={() => {
                        setShowPassword({
                          ...showPassword,
                          passwordHash: !showPassword.passwordHash,
                        });
                      }}
                    />
                  </span>
                </div>
                {passwordError.passwordHash && (
                  <p style={{ color: "red" , fontSize:"14px"}}>{passwordError.passwordHash}</p>
                )}
                </div>
                {/* confirm Password */}
                <div className="d-flex" style={{flexDirection:"column"}}>
                <div className={Style.inputusername}>Confirm Password</div>
                <div
                  className={
                    passwordError.confirmPassword
                      ? `${Style.imputFieldsError}  darkModebgColor`
                      : `${Style.imputFields}  darkModebgColor`
                  }
                  style={{width:"294px"}}
                >
                   <span className="ms-2">
                  <img src={lock} style={{width:"1.2rem"}} />
                  </span>
                  <span style={{color:"black"}}>|</span>
                  <input
                    type={showPassword.confirmPassword ? "text" : "passwordHash"}
                    className="form-control registerForminput " style={{borderRightStyle: "hidden", borderTopStyle: "hidden", borderRadius: "0px", borderBottomStyle:"hidden", borderLeft: "1px solid #959595"}}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    value={registerForm.confirmPassword}
                  />
                  <span className="px-2" style={{ cursor: "pointer" }}>
                    <img
                     style={{width:"1.2rem", opacity:"59%"}}
                      size="lg"
                      src={showPassword.confirmPassword ? HidePassword : ShowPassword}
                      onClick={() => {
                        setShowPassword({
                          ...showPassword,
                          confirmPassword: !showPassword.confirmPassword,
                        });
                      }}
                    />
                  </span>
                </div>
                {passwordError.confirmPassword && (<p style={{ color: "red", fontSize:"14px" }}>{passwordError.confirmPassword}</p>)}
                </div>
                </div>
                <section
                  style={{
                    margin: "2rem",
                    display: "flex",
                    justifyContent: "center",
                    gap:"0.5rem"
                  }}
                >
                  <input type="radio"/>
                    <span style={{color:"#4b4b4b"}}>I agree with Terms & Conditions</span>
                </section>
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
                      background: "transparent linear-gradient(181deg, #CB297B 0%, #3C3C3C 200%) 0% 0% no-repeat padding-box",
                      boxShadow: "0px 0px 30px #00000029",
                      borderRadius: "10px",
                      opacity: 1,
                      border: "0px solid",
                      color: "white",
                      fontSize:"19px",
                      fontFamily:"Poppins"
                    }}
                      type="submit"
                      className=""
                      onClick={(e) => handleSubmit(e)}
                    >
                      SIGN UP
                    </button>
                  )}
                </section>
              </form>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Register;
