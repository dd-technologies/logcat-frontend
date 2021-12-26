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

export default function ResetPassword() {
  const [state, setState] = useState({ opt: "" });

  const handleChange = (otp) => setState({ otp });
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
        <CustomCard height="500px">
          <section className={Style.Reset}>
            <section className="Login-title">
              <p className={Style.headerText}>Reset Password</p>
            </section>

            <section className="mt-4">
              {/*OTP section*/}
              <section>
                <p>Enter your OTP</p>
                <section>
                  <OtpInput
                    value={state.otp}
                    onChange={handleChange}
                    numInputs={6}
                    inputStyle={{
                      borderRadius: "10px",
                      border: "1px solid #257d7c",
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
                <section className={`${Style.imputFields} mt-4`}>
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
                </section>

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
                  />
                </section>

                <Link to="/">
                  <Button type="submit" className="mt-4 w-50">
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
