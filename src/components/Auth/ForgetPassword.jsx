import React from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomCard from "../../Container/CustomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk, faLock } from "@fortawesome/free-solid-svg-icons";
import Style from "./Forgetpassword.module.scss";

export default function ForgetPassword() {
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
                    className="form-control LoginForminput "
                    id="exampleInputEmail1"
                    placeholder="Enter your email"
                    aria-describedby="emailHelp"
                  />
                </div>
                <Link to="/resetpassword">
                  <Button type="submit" className="mt-4 w-50">
                    Send and email
                  </Button>
                </Link>
              </form>
            </div>
          </section>
        </CustomCard>
      </Container>
    </>
  );
}
