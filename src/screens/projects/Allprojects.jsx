/* eslint-disable */

import React from "react";
import CustomCard from "../../container/CustomCard";
import { Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../utils/ThemeContext";
import agvaVenti from "../../assets/images/AgVaCrop.png";

const Allprojects = (props) => {
  const { theme } = React.useContext(ThemeContext);
  let newDate = props.data.createdAt.split("T")[0];
  let year = newDate.split("-")[0];
  let month = newDate.split("-")[1];
  let day = newDate.split("-")[2];
  newDate = `${day}-${month}-${year}`;
  return (
    <>
      <ThemeContext.Consumer> 
        {(value) => (
          <>
            <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
              <CustomCard
                padding="15px"
                height="200px"
                boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
              >
                <Link
                 to={`/device?code=${props.data.code}&name=${props.data.name}`}
                  style={{ textDecoration: "none" }}
                >
                    <div
              className="project-cart"
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "5px",
                marginLeft: "2rem",
                width: "25rem",
                height: "15rem",
              }}
            >
              {/* <Link to="/create_project" style={{ textDecoration: "none" }}> */}
                <div className="d-flex" style={{ gap: "5rem" }}>
                  <img
                    src={agvaVenti}
                    style={{ height: "12rem" }}
                    alt="AgvaVenti"
                  />
                  <div
                    className="d-flex"
                    style={{
                      gap: "1rem",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h6 style={{ color: "#707070", fontSize: "1.5rem" }}>
                      Ventilator
                      </h6>
                    </div>
                    {/* icon */}
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      color="#0099A4"
                      class="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg> */}
                  </div>
                </div>
                </div>
                </Link>
              </CustomCard>
            </Col>
          </>
        )}
      </ThemeContext.Consumer>
    </>
  );
};

export default Allprojects;
