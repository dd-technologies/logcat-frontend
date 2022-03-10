import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import CustomCard from "../../Container/CustomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "../../css/theme.scss";
import Style from "./ResetPassword.module.scss";
import OtpInput from "react-otp-input";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetForgetPassword } from "../../redux/action/AdminAction";
import { useHistory } from "react-router-dom";
import Timer from "../Analytics/Componets/Timer";
import { forgetPassword } from "../../redux/action/AdminAction";

export default function ResetPassword() {
  const [state, setState] = useState({
    otp: null,
    newPass: null,
    confirmPass: null,
  });

  const [stateErr, setStateErr] = useState({ err: null, inputErr: null });
  const [enableResendButton, setEnableResendButton] = useState(false);

  const handleChange = (otp) => setState({ otp });
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
    dispatch(forgetPassword(email));
  };

  const { loading, data, error } = resetPasswordReducer;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (
      state.otp == null ||
      state.newPass == null ||
      !state.confirmPass == null
    ) {
      toast.error("Please provide all the required field!");
    } else if (state.otp && state.otp.length === 6) {
      if (state.newPass === state.confirmPass) {
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
    history.push("/login");
  }

  useEffect(() => {}, [enableResendButton]);
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
        <Toaster />
        <CustomCard height="500px" width="500px">
          <section className={Style.Reset}>
            <section className="Login-title">
              <p className={Style.headerText}>Reset Password</p>
            </section>

            <section className="mt-4">
              {/*OTP section*/}
              <section>
                <p>Enter your OTP</p>
                {/* {stateErr.err !== null ? <small style={{color:'#F54827'}}>{stateErr.err}</small>:''} */}
                <section className={Style.OPTTIMR}>
                  <OtpInput
                    value={state.otp}
                    onChange={(e) => setState({ ...state, otp: e })}
                    numInputs={6}
                    inputStyle={{
                      borderRadius: "10px",
                      border: "2px solid #257d7c",
                      width: "30px",
                      height: "30px",
                      margin: "2px",
                    }}
                    separator={<span></span>}
                  />
                  {!enableResendButton ? (
                    <Timer
                      resetTimer={handleEnableButton}
                      initialMinute={4}
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
                <section className={`${Style.imputFields} mt-4`}>
                  <span>
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type="password"
                    className="form-control LoginForminput "
                    id="exampleInputEmail1"
                    placeholder="Enter your new password"
                    aria-describedby="emailHelp"
                    onChange={(e) =>
                      setState({ ...state, newPass: e.target.value })
                    }
                  />
                </section>
                <section className={`${Style.imputFields} mt-4`}>
                  <span>
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type="password"
                    className="form-control LoginForminput "
                    id="exampleInputEmail1"
                    placeholder="confirme your new password"
                    aria-describedby="emailHelp"
                    onChange={(e) =>
                      setState({ ...state, confirmPass: e.target.value })
                    }
                  />
                </section>

                <Button className="mt-4" onClick={handleSubmit}>
                  Reset Password
                </Button>

                <Button
                  className="mt-4  ms-2"
                  onClick={handleResendButton}
                  disabled={!enableResendButton ? true : false}
                >
                  Resend Otp
                </Button>
              </form>
            </section>
          </section>
        </CustomCard>
      </Container>
    </>
  );
}
