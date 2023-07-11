/* eslint-disable */

import React, { useState, useEffect } from "react";
import Style from "../../css/ResetPassword.module.css";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetForgetPassword } from "../../store/action/AdminAction";
import { Link, useNavigate } from "react-router-dom";
import Timer from "../analytics/Components/Timer";
import { forgetPassword } from "../../store/action/AdminAction";
import OtpInput from "./OtpInput";
import SpinnerCustom from "../../container/SpinnerCustom";

export default function ResetPassword() {
  const [state, setState] = useState({
    otp: null,
    newPass: null,
    confirmPass: null,
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
      console.log("email", email);
    }
  };

  const { loading, data, error } = resetPasswordReducer;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (
      state.otp == null
    ) {
      toast.error("Please provide all the required field!");
    }
    if (state.otp && state.otp.length == 4) {
      dispatch(resetForgetPassword({resetData: state }));
      navigate("/changePassword")
    }
    else if (stateErr.err) {
      setStateErr({ err: "Check OTP field!" });
      toast.error(stateErr.err);
    }
    else if(data.statusCode==200){
      navigate("/changePassword")
    }
  };

  if (data && data.success) {
    toast.success("Password reset done");
    localStorage.removeItem("forgetEmail");
    navigate("/login");
  }

  useEffect(() => {}, [enableResendButton]);
  return (
    <>
      <Toaster />
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
        }}
      >
        <div className={Style.main}>
          <section className={Style.Reset}>
            <div className={Style.LoginTitle}>
              <p className={Style.headerText}>Enter 4 Digits Code</p>
            </div>
            <div className={Style.heroSection}>
              <section>
                {/*OTP section*/}
                <section>
                  <p className="darkModeColor my-3" style={{ color: "gray" }}>
                    Enter 4 Digits code that you received on your {email}
                  </p>
                  <section className={Style.OPTTIMR}>
                    <OtpInput setState={setState} state={state} />
                  </section>
                </section>
              </section>
              <section className="Form-card">
                <form>
                  {!enableResendButton ? (
                    <Timer
                      resetTimer={handleEnableButton}
                      initialMinute={1}
                      initialSeconds={59}
                    />
                  ) : (
                    <section>
                      <p
                        style={{
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
                  )}
                  <section className={Style.bottomSection}>
                    {loading ? (
                      <SpinnerCustom height="5%" />
                    ) : (
                      <button className={Style.emailbtn} onClick={handleSubmit}>
                        Continue
                      </button>
                    )}
                    <p style={{ fontSize: "0.8rem", padding: "0rem 6rem" }}>
                      Did not recive OTP? check your email or{" "}
                      <Link
                        to="/forgetPassword"
                        style={{ textDecoration: "none" }}
                      >
                        try another email address
                      </Link>
                    </p>
                  </section>
                </form>
              </section>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
