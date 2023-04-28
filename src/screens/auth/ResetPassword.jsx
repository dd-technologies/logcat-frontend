/* eslint-disable */

import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import CustomCard from "../../container/CustomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import Style from "../../css/ResetPassword.module.css";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetForgetPassword } from "../../store/action/AdminAction";
import { useNavigate } from "react-router-dom";
import Timer from "../../screens/analytics/Components/Timer";
import { forgetPassword } from "../../store/action/AdminAction";
import OtpInput from "./OtpInput";
import SpinnerCustom from "../../container/SpinnerCustom";

export default function ResetPassword() {
  const [state, setState] = useState({
    otp: null,
    newPass: null,
    confirmPass: null,
  });

  const [showPassword, setShowPassword] = useState({
    new: false,
    confime: false,
  });

  const [stateErr, setStateErr] = useState({ err: null, inputErr: null });
  const [enableResendButton, setEnableResendButton] = useState(false);

  const resetPasswordReducer = useSelector(
    (state) => state.resetPasswordReducer
  );

  const handleEnableButton = () => {
    if (enableResendButton) setEnableResendButton(true);
    else setEnableResendButton(true);
  };
  const email = JSON.parse(localStorage.getItem("forgetEmail"));

  const handleResendButton = () => {
    setEnableResendButton(false);
    if (enableResendButton) {
      dispatch(forgetPassword(email));
    }
  };

  const { loading, data, error } = resetPasswordReducer;

  // console.log("resetPasswordReducer", resetPasswordReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (
      state.otp == null ||
      state.newPass == null ||
      !state.confirmPass == null
    ) {
      toast.error("Please provide all the required field!");
    } else if (state.otp && state.otp.length == 6) {
      if (state.newPass == state.confirmPass) {
        setStateErr({ err: null, inputErr: null });
        dispatch(resetForgetPassword({ email, resetData: state }));
      } else {
        setStateErr({
          inputErr: "New password and confirm password not matching",
        });
        toast.error(stateErr.inputErr);
      }
    } else if (stateErr.err) {
      setStateErr({ err: "Check OTP field!!" });
      toast.error(stateErr.err);
    } else {
      if (error) {
        toast.error("Please check all the credential!!");
      }
    }
  };

  if (data && data.success) {
    toast.success("Password reset done");
    localStorage.removeItem("forgetEmail");
    navigate("/login");
  }

  useEffect(() => { }, [enableResendButton]);
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
          <section className={Style.Reset}>
            <section className="Login-title">
              <p className={Style.headerText}>Reset Password</p>
            </section>

            <section className="mt-4">
              {/*OTP section*/}
              <section>
                <p className="darkModeColor my-3">Enter your OTP</p>
                <section className={Style.OPTTIMR}>
                  <OtpInput setState={setState} state={state} />
                  {!enableResendButton ? (
                    <Timer
                      resetTimer={handleEnableButton}
                      initialMinute={1}
                      initialSeconds={59}
                    />
                  ) : (
                    ""
                  )}
                </section>
              </section>
            </section>

            <section className="Form-card">
              <form>
                <section className={`${Style.imputFields} darkBgColorSec mt-4`}>
                  <span className="ms-2">
                    <FontAwesomeIcon size="lg" icon={faLock} />
                  </span>
                  <input
                    type={showPassword.new ? "text" : "password"}
                    className="form-control LoginForminput "
                    placeholder="Enter your new password"
                    autoComplete="Enter you new password"
                    onChange={(e) =>
                      setState({ ...state, newPass: e.target.value })
                    }
                  />
                  <span className="px-2" style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon
                      icon={showPassword.new ? faEye : faEyeSlash}
                      onClick={() => {
                        setShowPassword({
                          ...showPassword,
                          new: !showPassword.new,
                        });
                      }}
                    />
                  </span>
                </section>
                <section className={`${Style.imputFields} darkBgColorSec mt-4`}>
                  <span className="ms-2">
                    <FontAwesomeIcon icon={faLock} size="lg" />
                  </span>
                  <input
                    type={showPassword.confime ? "text" : "password"}
                    className="form-control LoginForminput"
                    placeholder="Confirm your new password"
                    autoComplete="Confirm your new password"
                    onChange={(e) =>
                      setState({ ...state, confirmPass: e.target.value })
                    }
                  />
                  <span className="px-2" style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon
                      icon={showPassword.confime ? faEye : faEyeSlash}
                      onClick={() => {
                        setShowPassword({
                          ...showPassword,
                          confime: !showPassword.confime,
                        });
                      }}
                    />
                  </span>
                </section>
                <section className="mt-4">
                  <p
                    style={{
                      textDecoration: "underline",
                      cursor: enableResendButton ? "pointer" : null,
                      color: enableResendButton
                        ? "#257d7c"
                        : "rgb(56, 56, 56, 0.5)",
                    }}
                    className={enableResendButton ? "cpactiveText" : null}
                    onClick={handleResendButton}
                  >
                    Resend OTP
                  </p>
                </section>

                <section style={{ display: "flex", justifyContent: "center" }}>
                  {loading ? (
                    <SpinnerCustom height="5%" />
                  ) : (
                    <Button className="mt-4" onClick={handleSubmit}>
                      Reset Password
                    </Button>
                  )}
                </section>
              </form>
            </section>
          </section>
        </CustomCard>
      </section>
    </>
  );
}
