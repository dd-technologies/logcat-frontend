import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import CustomCard from "../../container/CustomCard";
import Style from "../../css/Register.module.css";
import { adminRegister, allHospitalData, allCountryStateData, allStateData } from "../../store/action/AdminAction";
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
import FormItem from "antd/es/form/FormItem";
import { Country, State, City } from 'country-state-city';

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    stateName: "",
    countryName: "",
    email: "",
    hospitalName: "",
    passwordHash: "",
    confirmPassword: "",
  });
  const [fnameError, setFNameError] = useState(null);
  const [lnameError, setLNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [hospitalError, setHospitalError] = useState(null);
  const [passwordError, setPasswordError] = useState({
    passwordHash: null,
    confirmPassword: null,
  });
  const [showPassword, setShowPassword] = useState({
    passwordHash: false,
    confirmPassword: false,
  });
  const [isChecked, setIsChecked] = useState(false);

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
  let StatusValid = "-- Select State Name --"
  let CountryValid = "-- Select Country Name --"
  let hospitalValid = "-- Select Hospital Name --"
  // HANDLE SUBMIT AND DISPATCH
  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = validateEmail(registerForm.email);
    const passwordHash = validatePassword(
      registerForm.passwordHash,
      registerForm.confirmPassword
    );
    const firstName = registerForm.firstName
    const lastName = registerForm.lastName
    const hospitalName = registerForm.hospitalName
    const stateName = registerForm.stateName
    const countryName = registerForm.countryName
    console.log("hospitalValid", hospitalValid)
    if (countryName === CountryValid) {
      toast.error("Please select Country")
      return false;
    }
    if (registerForm.hospitalName === hospitalValid) {
      toast.error("Please Select Hospital Name")
      return false;
    }
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
    if (!isChecked) {
      toast.error("Accept terms and conditions")
      return false;
    }

    if (email && passwordHash && firstName && lastName && hospitalName && stateName && countryName && isChecked) {
      dispatch(
        adminRegister(
          registerForm.firstName,
          registerForm.lastName,
          registerForm.stateName,
          registerForm.countryName,
          registerForm.hospitalName,
          registerForm.email,
          registerForm.passwordHash,
          history("/")
        )
      );
    }
  }
  // console.log("adminRegister",adminRegister)
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }
  useEffect(() => {
    setResponseError(error);

    // @@ CLEANING UP ALL ERROR RESPONSE AND CUSTOM ERROR WITH API HIT
    return () => {
      setResponseError(null);
      setEmailError(null);
    };
  }, [error]);
  const allhospitalNameReducer = useSelector(
    (state) => state.allhospitalNameReducer
  );
  const { data: allhospitalData } = allhospitalNameReducer;
  // country state reducer
  const allCountryStateReducer = useSelector(
    (state) => state.allCountryStateReducer
  );
  const { data: allCountryData } = allCountryStateReducer;
  const countryData = allCountryData && allCountryData.data
  const hospitalData = allhospitalData && allhospitalData.data
  // state data 
  const allStateReducer = useSelector(
    (state) => state.allStateReducer
  );
  const [statesData, setStatesData] = useState("")
  const name = registerForm.countryName
  const countryChange = (e) => {
    setStatesData(e.target.value)
    setRegisterForm({
      ...registerForm,
      countryName: e.target.value,
    })
    dispatch(allCountryStateData(name))
  }
  console.log("statesData", statesData)
  const { data: allStatesData } = allStateReducer;
  const stateData = allStatesData && allStatesData.data
  const stateChange = (e) => {
    e.preventDefault()
    setRegisterForm({
      ...registerForm,
      stateName: e.target.value,
    })
    dispatch(allStateData(name))
  }
  const State = registerForm.stateName
  const hospitalName = registerForm.hospitalName
  const hospitalChange = (e) => {
    setRegisterForm({
      ...registerForm,
      hospitalName: e.target.value,
    })
    dispatch(allHospitalData(State))
  }
  let getAllCountryData = Country.getAllCountries()
  console.log("000", Country.getAllCountries())
  console.log("state", State.getAllStates)
  console.log("city",)
  return (
    <>
      <Toaster />
      <section
        className={Style.registerDiv}
      >
        <div
          className={Style.inside_registerDiv}
        >
          <div
            className={Style.left_content}
          >
            <div className={Style.leftContent}>
              <div className={Style.heading}>
                <h2 className={Style.innertext}>AgVa</h2>
              </div>
              <div style={{ width: "70%" }}>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "#257d7c",
                    textAlign: "center",
                    width: "100%"
                  }}
                >
                  <button
                    className={Style.signinbtn}
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
                <div className={Style.formDiv}>
                  <div className={Style.inside_formDiv}>
                    <div className={Style.inputusername}>First Name</div>
                    <div
                      className={
                        fnameError
                          ? `${Style.imputFieldsError} darkModebgColor`
                          : `${Style.imputFields}  darkModebgColor`
                      }
                    >
                      <span className="ms-2">
                        <img src={User} style={{ width: "1.2rem" }} />
                      </span>
                      <span style={{ color: "black" }}>|</span>
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

                  </div>
                  {/* Second Name Section */}
                  <div className={Style.inside_formDiv}>
                    <div className={Style.inputusername}>Last Name</div>
                    <div
                      className={
                        lnameError
                          ? `${Style.imputFieldsError} darkModebgColor`
                          : `${Style.imputFields}  darkModebgColor`
                      }
                    >
                      <span className="ms-2">
                        <img src={User} style={{ width: "1.2rem" }} />
                      </span>
                      <span style={{ color: "black" }}>|</span>
                      <input
                        type="text"
                        className="form-control registerForminput "
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, lastName: e.target.value })
                        }
                        value={registerForm.lastName}
                      />
                    </div>
                  </div>
                </div>
                {/* Country State Section */}
                <div className={Style.formDiv}>
                  <div className={Style.inside_formDiv}>
                    <div className={Style.inputusername}>Country Name</div>
                    <div
                      className={
                        fnameError
                          ? `${Style.imputFieldsError} darkModebgColor`
                          : `${Style.state_imputFields}  darkModebgColor`
                      }
                    >
                      <span className="ms-2">
                        <img src={User} style={{ width: "1.2rem" }} />
                      </span>
                      <span style={{ color: "black" }}>|</span>
                      <input list="countryName" style={{ padding: '0.3rem' }} placeholder='Enter Name' onChange={(e) => countryChange(e)} />
                      <datalist id='countryName' className={Style.textInputDetails} onChange={(e) => countryChange(e)} >
                        {getAllCountryData && getAllCountryData.map((item) => {
                          return (
                            <option>{item.name}</option>
                          )
                        })}

                      </datalist>
                    </div>
                  </div>
                  {/* State Section */}
                  <div className={Style.inside_formDiv}>
                    <div className={Style.inputusername}>State Name</div>
                    <div
                      className={
                        lnameError
                          ? `${Style.imputFieldsError} darkModebgColor`
                          : `${Style.state_imputFields}  darkModebgColor`
                      }
                    >
                      <span className="ms-2">
                        <img src={User} style={{ width: "1.2rem" }} />
                      </span>
                      <span style={{ color: "black" }}>|</span>
                      {!registerForm.countryName ? <>
                        <select id="data" style={{ padding: "4px", border: "0px", width: "100%" }}
                          disabled>

                          <option>-- Select State Name --</option>

                        </select>
                      </> :
                      <>
                      <input list="stateName" style={{ padding: '0.3rem' }} placeholder='Enter State' onChange={(e) => stateChange(e)} />
                        <datalist id='stateName' style={{ padding: "4px", border: "0px", width: "100%" }}
                          onClick={(e) => stateChange(e)
                          }>
                          {stateData && stateData.map((item) => {
                            return (
                              <option
                                style={{ padding: "4px", border: "0px", width: "100%" }}
                              >
                                {item.name}
                              </option>
                            )
                          })}
                        </datalist>
                        </>
                        }
                    </div>
                  </div>
                </div>
                {/* Hospital Section */}
                <div style={{ gap: "2rem", marginTop: "1rem" }}>
                  <div className={Style.inputusername}>Hospital Name</div>
                  <div
                    className={
                      hospitalError
                        ? `${Style.imputFieldsError}  darkModebgColor`
                        : `${Style.imputFields}  darkModebgColor`
                    }
                  >
                    <span className="ms-2">
                      <img src={hospital} style={{ width: "1.2rem" }} />
                    </span>
                    <span style={{ color: "black" }}>|</span>
                    {!registerForm.stateName ? <>
                      <select id="data" style={{ padding: "4px", border: "0px", width: "100%" }}
                        disabled>
                        <option>-- Select Hospital Name --</option>
                      </select>
                    </> :
                    <>
                    <input list="hospitalName" style={{ padding: '0.3rem' }} placeholder='Enter State' onChange={(e) => hospitalChange(e)} />
                      <datalist id='hospitalName' style={{ padding: "4px", border: "0px", width: "100%" }}
                        onClick={(e) => hospitalChange(e)}>
                        {hospitalData && hospitalData.length > 0 ? hospitalData && hospitalData.map((item) => {
                          return (
                            <option
                              style={{ padding: "4px", border: "0px", width: "100%" }}
                            >
                              {item.Hospital_Name}
                            </option>
                          )
                        }) : " No Data Found"}
                      </datalist>
                      </>
                    }
                  </div>
                </div>
                {/* Email Section */}
                <div style={{ gap: "2rem", marginTop: "1rem" }}>
                  <div className={Style.inputusername}>Email Id</div>
                  <div
                    className={
                      emailError
                        ? `${Style.imputFieldsError}  darkModebgColor`
                        : `${Style.imputFields}  darkModebgColor`
                    }
                  >
                    <span className="ms-2">
                      <img src={email} style={{ width: "1.2rem" }} />
                    </span>
                    <span style={{ color: "black" }}>|</span>
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
                {/* Password */}
                <div className={Style.formDiv}>
                  <div className={Style.inside_formDiv}>
                    <div className={Style.inputusername}>Password</div>
                    <div
                      className={
                        passwordError.passwordHash
                          ? `${Style.imputFieldsError}  darkModebgColor`
                          : `${Style.imputFields}  darkModebgColor`
                      }
                    >
                      <span className="ms-2">
                        <img src={lock} style={{ width: "1.2rem" }} />
                      </span>
                      <span style={{ color: "black" }}>|</span>
                      <input
                        type={showPassword.passwordHash ? "text" : "password"}
                        className="form-control registerForminput "
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
                          style={{ width: "1.2rem", opacity: "59%" }}
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
                  </div>
                  {/* confirm Password */}
                  <div className={Style.inside_formDiv}>
                    <div className={Style.inputusername}>Confirm Password</div>
                    <div
                      className={
                        passwordError.confirmPassword
                          ? `${Style.imputFieldsError}  darkModebgColor`
                          : `${Style.imputFields}  darkModebgColor`
                      }
                    >
                      <span className="ms-2">
                        <img src={lock} style={{ width: "1.2rem" }} />
                      </span>
                      <span style={{ color: "black" }}>|</span>
                      <input
                        type={showPassword.confirmPassword ? "text" : "password"}
                        className="form-control registerForminput " style={{ borderRightStyle: "hidden", borderTopStyle: "hidden", borderRadius: "0px", borderBottomStyle: "hidden", borderLeft: "1px solid #959595" }}
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
                          style={{ width: "1.2rem", opacity: "59%" }}
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
                  </div>
                </div>
                <section
                  style={{
                    margin: "2rem",
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                >
                  <FormItem
                    name="agreement"
                    wrapperCol={{ span: 24 }}
                    valuePropName="checked"
                    rules={[{
                      required: true,
                      message: "To proceed need agree"
                    }]}>
                    <div style={{ display: "flex", alignItems: "center", textAlign: "center", gap: "1rem" }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <span>Agree to our <Link to="/tersAndCondition">Terms and Conditions</Link></span>
                    </div>
                  </FormItem>
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
                      className={Style.signupbtn}
                      type="submit"
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
