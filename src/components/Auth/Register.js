import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomCard from "../../Container/CustomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Style from "./Register.module.scss";
import { adminRegister } from "../../redux/action/AdminAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { validateEmailHelper } from "../../helper/Emails";

const  Register = () =>{
const [registerForm, setRegisterForm] = useState({
name:null,
email: null,
password: null,
cpassword:null,
});
const [nameError, setNameError] = useState(null);
const [emailError, setEmailError] = useState(null);
const [passwordError, setPasswordError] = useState(null);
const [showPassword, setShowPassword] = useState({
    password:false,
    cpassword:false
});
const [setErrorPassword, setSetErrorPassword] = useState(null);

const dispatch = useDispatch();
const adminRegisterReducer = useSelector((state) => state.adminRegisterReducer);
const { loading, error, adminRegInfo } = adminRegisterReducer;

// VALIDATE EMAIL
const validateEmail = (email) => {
const isEmailValid = validateEmailHelper(email);
if(isEmailValid.isSuccess){
    setRegisterForm({
    ...registerForm,
    email,
    });
    
    return isEmailValid.isSuccess
}
if(!isEmailValid.isSuccess && !isEmailValid.isEmail){
    setEmailError(isEmailValid.message);
    return isEmailValid.isSuccess
}
if (!isEmailValid.isSuccess && isEmailValid.isEmail) {
    setEmailError(isEmailValid.message);
    return isEmailValid.isSuccess
}
setEmailError(null);
return true;
};

// PASSWORD VALIDATE
const validatePassword = (password,cpassword) => {
if (!password) {
    setPasswordError("Please enter your password.");
    return false;
}
if (!cpassword) {
    setPasswordError("Please enter your Confirm password.");
    return false;
}
if (password !== null ) {
    var pattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
}
setRegisterForm({
    ...registerForm,
    password: password,
});
setPasswordError(null);
return true;
};

// HANDLE SUBMIT AND DISPATCH
const history = useHistory();
const handleSubmit = async (e) => {
e.preventDefault();
const email = validateEmail(registerForm.email);
const password = validatePassword(registerForm.password,registerForm.cpassword);
if (!registerForm.name) {
    setNameError("Please check user name field")
    return false;
}
nameError ?? setNameError(null)

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

useEffect(() => {
if (localStorage.getItem("ddAdminToken")) {
    history.push("/");
}
}, [history, adminRegInfo]);

useEffect(() => {
setSetErrorPassword(error);
}, [error]);

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
    <CustomCard height="520px" width="500px">
        <section className={Style.Login}>
        <div className="Login-title d-flex justify-content-start">
            <p className={Style.headerText}>Register</p>
        </div>
        <div className="Form-card">
            <form>
            <div
                className={
                    nameError
                    ? `${Style.imputFieldsError} darkModebgColor`
                    : `${Style.imputFields} mt-4 darkModebgColor` 
                }
            >
                <span>
                <FontAwesomeIcon icon={faUser} />
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

            <div
                className={
                emailError
                    ? `${Style.imputFieldsError} mt-4 darkModebgColor`
                    : `${Style.imputFields} mt-4 darkModebgColor`
                }
            >
                <span>
                <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                type="email"
                className="form-control registerForminput "
                id="exampleInputEmail1"
                placeholder="Enter your email"
                aria-describedby="emailHelp"
                onChange={(e) =>
                    setRegisterForm({ ...registerForm, email: e.target.value })
                }
                value={registerForm.email}
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
                    ? `${Style.imputFieldsError} mt-4 darkModebgColor`
                    : `${Style.imputFields} mt-4 darkModebgColor`
                }
            >
                <span>
                <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                type={showPassword.password ?"text":"password"}
                className="form-control registerForminput "
                id="exampleInputEmail1"
                placeholder="Enter your password"
                aria-describedby="emailHelp"
                onChange={(e) =>
                    setRegisterForm({ ...registerForm, password: e.target.value })
                }
                value={registerForm.password}
                />
                 <span className="px-2" style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon
                      icon={showPassword.password ? faEye : faEyeSlash}
                      onClick={() => {
                        setShowPassword({...showPassword, password: !showPassword.password});
                      }}
                    />
                  </span>
            </div>
            <div
                className={
                passwordError
                    ? `${Style.imputFieldsError} mt-4 darkModebgColor`
                    : `${Style.imputFields} mt-4 darkModebgColor`
                }
            >
                <span>
                <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                type={showPassword.cpassword ?"text":"password"}
                className="form-control registerForminput "
                id="exampleInputEmail1"
                placeholder="Confirm your password"
                aria-describedby="emailHelp"
                onChange={(e) =>
                    setRegisterForm({ ...registerForm, cpassword: e.target.value })
                }
                value={registerForm.cpassword}
                />
                 <span className="px-2" style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon
                      icon={showPassword.cpassword ? faEye : faEyeSlash}
                      onClick={() => {
                        setShowPassword({...showPassword, cpassword: !showPassword.cpassword});
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
                to="/"
                style={{
                    textDecoration: "none",
                    color: "#257d7c",
                    fontWeight: 500,
                }}
                >
                Click here to Login...
                </Link>
            </section>
            <Button
                style={{ float: "right", width: "30%", fontWeight: 700 }}
                type="submit"
                className="mt-4"
                onClick={(e) => handleSubmit(e)}
            >
                {loading ? "Registering..." : "Register"}
            </Button>
            </form>
        </div>
        </section>
    </CustomCard>
    </Container>
</>
);
}

export default Register
