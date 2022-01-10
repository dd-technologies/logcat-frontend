import React, { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomCard from "../../Container/CustomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk, faLock } from "@fortawesome/free-solid-svg-icons";
import "../../css/theme.scss";
import Style from "./ResetPassword.module.scss";
import OtpInput from "react-otp-input";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetForgetPassword } from "../../redux/action/AdminAction";
import { useHistory } from "react-router-dom";

export default function ResetPassword() {
  const [state, setState] = useState({
    otp: null,
    newPass: null,
    confirmPass: null,
  });
  const [stateErr, setStateErr] = useState({ err: null, inputErr: null });

  const handleChange = (otp) => setState({ otp });
  const resetPasswordReducer = useSelector(
    (state) => state.resetPasswordReducer
  );

  const { loading, data, error } = resetPasswordReducer;
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = () => {
    console.log(state);
    if (
      state.otp == null ||
      state.newPass == null ||
      !state.confirmPass == null
    ) {
      console.log("first if");
      toast.error("Please provide all the required field!");
    } else if (state.otp && state.otp.length === 6) {
      console.log("hello dispatch", state.newPass, state.confirmPass);
      if (state.newPass === state.confirmPass) {
        setStateErr({ err: null, inputErr: null });
        // email,otp,password,passwordVerify
        const email = JSON.parse(localStorage.getItem("forgetEmail"));
        console.log(email);
        dispatch(resetForgetPassword({ email, resetData: state }));
      } else {
        console.log("else second if");
        setStateErr({
          inputErr: "New password and confirm password not matching",
        });
        toast.error(stateErr.inputErr);
      }
    } else {
      console.log("hello dispatch 2");
      setStateErr({ err: "Check OTP field!!" });
      toast.error(stateErr.err);
    }
  };
  if (data && data.success) {
    toast.success("Password reset done");
    history.push("/login");
  }

  if (error) {
    toast.error("Please check all the credential!!");
  }
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
                  <p>0:00</p>
                </section>
              </section>
            </section>

            <section className="Form-card">
              <form>
                {/* <section className={`${Style.imputFields} mt-4`}>
                  <span>
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type="password"
                    className="form-control LoginForminput "
                    id="exampleInputEmail1"
                    placeholder="Enter your old password"
                    aria-describedby="emailHelp"
                  />
                </section> */}

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

                <Button className="mt-4  ms-2" onClick={handleSubmit} disabled>
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
