import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CustomCard from "../../Container/CustomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk, faLock } from "@fortawesome/free-solid-svg-icons";
import {forgetPassword, resetForgetPassword, resetForgetPasswordState} from '../../redux/action/AdminAction';

import Style from "./Forgetpassword.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";

export default function ForgetPassword() {
  const [forgetEmail, setForgetEmail] = useState(null);

  const dispatch = useDispatch();
  const handleForgetPassword = () => {
    if (!forgetEmail) {
      toast.error("Please provide valid email!!!");
    } else {
      dispatch(forgetPassword(forgetEmail));
    }
  };
  const forgetPasswordReducer = useSelector(
    (state) => state.forgetPasswordReducer
  );
  const { loading, forgetPasswordInfo } = forgetPasswordReducer;
  const history = useHistory();
  if (forgetPasswordInfo && forgetPasswordInfo.success) {
    // Clear forgetPasswordReducer
    toast.success(forgetPasswordInfo.message)
    localStorage.setItem('forgetEmail',JSON.stringify(forgetEmail))
    dispatch(resetForgetPasswordState())
    history.push('/resetpassword')
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
        <CustomCard height="300px" width="500px">
          <section className={Style.forget}>
            <div className="Login-title">
              <p className={Style.headerText}>Forgot Password</p>
            </div>
            <div className="Form-card">
              <form>
                <div className={`${Style.imputFields} mt-4`}>
                  <span>
                    <FontAwesomeIcon icon={faMailBulk} />
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
                {/* <Link to="/resetpassword"> */}
                <Button className="mt-4 w-50" onClick={handleForgetPassword}>
                  {loading ? "Sending Email..." : "Send an Email"}
                </Button>
                {/* </Link> */}
              </form>
            </div>
          </section>
        </CustomCard>
      </Container>
    </>
  );
}
