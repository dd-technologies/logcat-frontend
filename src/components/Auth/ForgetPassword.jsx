import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CustomCard from "../../Container/CustomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  forgetPassword,
  resetForgetPasswordState,
} from "../../redux/action/AdminAction";
import Style from "./Forgetpassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { validateEmailHelper } from "../../helper/Emails";

export default function ForgetPassword() {
  const [forgetEmail, setForgetEmail] = useState(null);
  const [forgetEmailErr, setForgetEmailErr] = useState(null);

  const dispatch = useDispatch();
  const handleForgetPassword = () => {
    const isEmailValid = validateEmailHelper(forgetEmail);
    // console.log(`forget email ${forgetEmail}`)
    if (isEmailValid.isSuccess) {
      setForgetEmail(forgetEmail);
      dispatch(forgetPassword(forgetEmail));
      return isEmailValid.isSuccess;
    }
    if (!isEmailValid.isSuccess && !isEmailValid.isEmail) {
      setForgetEmailErr(isEmailValid.message);
      return isEmailValid.isSuccess;
    }
    if (!isEmailValid.isSuccess && isEmailValid.isEmail) {
      setForgetEmailErr(isEmailValid.message);
      return isEmailValid.isSuccess;
    }
    setForgetEmailErr(null);
  };

  const forgetPasswordReducer = useSelector(
    (state) => state.forgetPasswordReducer
  );

  console.log("forgetPasswordReducer", forgetPasswordReducer);

  const { loading, error, forgetPasswordInfo } = forgetPasswordReducer;
  const navigate = useNavigate();

  if (error) {
    toast.error(error);
  }

  if (forgetPasswordInfo && forgetPasswordInfo.success) {
    toast.success(forgetPasswordInfo.message);
    localStorage.setItem("forgetEmail", JSON.stringify(forgetEmail));
    // clear forget password reducer
    dispatch(resetForgetPasswordState());
    navigate("/resetpassword");
  }

  return (
    <>
      <Toaster />
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CustomCard height="max-content" width="500px">
          <section className={Style.forget}>
            <div className="Login-title">
              <p className={Style.headerText}>Forgot Password</p>
            </div>
            <div className="Form-card">
              <form>
                <div className={`${Style.imputFields} mt-4 darkBgColorSec`}>
                  <span className="ms-2">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                  </span>
                  <input
                    type="email"
                    value={forgetEmail}
                    onChange={(e) => setForgetEmail(e.target.value)}
                    className="form-control LoginForminput "
                    id="exampleInputEmail1"
                    placeholder="Enter your email"
                    aria-describedby="emailHelp"
                  />
                </div>
                {forgetEmailErr != null ? (
                  <small style={{ color: "red" }}>{forgetEmailErr}</small>
                ) : forgetEmailErr ? (
                  <small style={{ color: "red" }}>{forgetEmailErr}</small>
                ) : (
                  ""
                )}
                <section
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    style={{
                      width: "30%",
                    }}
                    className="mt-4"
                    onClick={handleForgetPassword}
                  >
                    {loading ? "Sending Email..." : "Send Email"}
                  </Button>
                </section>
              </form>
            </div>
          </section>
        </CustomCard>
      </section>
    </>
  );
}
