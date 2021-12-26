import React from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomCard from "../../Container/CustomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk, faLock } from "@fortawesome/free-solid-svg-icons";
import Style from "./Login.module.scss";
import "../../css/theme.scss";

export default function Login() {
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
        <CustomCard height="400px">
          <section className={Style.Login}>
            <div className="Login-title">
              <p className={Style.headerText}>Login</p>
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

                <div className={`${Style.imputFields} mt-4`}>
                  <span>
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type="text"
                    className="form-control LoginForminput "
                    id="exampleInputEmail1"
                    placeholder="Enter your password"
                    aria-describedby="emailHelp"
                  />
                </div>
                <Row className="mt-3">
                  <Col>
                    <Form.Check type="checkbox" label="Remember me" />
                  </Col>
                  <Col /* style={{paddingRight:'0px'}} */>
                    <Link
                      to="/forgetPassword"
                      style={{ textDecoration: "none", color: "#257d7c" }}
                    >
                      Forget Password?
                    </Link>
                  </Col>
                </Row>

                <Button type="submit" className="mt-4 w-50">
                  Login
                </Button>
              </form>
            </div>
          </section>
        </CustomCard>
      </Container>
    </>
  );
}
