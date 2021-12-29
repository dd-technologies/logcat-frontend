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
import {toast, Toaster} from 'react-hot-toast';
import { useDispatch } from "react-redux";

export default function ResetPassword() {
  const [state, setState] = useState({ otp: null, newPass:null, confirmPass:null });
  const [stateErr, setStateErr] = useState({ err: null, inputErr:null });

  const handleChange = (otp) => setState({ otp });
  const dispatch = useDispatch()
  const handleSubmit = ()=>{
    if (state.otp == null || state.newPass == null || !state.confirmPass == null) {
      console.log("first if")
      toast.error('Please provide all the required field!')
    }
    else if (state.otp && state.otp.length === 6) {
      // console.log('hello dispatch')
      if (state.newPass === state.confirmPass) {
        setStateErr({err:null,inputErr:null})
        dispatch()
      } else {
        setStateErr({inputErr:'New password and confirm password not matching'})
        toast.error(stateErr.inputErr)
      }
    }else{
      setStateErr({err:'Check OTP field!!'})
      toast.error(stateErr.err)
    }
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
        <CustomCard height="500px"  width="500px">
          <section className={Style.Reset}>
            <section className="Login-title">
              <p className={Style.headerText}>Reset Password</p>
            </section>

            <section className="mt-4">
              {/*OTP section*/}
              <section>
                <p>Enter your OTP</p>
                {/* {stateErr.err !== null ? <small style={{color:'#F54827'}}>{stateErr.err}</small>:''} */}
                <section>
                  <OtpInput
                    value={state.otp}
                    onChange={(e)=>setState({ ...state,otp:e })}
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
                    onChange={(e)=>setState({...state,newPass:e.target.value})}
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
                    onChange={(e)=>setState({...state,confirmPass:e.target.value})}
                  />
                </section>

                <Link>
                  <Button type="submit" className="mt-4 w-50" onClick={()=>{handleSubmit()}}>
                    Reset Password
                  </Button>
                </Link>
              </form>
            </section>
          </section>
        </CustomCard>
      </Container>
    </>
  );
}
